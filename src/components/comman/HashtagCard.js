import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A Card component that displays a title and a collection of Tags.
 * Supports: title, active state (for blue border).
 */
export class HashtagCard extends BaseComponent {
  static get observedAttributes() {
    return ['title', 'active'];
  }

  render() {
    const title = this.props['title'] || '';
    const active = this.hasAttribute('active');

    const container = document.createElement('div');
    container.className = `
      bg-white rounded-[16px] p-6 w-[340px] min-h-[160px] shadow-sm transition-all duration-300
      border-2 ${active ? 'border-[#0091ff] shadow-lg shadow-[#0091ff]/10' : 'border-white'}
    `.trim();

    const titleEl = document.createElement('h3');
    titleEl.className = 'text-[15px] font-bold text-gray-900 mb-6 leading-tight';
    titleEl.textContent = title;
    container.appendChild(titleEl);

    // Flex container for tags via default slot
    const tagsWrapper = document.createElement('div');
    tagsWrapper.className = 'flex flex-wrap gap-2';
    
    const slotContent = this.renderSlot('default');
    if (slotContent) {
        if (slotContent instanceof DocumentFragment) {
            tagsWrapper.appendChild(slotContent);
        } else {
            tagsWrapper.appendChild(slotContent.cloneNode(true));
        }
    }

    container.appendChild(tagsWrapper);

    return container;
  }
}

defineComponent('my-hashtag-card', HashtagCard);
