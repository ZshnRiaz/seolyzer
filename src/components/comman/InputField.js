import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A generic Input component that follows the project's design pattern.
 * Supports: placeholder, value, type, disabled, and optional icons via slots.
 */
export class InputField extends BaseComponent {
  static get observedAttributes() {
    return ['placeholder', 'value', 'disabled', 'type', 'class'];
  }

  static get modelProp() {
    return 'value';
  }

  render() {
    const placeholder = this.props['placeholder'] || '';
    const value = this.props['value'] || '';
    const type = this.props['type'] || 'text';
    const disabled = this.hasAttribute('disabled');
    const extraClass = this.props['class'] || '';

    const hasFocusOverride = extraClass.includes('focus:') || extraClass.includes('focus-within:') || extraClass.includes('ring-');
    const defaultFocus = hasFocusOverride ? '' : 'focus-within:border-[#a459fd] focus-within:ring-4 focus-within:ring-[#a459fd]/10 focus-within:shadow-sm';

    const container = document.createElement('div');
    container.className = `
      flex items-center gap-x-3 bg-white rounded-xl border border-gray-200 
      px-5 min-w-[300px] h-[52px] transition-all duration-200 group
      ${disabled ? 'opacity-60 cursor-not-allowed bg-[#fafafa]' : `hover:border-gray-300 ${defaultFocus}`}
      ${extraClass}
    `.replace(/\s+/g, ' ').trim();

    // Render left slot for icon if present
    const leftNode = this.renderSlot('left');
    if (leftNode && (leftNode.textContent.trim() || leftNode.childNodes.length)) {
        const iconWrap = document.createElement('div');
        iconWrap.className = 'text-gray-400 group-focus-within:text-[#a459fd] transition-colors flex-shrink-0';
        iconWrap.appendChild(leftNode);
        container.appendChild(iconWrap);
    }

    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    input.disabled = disabled;
    input.className = 'flex-1 outline-none border-none bg-transparent placeholder:text-[#111111] placeholder:font-["Inter"] placeholder:font-[400] placeholder:text-[12px] placeholder:leading-[24.84px] text-[#111827] text-base font-normal h-full';
    
    // Use BaseComponent's bindValue for two-way binding
    this.bindValue(input, 'value');

    container.appendChild(input);

    // Render right slot for icon if present
    const rightNode = this.renderSlot('right');
    if (rightNode && (rightNode.textContent.trim() || rightNode.childNodes.length)) {
        const iconWrap = document.createElement('div');
        iconWrap.className = 'text-gray-400 group-focus-within:text-[#a459fd] transition-colors flex-shrink-0';
        iconWrap.appendChild(rightNode);
        container.appendChild(iconWrap);
    }

    return container;
  }
}

// Register as <my-input>
defineComponent('my-input', InputField);
