import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A generic Select component that follows the project's design pattern.
 * Supports: placeholder, value, disabled, and internal options.
 */
export class SelectField extends BaseComponent {
  static get observedAttributes() {
    return ['placeholder', 'value', 'disabled', 'class', 'options', 'header'];
  }

  static get modelProp() {
    return 'value';
  }

  init() {
    this.state = { isOpen: false };
    
    // Close dropdown when clicking outside
    this._handleClickOutside = (e) => {
        if (this._initialized && this.state.isOpen && !e.composedPath().includes(this)) {
            this.state.isOpen = false;
            this.refresh();
        }
    };
  }

  connectedCallback() {
      super.connectedCallback();
      document.addEventListener('click', this._handleClickOutside);
  }

  disconnectedCallback() {
      document.removeEventListener('click', this._handleClickOutside);
  }

  get options() {
    return this.props['options'];
  }

  set options(val) {
    this.props['options'] = val;
    if (this._initialized) this.refresh();
  }

  get value() {
    return this.props['value'];
  }

  set value(val) {
    this.props['value'] = val;
    if (this._initialized) this.refresh();
  }

  render() {
    const placeholder = this.props['placeholder'] || 'Select Option';
    const value = this.props['value'] || '';
    const disabled = this.hasAttribute('disabled');
    const extraClass = this.props['class'] || '';
    
    // Parse options from prop/attribute
    let options = [];
    const optionsProp = this.props['options'];
    if (optionsProp) {
        if (Array.isArray(optionsProp)) {
            options = optionsProp;
        } else if (typeof optionsProp === 'string') {
            try {
                options = JSON.parse(optionsProp);
            } catch (e) {
                // Handle comma separated string if not JSON
                options = optionsProp.split(',').map(s => s.trim()).filter(s => s !== '');
            }
        }
    }

    const hasFocusOverride = extraClass.includes('focus:') || extraClass.includes('focus-within:') || extraClass.includes('ring-');
    const defaultFocus = hasFocusOverride ? '' : 'focus-within:border-[#a459fd] focus-within:ring-4 focus-within:ring-[#a459fd]/10 focus-within:shadow-sm';

    const container = document.createElement('div');
    container.className = `
      flex items-center gap-x-3 bg-white rounded-xl border border-gray-200 
      px-5 min-w-[300px] h-[52px] transition-all duration-200 group relative select-none
      ${disabled ? 'opacity-60 cursor-not-allowed bg-[#fafafa]' : `hover:border-gray-300 cursor-pointer ${defaultFocus}`}
      ${extraClass}
    `.replace(/\s+/g, ' ').trim();

    // Trigger Logic
    if (!disabled) {
        container.onclick = (e) => {
            // No stopPropagation here! This allows other selects to close.
            this.state.isOpen = !this.state.isOpen;
            this.refresh();
        };
    }

    // Selected Value Display
    const display = document.createElement('div');
    const activeOption = options.find(opt => (typeof opt === 'object' ? opt.value : opt) == value);
    const displayText = activeOption ? (typeof activeOption === 'object' ? activeOption.label : activeOption) : placeholder;
    
    // As requested: Final specs: 12px font, 20px leading, #4C4C4C color for both selected and placeholder
    display.className = `flex-grow outline-none border-none bg-transparent text-[#4C4C4C] text-[12px] leading-[20px] font-['Inter'] font-normal truncate`;
    display.textContent = displayText;
    container.appendChild(display);

    // Arrow Icon
    const arrow = document.createElement('div');
    arrow.className = `text-gray-400 group-focus-within:text-[#a459fd] transition-transform duration-300 ${this.state.isOpen ? 'rotate-180' : ''}`;
    arrow.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    `;
    container.appendChild(arrow);

    // Custom Dropdown List (The part matching the image)
    if (this.state.isOpen && !disabled) {
        const list = document.createElement('div');
        list.className = `
            absolute top-[calc(100%+8px)] left-0 w-full min-w-max bg-white rounded-xl shadow-2xl z-[1000] p-1.5 border border-gray-100
            animate-in fade-in zoom-in-95 duration-200
        `.trim();
        
        // Prevent clicking inside the menu from closing the menu immediately via container.onclick
        // although we set container.onclick, clicking sub-items might re-trigger it.
        list.onclick = (e) => {
            e.stopPropagation();
        };

        // 1. Optional Header (Matching the 'Fruits' style in image)
        const headerText = this.getAttribute('header');
        if (headerText) {
            const header = document.createElement('div');
            header.className = "px-4 py-2 text-[12px] font-bold text-gray-400 uppercase tracking-wider select-none pb-1";
            header.textContent = headerText;
            list.appendChild(header);
        }

        // 2. Options List
        options.forEach((opt, index) => {
            const isObj = typeof opt === 'object' && opt !== null;
            const optValue = isObj ? opt.value : opt;
            const optLabel = isObj ? opt.label : opt;
            const isHeader = isObj && opt.isHeader;

            const item = document.createElement('div');
            if (isHeader) {
                item.className = "px-4 py-2 text-[12px] font-bold text-gray-400 uppercase tracking-wider select-none";
                item.textContent = optLabel;
            } else {
                const isActive = optValue == value;
                item.className = `
                    px-4 py-3 rounded-lg text-[15px] font-normal cursor-pointer transition-all
                    ${isActive ? 'bg-[#ff8f00]/10 text-[#ff8f00] font-semibold' : 'text-gray-700 hover:bg-gray-50'}
                `.trim();
                item.textContent = optLabel;
                item.onclick = (e) => {
                    e.stopPropagation();
                    this.props['value'] = optValue;
                    this.setAttribute('value', optValue);
                    this.emit('update:value', optValue);
                    this.state.isOpen = false;
                    this.refresh();
                };
            }
            list.appendChild(item);
        });

        // Handle Slots if any
        const slotContent = this.renderSlot('default');
        if (slotContent) {
            const slotWrapper = document.createElement('div');
            slotWrapper.appendChild(slotContent);
            // Minimal styling for slotted options
            slotWrapper.querySelectorAll('option').forEach(opt => {
                const item = document.createElement('div');
                item.className = "px-4 py-3 rounded-lg text-[15px] font-normal text-gray-700 hover:bg-gray-50 cursor-pointer";
                item.textContent = opt.textContent;
                item.onclick = (e) => {
                    e.stopPropagation();
                    this.props['value'] = opt.value;
                    this.setAttribute('value', opt.value);
                    this.emit('update:value', opt.value);
                    this.state.isOpen = false;
                    this.refresh();
                };
                list.appendChild(item);
            });
        }

        container.appendChild(list);
    }

    return container;
  }
}

// Register as <my-select>
defineComponent('my-select', SelectField);
