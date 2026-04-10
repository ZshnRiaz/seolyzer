import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A highly faithful recreation of the button component from the Figma spec, 
 * refactored as a Custom Element (<my-button>).
 * 
 * Supports:
 * - Attribute-based props: type, disabled, show-icon, text
 * - Shorthand Events: @click="handlerName"
 * - Slots: default for label, icon slot for custom icon
 */
export class Button extends BaseComponent {
  static get observedAttributes() {
    return ['type', 'disabled', 'show-icon', 'text', 'class'];
  }

  render() {
    // Standard attribute mapping (convert kebab-case to internal props)
    const type = this.props['type'] || 'primary';
    const disabled = this.hasAttribute('disabled');
    const showIcon = this.props['show-icon'] !== 'false';
    const textLabel = this.props['text'] || '';
    const extraClass = this.props['class'] || '';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.disabled = disabled;
const baseClasses = [
  // 🔹 Mobile (default)
  'px-[8px]', 'py-[5px]',

  // 🔹 Small screens (sm)
  'sm:px-[12px]', 'sm:py-[8px]',

  // 🔹 Desktop (md+)
  'md:px-[22px]', 'md:py-[12px]',

  'rounded-xl',
  'font-medium',

  // 🔹 Responsive text
  'text-[13px]', 'sm:text-[15px]', 'md:text-[16px]',

  'leading-[24px]',
  'transition-all', 'duration-200',

  // 🔹 Responsive width
  'min-w-[100px]', 'sm:min-w-[130px]', 'md:min-w-[170px]',

  // 🔹 Responsive height
  'h-[36px]', 'sm:h-[44px]', 'md:h-[56px]',

  'flex', 'items-center', 'justify-center',
  'outline-none', 'select-none'
];

    const variants = {
      primary: 'bg-[#a3cc00] text-white hover:bg-[#8F5FC4] active:bg-[#a3cc00] active:scale-[0.98] shadow-sm transition-all duration-300',
      secondary: 'bg-white text-[#111111] border border-[#111111] hover:bg-gray-100 active:bg-white active:scale-[0.98] transition-all duration-300',
      text: 'bg-transparent text-[#111111] hover:bg-gray-100 active:bg-transparent transition-all duration-300 min-w-0 md:min-w-[120px]',
      elevated: 'bg-white text-[#111111] shadow-lg border-none hover:bg-gray-50 active:bg-white active:scale-[0.98] transition-all duration-300'
    };

    const disabledStyles = {
      primary: 'bg-[#DCDCDC] text-[#9a9a9a] cursor-not-allowed',
      secondary: 'bg-[#eeeeee] text-[#9a9a9a] border-none cursor-not-allowed',
      text: 'bg-transparent text-[#dcdcdc] cursor-not-allowed',
      elevated: 'bg-[#eeeeee] text-[#9a9a9a] shadow-none cursor-not-allowed'
    };

    const variantClass = disabled 
      ? (disabledStyles[type] || disabledStyles.primary)
      : (variants[type] || variants.primary);

    btn.className = `${baseClasses.join(' ')} ${variantClass} ${extraClass}`.trim();

    const content = document.createElement('div');
    content.className = 'flex items-center justify-center gap-x-2';

    // Icon Slot
    if (showIcon) {
        const iconSlot = this.renderSlot('icon', (() => {
            const el = document.createElement('div');
            el.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
            return el;
        })());
        content.appendChild(iconSlot);
    }

    // Default Slot for label
    const label = document.createElement('span');
    const slotContent = this.renderSlot('default', textLabel);
    
    if (typeof slotContent === 'string') {
        label.textContent = slotContent;
    } else {
        label.appendChild(slotContent);
    }
    content.appendChild(label);
    btn.appendChild(content);

    // Event handling
    btn.addEventListener('click', (e) => {
      if (!disabled) {
        this.emit('click', e);
      }
    });

    return btn;
  }
}

// Register as <my-button>
defineComponent('my-button', Button);
