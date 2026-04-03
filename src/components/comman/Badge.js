import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A small Badge component for displaying counts or statuses.
 * Supports: variant/type (primary, success, error, warning)
 * Matches the design pattern of Tag.js.
 */
export class Badge extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'type', 'text', 'class'];
  }

  render() {
    const variant = this.props['variant'] || this.props['type'] || 'primary';
    const text = this.props['text'] || '';
    const extraClass = this.props['class'] || '';

    const colors = {
        primary: 'bg-[#8F5FC4] text-[#fff]', // Theme Purple
        success: 'bg-[#97BF0D] text-[#fff]', // Theme Green
        error:   'bg-[#FF383C] text-[#fff]', // Theme Red (User choice)
        warning: 'bg-[#F97316] text-[#fff]', // Theme Orange
        gray:    'bg-gray-100 text-gray-500',
    };

    const container = document.createElement('div');
    container.className = `
      inline-flex items-center justify-center px-1.5 py-0.5 rounded-[4px] 
      text-[11px] font-black min-w-[20px] 
      ${colors[variant] || colors.primary}
      ${extraClass}
    `.replace(/\s+/g, ' ').trim();

    // Use slot for content, or text prop as fallback
    const slotContent = this.renderSlot('default');
    if (slotContent && (slotContent.textContent.trim() || slotContent.childNodes.length)) {
        if (slotContent instanceof DocumentFragment) {
            container.appendChild(slotContent);
        } else {
            container.appendChild(slotContent.cloneNode(true));
        }
    } else {
        container.textContent = text;
    }

    return container;
  }
}

// Register as <my-badge>
defineComponent('my-badge', Badge);
