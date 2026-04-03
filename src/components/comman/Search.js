import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A reusable Search Input component that matches the Figma design.
 * Features:
 * - Search icon (magnifying glass)
 * - Placeholder support
 * - Clear button (X) that appears when text is entered
 * - Two-way data binding (v-model)
 * - Focused/Active states
 */
export class Search extends BaseComponent {
  static get observedAttributes() {
    return ['placeholder', 'value', 'disabled'];
  }

  static get modelProp() {
    return 'value';
  }

  render() {
    const placeholder = this.props['placeholder'] || 'Search';
    const value = this.props['value'] || '';
    const disabled = this.hasAttribute('disabled');

    const container = document.createElement('div');
    container.className = `
      flex items-center gap-x-3 bg-white rounded-xl border border-gray-200 
      px-4 min-w-[300px] h-[52px] transition-all duration-200 group
      ${disabled ? 'opacity-60 cursor-not-allowed bg-[#fafafa]' : 'hover:border-gray-300 focus-within:border-[#a459fd] focus-within:ring-4 focus-within:ring-[#a459fd]/10 focus-within:shadow-sm'}
    `.replace(/\s+/g, ' ').trim();

    // Search Icon
    const searchIcon = document.createElement('div');
    searchIcon.className = 'text-gray-400 group-focus-within:text-[#a459fd] transition-colors flex-shrink-0';
    searchIcon.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    `;
    container.appendChild(searchIcon);

    // Input Wrapper
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'flex-1 relative h-full flex items-center';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.value = value;
    input.disabled = disabled;
    input.className = 'w-full outline-none border-none bg-transparent placeholder:text-gray-400 text-gray-900 text-[15px] font-medium leading-none h-full';
    
    // Bind value for v-model support
    this.bindValue(input, 'value');

    // Also handle input for visual updates (showing/hiding clear button)
    input.addEventListener('input', (e) => {
        const val = e.target.value;
        this._toggleClearButton(container, val.length > 0 && !disabled);
    });

    inputWrapper.appendChild(input);
    container.appendChild(inputWrapper);

    // Clear Button
    const clearBtn = this._createClearButton(input);
    if (!value || disabled) clearBtn.classList.add('hidden');
    container.appendChild(clearBtn);

    return container;
  }

  _createClearButton(input) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'clear-btn';
    btn.className = 'text-gray-300 hover:text-gray-500 focus:outline-none transition-all duration-200 p-1 flex-shrink-0 rounded-full hover:bg-gray-100';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    btn.addEventListener('click', () => {
        input.value = '';
        input.dispatchEvent(new Event('input')); // Trigger bindValue listener
        input.focus();
        btn.classList.add('hidden');
    });
    return btn;
  }

  _toggleClearButton(container, show) {
      const btn = container.querySelector('#clear-btn');
      if (btn) {
          if (show) btn.classList.remove('hidden');
          else btn.classList.add('hidden');
      }
  }
}

// Register as <my-search>
defineComponent('my-search', Search);
