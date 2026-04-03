import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A highly styled Sidebar component matching the Figma dashboard.
 * Features:
 * - Dynamic menu items from JSON.
 * - Active state management.
 * - Stats section with integration of <my-badge>.
 * - Action button with integration of <my-button>.
 */
export class Sidebar extends BaseComponent {
  static get observedAttributes() {
    return ['menu', 'stats', 'active-id', 'open'];
  }

  init() {
    this.state = {
        expanded: {}
    };

    // Subscribe to router changes to update active state
    const router = window.__app_router__;
    if (router) {
      router.onRouteChange(() => {
        if (this._initialized) this.refresh();
      });
    }
  }

  get menu() { return this.props['menu']; }
  set menu(val) { this.props['menu'] = val; if (this._initialized) this.refresh(); }

  get stats() { return this.props['stats']; }
  set stats(val) { this.props['stats'] = val; if (this._initialized) this.refresh(); }

  get open() { return this.props['open']; }
  set open(val) { this.props['open'] = val; if (this._initialized) this.refresh(); }

  _parseJSON(attrName, fallback = []) {
      const val = this.props[attrName] || this.getAttribute(attrName);
      if (!val) return fallback;
      if (typeof val !== 'string') return val; 
      try {
          return JSON.parse(val);
      } catch (e) {
          console.error(`Sidebar: Error parsing JSON for attribute "${attrName}"`, e);
          return fallback;
      }
  }

  render() {
    const menu = this._parseJSON('menu');
    const stats = this._parseJSON('stats');
    // Determine active sidebar item: prefer router's current route sidebarId, fallback to attribute
    const router = window.__app_router__;
    const routeSidebarId = router?.currentRoute?.meta?.sidebarId;
    const activeId = routeSidebarId || this.getAttribute('active-id');
    const isOpen = this.getAttribute('open') === 'true' || this.props['open'] === 'true' || this.props['open'] === true;

    const container = document.createElement('div');
    // Typography spec: Font: Inter, Weight: 400, Size: 14px, Line height: 20px, Letter spacing: 0%
    container.className = `
        fixed inset-y-0 left-0 z-[500] w-[260px] h-screen bg-[#111111] text-white flex flex-col p-5 font-['Inter'] shadow-2xl md:shadow-none rounded-tr-3xl rounded-br-3xl md:rounded-none overflow-hidden
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:relative md:flex-shrink-0
    `.trim();

    // Add Scrollbar Hiding CSS
    const style = document.createElement('style');
    style.textContent = `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    container.appendChild(style);

    // 1. Logo & Mobile Close (Fixed Top)
    const topBar = document.createElement('div');
    topBar.className = 'mb-8 flex items-center justify-between flex-shrink-0 px-1';
    topBar.innerHTML = `
        <div class="flex items-center gap-1.5 select-none">
            <span class="text-[20px] font-black tracking-tighter text-white">SE</span>
            <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff8f00] via-[#ffc107] to-[#8ab800]"></div>
            <span class="text-[20px] font-black tracking-tighter text-white">LYZE</span>
        </div>
        <button id="close-sidebar" class="md:hidden text-white/40 hover:text-white p-2 transition-colors">
            <i class="fi fi-rr-cross text-[14px]"></i>
        </button>
    `;
    topBar.querySelector('#close-sidebar').onclick = () => {
        this.emit('close');
    };
    container.appendChild(topBar);

    // 2. Navigation List (Scrollable Middle)
    const nav = document.createElement('div');
    nav.className = 'flex flex-col gap-1 overflow-y-auto pr-2 scrollbar-hide flex-grow select-none';
    
    menu.forEach(item => {
        const isExpanded = !!this.state.expanded[item.id];
        const isActive = activeId === item.id;
        
        const btn = document.createElement('div');
        // Typography specification: 14px size, 20px leading, Weight 400
        btn.className = `
            flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group flex-shrink-0
            ${isActive ? 'bg-[#ff8f00] text-white shadow-lg shadow-[#ff8f00]/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
        `.trim();

        btn.innerHTML = `
            <div class="flex items-center gap-3 overflow-hidden">
                <div class="${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'} flex-shrink-0 flex items-center justify-center w-5 h-5">
                    <i class="${item.icon || 'fi fi-rr-apps'} text-[16px] flex items-center"></i>
                </div>
                <span class="text-[14px] leading-[20px] font-normal tracking-[0%] whitespace-nowrap overflow-hidden">${item.label}</span>
            </div>
            ${item.hasChildren ? `
                <svg class="opacity-40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            ` : ''}
        `;
        
        btn.onclick = () => {
            if (item.hasChildren) {
                this.state.expanded[item.id] = !this.state.expanded[item.id];
                this.refresh();
            }
            // Navigate via router if item has a route
            if (item.route && window.__app_router__) {
                window.__app_router__.push(item.route);
            }
            this.emit('nav-click', item);
        };
        nav.appendChild(btn);

        if (isExpanded && item.children) {
            const subContainer = document.createElement('div');
            subContainer.className = 'flex flex-col gap-1 pl-11 mb-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-300';
            item.children.forEach(sub => {
                const subBtn = document.createElement('div');
                subBtn.className = 'text-[13px] font-normal text-gray-500 py-2 hover:text-white cursor-pointer transition-all hover:translate-x-1';
                subBtn.textContent = sub.label;
                subBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.emit('nav-click', sub);
                };
                subContainer.appendChild(subBtn);
            });
            nav.appendChild(subContainer);
        }
    });

    // 3. Stats (Now part of the scrollable Nav)
    if (stats.length > 0) {
        const statsDivider = document.createElement('div');
        statsDivider.className = 'my-6 mx-2 flex-shrink-0';
        nav.appendChild(statsDivider);

        const statsBox = document.createElement('div');
        statsBox.className = 'mt-2 mb-6 flex-shrink-0';
        
        const statsTitle = document.createElement('h4');
        statsTitle.className = 'text-[12px] mb-4 font-black text-white uppercase tracking-[0.1em] pl-4';
        statsTitle.textContent = 'Account / Limits';
        statsBox.appendChild(statsTitle);

        const statsList = document.createElement('div');
        statsList.className = 'flex flex-col gap-3 pl-4';
        
        stats.forEach(stat => {
            const row = document.createElement('div');
            row.className = 'flex items-center justify-between  text-[13px] font-normal';
            row.innerHTML = `
                <span class="text-white/80">${stat.label}</span>
                <my-badge variant="${stat.variant}" class="!rounded-[100px] flex-shrink-0 !px-3" text="${stat.value}"></my-badge>
            `;
            statsList.appendChild(row);
        });
        statsBox.appendChild(statsList);
        nav.appendChild(statsBox);
    }
    container.appendChild(nav);

    // 4. Bottom Section (Fixed Bottom - Footer Only)
    const bottom = document.createElement('div');
    bottom.className = 'flex flex-col gap-6 pt-2 flex-shrink-0 mt-2 border-t border-white/5';

    const footer = document.createElement('div');
    footer.className = 'flex flex-col gap-4';
    footer.innerHTML = `
        <h4 class="text-[12px] font-black !text-white uppercase tracking-[0.1em] pl-2">Extend limits now</h4>
        <div class="px-2">
            <button class="w-full h-[48px] bg-[#8ab800] text-white font-black text-[14px] rounded-xl shadow-lg shadow-[#8ab800]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Abo Active
            </button>
        </div>
    `;
    bottom.appendChild(footer);
    container.appendChild(bottom);

    return container;
  }
}

defineComponent('my-sidebar', Sidebar);
