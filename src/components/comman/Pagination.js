import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A standalone Pagination component with support for Vue-like v-model.
 * Models the 'current-page' attribute.
 */
export class Pagination extends BaseComponent {
  static get modelProp() {
    return 'current-page';
  }

  static get observedAttributes() {
    return ['current-page', 'total-pages'];
  }

  render() {
    // Robustly get numeric values (check attributes and properties)
    const currentPage = Number(this.getAttribute('current-page') || this['current-page']) || 1;
    const totalPages = Number(this.getAttribute('total-pages') || this['total-pages']) || 1;
    
    const container = document.createElement('div');
    container.className = 'w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2 px-1';

    const createBtn = (label, page, active = false, disabled = false) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = label;
      
      const baseClasses = 'h-[36px] px-4 flex items-center justify-center text-[13px] font-bold rounded-[10px] transition-all duration-200 min-w-[36px] shadow-[0_2px_4px_rgba(0,0,0,0.08)] border-none';
      
      if (disabled) {
        btn.className = `${baseClasses} bg-white text-gray-300 cursor-not-allowed opacity-50`;
      } else if (active) {
        btn.className = `${baseClasses} bg-[#a459fd] text-white`;
      } else {
        btn.className = `${baseClasses} bg-white text-[#4C4C4C] hover:bg-gray-50`;
      }

      if (!disabled && page !== null) {
          btn.addEventListener('click', () => {
              let targetPage = page;
              if (label === 'Prev') targetPage = currentPage - 1;
              else if (label === 'Next') targetPage = currentPage + 1;
              
              if (targetPage !== currentPage && typeof targetPage === 'number') {
                  this.emit('pageChange', targetPage);
                  this.setAttribute('current-page', targetPage);
                  this.emit('update:current-page', targetPage);
              }
          });
      }

      return btn;
    };

    // LEFT SECTION: Button Group
    const leftSection = document.createElement('div');
    leftSection.className = 'flex items-center gap-2.5 flex-wrap justify-center sm:justify-start';

    leftSection.appendChild(createBtn('Prev', currentPage > 1 ? currentPage - 1 : null, false, currentPage === 1));

    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) { if (!pages.includes(i)) pages.push(i); }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    pages.forEach(p => {
      if (p === '...') {
        const dot = document.createElement('div');
        dot.className = 'h-[36px] w-[36px] flex items-center justify-center bg-white text-[#4C4C4C] text-[13px] font-bold rounded-[10px] shadow-[0_2px_4px_rgba(0,0,0,0.08)]';
        dot.textContent = '...';
        leftSection.appendChild(dot);
      } else {
        const pageBtn = createBtn(p, p, currentPage === p);
        if (typeof p === 'number') pageBtn.style.paddingLeft = '0';
        if (typeof p === 'number') pageBtn.style.paddingRight = '0';
        if (typeof p === 'number') pageBtn.style.width = '36px';
        leftSection.appendChild(pageBtn);
      }
    });

    leftSection.appendChild(createBtn('Next', currentPage < totalPages ? currentPage + 1 : null, false, currentPage === totalPages));
    container.appendChild(leftSection);

    // RIGHT SECTION: Selector
    const rightSection = document.createElement('div');
    rightSection.className = 'flex items-center gap-3 text-[#4C4C4C] text-[14px] font-semibold';
    
    const pageLabel = document.createElement('div');
    pageLabel.className = 'flex items-center gap-1.5';
    
    // Support slot for label prefix
    const labelPrefix = this.renderSlot('pageLabel');
    if (labelPrefix) {
      pageLabel.appendChild(labelPrefix);
    } else {
      const defaultText = document.createElement('span');
      defaultText.className = 'text-[#888]';
      defaultText.textContent = 'Page';
      pageLabel.appendChild(defaultText);
    }
    rightSection.appendChild(pageLabel);

    const selWrapper = document.createElement('div');
    selWrapper.className = 'relative flex items-center min-w-[75px]';
    
    const select = document.createElement('select');
    select.className = 'appearance-none bg-white text-[#111] h-[36px] pl-4 pr-10 rounded-[10px] text-[14px] font-bold outline-none cursor-pointer border-none shadow-[0_2px_4px_rgba(0,0,0,0.08)] w-full';
    
    for (let i = 1; i <= totalPages; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        if (i === currentPage) opt.selected = true;
        select.appendChild(opt);
    }

    // Two-way binding for select element
    this.bindValue(select, 'current-page');

    const arrow = document.createElement('div');
    arrow.className = 'absolute right-3.5 pointer-events-none text- flex items-center';
    arrow.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

    selWrapper.appendChild(select);
    selWrapper.appendChild(arrow);
    rightSection.appendChild(selWrapper);
    
    const totalLabel = document.createElement('span');
    totalLabel.className = 'text-[#888]';
    totalLabel.textContent = `of ${totalPages}`;
    rightSection.appendChild(totalLabel);
    
    container.appendChild(rightSection);

    return container;
  }
}

defineComponent('my-pagination', Pagination);

