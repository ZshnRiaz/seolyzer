import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * <router-view> — Renders the component matched by the current route.
 * 
 * Automatically listens for route changes from the global router instance
 * and swaps the displayed page component with a smooth transition.
 * 
 * Usage:
 *   <router-view></router-view>
 *   <router-view name="sidebar"></router-view>  (named views — future)
 */
export class RouterView extends HTMLElement {
  constructor() {
    super();
    this._currentComponent = null;
    this._unsubscribe = null;
  }

  connectedCallback() {
    // Apply base styles for transitions
    this.style.display = 'block';
    this.style.position = 'relative';
    this.style.minHeight = '0';

    // Calculate depth for nested routes
    this._depth = this._calculateDepth();

    // Try to connect to router
    this._tryConnect();
  }

  /**
   * Calculates how many router-views are above this one in the DOM.
   */
  _calculateDepth() {
    let depth = 0;
    let parent = this.parentElement;
    while (parent) {
      if (parent.tagName.toLowerCase() === 'router-view') {
        depth++;
      }
      parent = parent.parentElement;
    }
    return depth;
  }

  /**
   * Attempts to connect to the router. If the router isn't available yet,
   * registers this element in a global pending list that the router will call on init.
   */
  _tryConnect() {
    const router = window.__app_router__;
    if (router) {
      this._connectToRouter(router);
    } else {
      // Router not available yet — register for deferred connection
      window.__pending_router_views__ = window.__pending_router_views__ || [];
      window.__pending_router_views__.push(this);
    }
  }

  /**
   * Called when the router instance becomes available.
   */
  _connectToRouter(router) {
    if (this._unsubscribe) return; // Already connected

    // Listen for route changes
    this._unsubscribe = router.onRouteChange((to, from) => {
      this._renderRoute(to);
    });

    // Render the current route if already navigated
    if (router.currentRoute && router.currentRoute.matched) {
      this._renderRoute(router.currentRoute);
    }
  }

  disconnectedCallback() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  async _renderRoute(route) {
    if (!route || !route.matched || !route.matched[this._depth]) {
      this.innerHTML = '';
      this._currentComponent = null;
      return;
    }

    const routeDef = route.matched[this._depth];
    const component = routeDef.component;
    const templateUrl = routeDef.templateUrl;

    if (!component && !templateUrl) {
      this.innerHTML = '';
      this._currentComponent = null;
      return;
    }

    // Add leave animation to current content
    if (this.firstChild) {
      this.firstChild.style.transition = 'opacity 0.15s ease-out, transform 0.15s ease-out';
      this.firstChild.style.opacity = '0';
      this.firstChild.style.transform = 'translateY(6px)';
      await new Promise(r => setTimeout(r, 150));
    }

    // Clear current content
    this.innerHTML = '';
    this._currentComponent = null;

    let content = null;

    // Case 0: templateUrl is provided — fetch HTML from file
    if (templateUrl) {
      try {
        window.__app_template_cache__ = window.__app_template_cache__ || {};
        let html = window.__app_template_cache__[templateUrl];
        
        if (!html) {
          // Normalize: always fetch from root to avoid recursion on subfolders
          const rootUrl = new URL(templateUrl, window.location.origin).href;
          
          const response = await fetch(rootUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          
          html = await response.text();
          
          // CRITICAL Recursion Check: Verify we didn't fetch the main app shell (index.html)
          // We check for the unique main script import to distinguish snippets from the shell.
          if (html.includes('src="/src/main.js"') || html.includes("src='/src/main.js'") || html.includes('href="/index.html"')) {
              console.error('[RouterView] Infinite recursion detected. Server redirected template request to index.html.');
              throw new Error(`Server Configuration Error: The server returned the main index.html instead of the template "${templateUrl}". This usually happens with SPA catch-all rules.`);
          }
          
          window.__app_template_cache__[templateUrl] = html;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'router-view-page flex-grow p-0 overflow-y-auto w-full';
        wrapper.innerHTML = html;
        
        // --- SCRIPT EXECUTION LOGIC ---
        // Browser won't execute scripts added via innerHTML. We must manually create and append them.
        setTimeout(() => {
          const scripts = wrapper.querySelectorAll('script');
          scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.textContent = oldScript.textContent;
            // Place script near its original location OR in document head
            oldScript.parentNode.replaceChild(newScript, oldScript);
          });
          
          // Re-sync components if any new ones were defined in the template
          if (window.__app_sync_dom__) window.__app_sync_dom__();
        }, 0);

        content = wrapper;
      } catch (err) {
        console.error('[router-view] Template error:', err);
        this.innerHTML = `<div class="p-8 text-red-500">Error loading page: ${err.message}</div>`;
        return;
      }
    }

    // Case 1: component is a function that returns HTML string or DOM element
    else if (typeof component === 'function' && !component.prototype?.connectedCallback) {
      const result = component(route);
      if (typeof result === 'string') {
        const wrapper = document.createElement('div');
        wrapper.className = 'router-view-page';
        wrapper.innerHTML = result;
        content = wrapper;
      } else if (result instanceof HTMLElement || result instanceof DocumentFragment) {
        content = result;
      }
    }

    // Case 2: component is a custom element class (extends HTMLElement)
    else if (typeof component === 'function' && component.prototype?.connectedCallback) {
      // If not yet registered, auto-register with a generated tag name
      let tagName = component._routerTagName;
      if (!tagName) {
        // Check if already registered
        const existing = [...Object.entries(window.__router_registered_tags__ || {})].find(([, cls]) => cls === component);
        if (existing) {
          tagName = existing[0];
        } else {
          tagName = 'route-page-' + Math.random().toString(36).slice(2, 8);
          if (!customElements.get(tagName)) {
            customElements.define(tagName, component);
          }
          window.__router_registered_tags__ = window.__router_registered_tags__ || {};
          window.__router_registered_tags__[tagName] = component;
        }
        component._routerTagName = tagName;
      }
      content = document.createElement(tagName);
    }

    // Case 3: component is a string (tag name of already-registered custom element)
    else if (typeof component === 'string') {
      content = document.createElement(component);
    }

    // Case 4: component is an object with a render() method
    else if (typeof component === 'object' && component !== null && typeof component.render === 'function') {
      const result = component.render(route);
      if (typeof result === 'string') {
        const wrapper = document.createElement('div');
        wrapper.className = 'router-view-page';
        wrapper.innerHTML = result;
        content = wrapper;
      } else if (result instanceof HTMLElement || result instanceof DocumentFragment) {
        content = result;
      }
    }

    if (content) {
      // Pass route params as attributes if it's a custom element
      if (content.setAttribute && route.params) {
        Object.entries(route.params).forEach(([key, val]) => {
          content.setAttribute('route-' + key, val);
        });
      }

      // Enter animation
      content.style.opacity = '0';
      content.style.transform = 'translateY(6px)';
      content.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';

      this.appendChild(content);
      this._currentComponent = content;

      // Trigger enter animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          content.style.opacity = '1';
          content.style.transform = 'translateY(0)';
        });
      });
    }
  }
}

defineComponent('router-view', RouterView);
