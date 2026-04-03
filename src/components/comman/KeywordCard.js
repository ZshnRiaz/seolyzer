import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A Card component specifically for displaying Keyword clouds.
 * Features:
 * - Specific typography for keyword density displays
 * - Rounded corners and consistent padding
 * - Slot-based content for flexible keyword formatting
 */
export class KeywordCard extends BaseComponent {
  static get observedAttributes() {
    return ['title'];
  }

  render() {
    const title = this.getAttribute('title') || 'Keywords';

    const container = document.createElement('div');
    container.className = 'bg-white rounded-[16px] p-6 w-[280px] min-h-[160px] shadow-sm flex flex-col gap-4 border border-gray-100 hover:shadow-md transition-shadow';

    const titleEl = document.createElement('h3');
    titleEl.className = 'text-[14px] font-bold text-gray-900 leading-tight border-b border-gray-50 pb-3 mb-1';
    titleEl.textContent = title;
    container.appendChild(titleEl);

    // Body container for the keyword text
    const body = document.createElement('div');
    body.className = 'text-[12px] leading-[1.8] text-gray-500 font-medium';
    
    const slotContent = this.renderSlot('default');
    if (slotContent) {
        if (slotContent instanceof DocumentFragment) {
            body.appendChild(slotContent);
        } else {
            body.appendChild(slotContent.cloneNode(true));
        }
    }

    container.appendChild(body);

    return container;
  }
}

// Register as <my-keyword-card>
defineComponent('my-keyword-card', KeywordCard);
