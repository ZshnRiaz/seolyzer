import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A small Tag component with a label and a search icon.
 * Used inside HashtagCard.
 */
export class Tag extends BaseComponent {
  static get observedAttributes() {
    return ['label', 'variant', 'type'];
  }

  render() {
    const label = this.props['label'] || '';
    const variant = this.props['variant'] || this.props['type'] || 'success';

    const colors = {
        success: 'bg-[#f1fff0] text-[#3eb642] border-[#3eb642]/10',
        error: 'bg-[#fff1f1] text-[#ff5252] border-[#ff5252]/10',
        primary: 'bg-[#f5eeff] text-[#a459fd] border-[#a459fd]/10', // Theme purple
        warning: 'bg-[#fff9f0] text-[#ff9800] border-[#ff9800]/10', // Theme orange
        gray: 'bg-gray-50 text-gray-400 border-gray-100'
    };

    const container = document.createElement('div');
    container.className = `
      inline-flex items-center gap-x-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-bold 
      ${colors[variant] || colors.success} border transition-all hover:scale-105 cursor-pointer
    `.trim();

    const span = document.createElement('span');
    span.textContent = label;
    container.appendChild(span);

    // Search Icon (Gold/Orange in spec)
    const iconWrap = document.createElement('div');
    iconWrap.className = 'text-[#ff9800]';
    iconWrap.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    `;
    container.appendChild(iconWrap);

    return container;
  }
}

defineComponent('my-tag', Tag);
