import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A custom Dropdown Box component that matches the Figma spec.
 * Features:
 * - Animated toggle (open/close)
 * - Dynamic color variants (Orange, Purple, Green)
 * - Custom slot-based options
 * - Reactive v-model support
 */
export class Dropdown extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'placeholder', 'variant'];
  }

  static get modelProp() {
    return 'value';
  }

  init() {
    this.state = { isOpen: false };
    
    // Close dropdown when clicking outside
    this._handleClickOutside = (e) => {
        if (this.state.isOpen && !e.composedPath().includes(this)) {
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

  render() {
    const value = this.getAttribute('value') || '';
    const placeholder = this.getAttribute('placeholder') || 'Select Area';
    const isOpen = this.state.isOpen;

    const variants = {
        orange: 'bg-[#ff8f00]',
        purple: 'bg-[#a459fd]',
        green: 'bg-[#8ab800]',
        default: 'bg-white text-gray-700 border border-gray-200'
    };

    // Determine variant based on value or prop
    let variantClass = variants.default;
    if (value.includes('Optimization')) variantClass = variants.orange + ' text-white';
    else if (value.includes('Creation')) variantClass = variants.purple + ' text-white';
    else if (value.includes('Tracking')) variantClass = variants.green + ' text-white';
    else if (this.props.variant && variants[this.props.variant]) variantClass = variants[this.props.variant] + ' text-white';

    const container = document.createElement('div');
    container.className = 'relative w-[280px] h-[44px] select-none';

    // Header / Trigger
    const header = document.createElement('div');
    header.className = `
      flex items-center justify-between px-4 h-full rounded-lg cursor-pointer 
      transition-all duration-200 text-[14px] font-bold shadow-sm
      ${variantClass}
    `.trim();
    
    header.innerHTML = `
      <span>${value || placeholder}</span>
      <svg class="transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}" 
           width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    `;

    header.addEventListener('click', () => {
        this.state.isOpen = !this.state.isOpen;
        this.refresh();
    });

    container.appendChild(header);

    // List Container
    if (isOpen) {
        const list = document.createElement('div');
        list.className = 'absolute top-[52px] left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 py-1';
        
        // Prevent clicking inside the menu from closing the menu immediately via header.onclick bubbling
        list.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Define options based on image
        const options = [
            { label: 'Content Optimization Area', variant: 'orange' },
            { label: 'Content Creation Area', variant: 'purple' },
            { label: 'Ranking Tracking Area', variant: 'green' }
        ];

        options.forEach(opt => {
            const item = document.createElement('div');
            const isActive = value === opt.label;
            
            const itemVariantClass = {
                orange: 'hover:bg-[#ff8f00]/10 text-gray-700',
                purple: 'hover:bg-[#a459fd]/10 text-gray-700',
                green: 'hover:bg-[#8ab800]/10 text-gray-700'
            }[opt.variant];

            const activeClass = {
                orange: 'bg-[#ff8f00] text-white',
                purple: 'bg-[#a459fd] text-white',
                green: 'bg-[#8ab800] text-white'
            }[opt.variant];

            item.className = `
                px-4 py-3 text-[13px] font-bold cursor-pointer transition-colors
                ${isActive ? activeClass : itemVariantClass}
            `.trim();
            item.textContent = opt.label;

            item.addEventListener('click', () => {
                this.setAttribute('value', opt.label);
                this.emit('update:value', opt.label);
                this.state.isOpen = false;
                this.refresh();
            });

            list.appendChild(item);
        });

        container.appendChild(list);
    }

    return container;
  }
}

defineComponent('my-dropdown', Dropdown);
