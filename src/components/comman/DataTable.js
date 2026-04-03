import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A highly reusable Data Table component.
 * Features:
 * - Columns/Columns mapping via 'headings' and 'columns' attributes (JSON).
 * - Sorting support (Local).
 * - Loading overlay.
 * - Sticky/Freeze header.
 * - Row and Cell click events.
 * - Design matched to Figma (Purple header, rounded corners).
 */
export class DataTable extends BaseComponent {
  static get observedAttributes() {
    return ['headings', 'columns', 'loading', 'freeze-header'];
  }

  init() {
    this.state = {
      sortKey: null,
      sortDirection: 'asc'
    };
  }

  /**
   * Safely parse attributes that are expected to be JSON.
   */
  _parseAttr(name, fallback = []) {
    const val = this.getAttribute(name);
    if (!val) return fallback;
    try {
      return JSON.parse(val);
    } catch (e) {
      // If it's already an object (assigned via JS property), use it
      if (typeof val === 'object') return val;
      console.warn(`DataTable: Failed to parse attribute [${name}]. Expected JSON string.`);
      return fallback;
    }
  }

  handleSort(key) {
    const isSameKey = this.state.sortKey === key;
    const newDirection = isSameKey && this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    
    this.state.sortKey = key;
    this.state.sortDirection = newDirection;
    
    this.emit('sort-change', { key, direction: newDirection });
    this.refresh();
  }

  render() {
    const headings = this._parseAttr('headings');
    let columns = this._parseAttr('columns');
    const isLoading = this.getAttribute('loading') === 'true';
    const freezeHeader = this.hasAttribute('freeze-header');

    // Handle internal sorting if sortKey is set
    if (this.state.sortKey) {
        columns = [...columns].sort((a, b) => {
            const valA = a[this.state.sortKey];
            const valB = b[this.state.sortKey];
            
            if (valA == null) return 1;
            if (valB == null) return -1;

            if (typeof valA === 'string' && typeof valB === 'string') {
              return this.state.sortDirection === 'asc' 
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
            }
            
            if (valA < valB) return this.state.sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return this.state.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const container = document.createElement('div');
    container.className = 'relative w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden';

    // 1. Loading Overlay
    if (isLoading) {
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-white/70 z-50 flex flex-col items-center justify-center gap-3 backdrop-blur-[1px]';
        overlay.innerHTML = `
            <div class="text-[#a459fd]">
                <svg class="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
            </div>
            <span class="text-[11px] font-black text-gray-400 uppercase tracking-widest">Updating Data</span>
        `;
        container.appendChild(overlay);
    }

    // 2. Table Element
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'overflow-x-auto w-full';
    
    const table = document.createElement('table');
    table.className = 'w-full text-left border-collapse table-fixed';
    
    // a) Header
    const thead = document.createElement('thead');
    thead.className = `${freezeHeader ? 'sticky top-0 z-40' : ''} bg-[#E9E4F0] text-[#4C4C4C]`;
    
    const htr = document.createElement('tr');
    

    headings.forEach(h => {
        const th = document.createElement('th');
        th.className = `px-4 py-4 text-[13px] text-[#111111] font-inter font-medium leading-[100%] tracking-[0%]  select-none ${h.sortable ? 'cursor-pointer hover:bg-black/5' : ''} ${h.thClass || ''}`;
        if (h.width) th.style.width = typeof h.width === 'number' ? `${h.width}px` : h.width;

        const inner = document.createElement('div');
        inner.className = 'flex items-center gap-2 w-full justify-start';
        
        // Dynamic Header Slot
        const slot = this.renderSlot(`header-${h.key}`, h.title, h);
        if (typeof slot === 'string') inner.textContent = slot;
        else inner.appendChild(slot);

        if (h.sortable) {
            const icon = document.createElement('div');
            icon.className = `transition-all duration-200 ${this.state.sortKey === h.key ? 'text-white opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'}`;
            
            if (this.state.sortKey === h.key) {
                icon.innerHTML = this.state.sortDirection === 'asc' 
                    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>'
                    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
            } else {
                icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>';
            }
            inner.appendChild(icon);
            th.onclick = () => this.handleSort(h.key);
        }

        th.appendChild(inner);
        htr.appendChild(th);
    });
    thead.appendChild(htr);
    table.appendChild(thead);

    // b) Body
    const tbody = document.createElement('tbody');
    
    if (columns.length === 0 && !isLoading) {
        const emptyTr = document.createElement('tr');
        const emptyTd = document.createElement('td');
        emptyTd.colSpan = headings.length;
        emptyTd.className = 'py-20 text-center';
        
        const slotEmpty = this.renderSlot('empty-state');
        if (slotEmpty) {
            const wrap = document.createElement('div');
            wrap.className = 'flex justify-center';
            wrap.appendChild(slotEmpty);
            emptyTd.appendChild(wrap);
        } else {
            emptyTd.innerHTML = `
                <div class="flex flex-col items-center gap-2">
                    <svg class="text-gray-200" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                    <span class="text-sm font-bold text-gray-400">No items found yet</span>
                </div>
            `;
        }
        emptyTr.appendChild(emptyTd);
        tbody.appendChild(emptyTr);
    } else {
        columns.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            tr.className = `group transition-colors border-b border-gray-100 last:border-0 hover:bg-gray-50/50 cursor-pointer`;
            tr.onclick = (e) => {
                if (e.target.closest('button, a, input')) return;
                this.emit('row-click', { row, index: rowIndex });
            };


            headings.forEach(h => {
                const td = document.createElement('td');
                td.className = `px-4 py-4 text-[14px] font-["inter"] font-[400] text-[#4C4C4C] truncate ${h.tdClass || ''}`;
                if (h.width) td.style.width = typeof h.width === 'number' ? `${h.width}px` : h.width;

                const value = row[h.key];
                
                // Dynamic Cell Slot (Scoped)
                const slot = this.renderSlot(`cell-${h.key}`, value ?? '', row);
                if (typeof slot === 'string') {
                    td.textContent = slot;
                    td.title = slot;
                } else {
                    td.appendChild(slot);
                }

                td.onclick = (e) => {
                    this.emit('cell-click', { row, key: h.key, value, index: rowIndex });
                };

                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    container.appendChild(tableWrapper);

    return container;
  }
}

defineComponent('my-table', DataTable);
