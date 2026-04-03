import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A highly reusable Progress Bar component.
 * Features:
 * - Reactive 'value' attribute (0-100)
 * - Support for 'variant' (primary, success, error, warning)
 * - Smooth transition animations
 */
export class ProgressBar extends BaseComponent {
  static get observedAttributes() {
    return ['value', 'variant', 'type'];
  }

  render() {
    const value = Math.max(0, Math.min(100, Number(this.props['value']) || 0));
    const variant = this.props['variant'] || this.props['type'] || 'primary';

    const colors = {
        primary: 'bg-[#a459fd]', // Theme Purple
        success: 'bg-[#3eb642]', // Material Green
        error: 'bg-[#FF383C]',   // Red
        warning: 'bg-[#ff9800]', // Original Orange
        gray: 'bg-[#9ca3af]',    // Neutral Gray
    };

    const container = document.createElement('div');
    container.className = 'w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner';

    const bar = document.createElement('div');
    bar.className = `
      h-full transition-all duration-500 ease-out 
      ${colors[variant] || colors.primary} 
      rounded-full shadow-sm
    `.replace(/\s+/g, ' ').trim();
    
    // Set width dynamically
    bar.style.width = `${value}%`;

    container.appendChild(bar);

    return container;
  }
}

// Register as <my-progress-bar>
defineComponent('my-progress-bar', ProgressBar);
