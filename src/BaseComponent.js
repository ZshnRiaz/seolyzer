/**
 * A Base Component class for Vanilla JS components that supports:
 * - Custom Element syntax (<my-button>)
 * - Native Tailwind support (Light DOM)
 * - Slots (via capture and replace)
 * - Event shorthand (@click, @change)
 * - Two-way binding
 */
export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.props = {};
    this.state = {};
    this._initialized = false;
    this._capturedSlots = null;
  }

  static get modelProp() {
    return 'value';
  }

  connectedCallback() {
    if (this._initialized) return;
    this._capturedSlots = this._captureSlots();
    this._syncAttributes();
    this.init();
    this.refresh();
    this._initialized = true;
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._syncAttributes();
      if (this._initialized) {
        // Optimization: If we are typing in an input and the attribute update 
        // matches the current input value, skip refresh to prevent focus loss.
        const activeEl = document.activeElement;
        const modelProp = this.constructor.modelProp || 'value';
        const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT');
        
        if (isInput && this.contains(activeEl) && name === modelProp && activeEl.value === newValue) {
            return;
        }

        this.refresh();
      }
    }
  }

  _captureSlots() {
    const slots = { default: [] };
    while (this.firstChild) {
      const child = this.firstChild;
      if (child.nodeType === 1 && child.hasAttribute('slot')) {
        const slotName = child.getAttribute('slot');
        slots[slotName] = child;
      } else {
        slots.default.push(child);
      }
      this.removeChild(child);
    }
    return slots;
  }

  _syncAttributes() {
    Array.from(this.attributes).forEach(attr => {
      this.props[attr.name] = attr.value;
      
      // Handle shorthand events like @click or @change
      if (attr.name.startsWith('@') && !this[`_bound_${attr.name}`]) {
        const eventName = attr.name.slice(1);
        const handlerName = attr.value;
        this.addEventListener(eventName, (e) => {
           // Look in app state methods first, then window
           if (window.__app_methods__ && typeof window.__app_methods__[handlerName] === 'function') {
               window.__app_methods__[handlerName](e.detail !== undefined ? e.detail : e);
           } else if (typeof window[handlerName] === 'function') {
               window[handlerName](e.detail !== undefined ? e.detail : e);
           }
        });
        this[`_bound_${attr.name}`] = true;
      }
    });
  }

  renderSlot(name = 'default', fallback = '', context = null) {
    const content = this._capturedSlots[name];
    if (!content) return fallback;

    const process = (node) => {
        const clone = node.cloneNode(true);
        if (context) {
            this._applyContext(clone, context);
        }
        return clone;
    };

    if (Array.isArray(content)) {
        const fragment = document.createDocumentFragment();
        content.forEach(node => fragment.appendChild(process(node)));
        return fragment;
    }
    return process(content);
  }

  _applyContext(element, context) {
    if (element.nodeType === 3) {
        element.textContent = element.textContent.replace(/\{\{(.+?)\}\}/g, (match, path) => {
            return this._resolveValue(path.trim(), context) ?? '';
        });
    } else if (element.nodeType === 1) {
        element.childNodes.forEach(child => this._applyContext(child, context));
        Array.from(element.attributes).forEach(attr => {
            if (attr.value.includes('{{')) {
                const newValue = attr.value.replace(/\{\{(.+?)\}\}/g, (match, path) => {
                    return this._resolveValue(path.trim(), context) ?? '';
                });
                element.setAttribute(attr.name, newValue);
            }
        });
    }
  }

  _resolveValue(path, context) {
      if (!path) return context;
      const keys = path.split('.');
      let val = context;
      for (const key of keys) {
          // Remove 'data.' prefix if user uses it per Vue convention
          const k = (key === 'data' && keys.indexOf(key) === 0) ? '' : key;
          if (k) {
              val = val ? val[k] : undefined;
          }
      }
      return val;
  }

  init() {}

  emit(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  bindValue(inputElement, propKey) {
    const val = this.props[propKey];
    if (val !== undefined) inputElement.value = val;

    inputElement.addEventListener('input', (e) => {
      const newValue = inputElement.type === 'number' ? Number(e.target.value) : e.target.value;
      this.emit(`update:${propKey}`, newValue);
      this.props[propKey] = newValue;
      this.setAttribute(propKey, newValue);
    });
  }

  refresh() {
    const content = this.render();
    if (typeof content === 'string') {
        this.innerHTML = content;
    } else {
        this.innerHTML = '';
        this.appendChild(content);
    }
  }

  render() {
    return `<div>Base</div>`;
  }
}

export function defineComponent(tagName, componentClass) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, componentClass);
  }
}

/**
 * A more complete Vue-like App creator for Vanilla JS.
 * Supports: v-model, :attr (bind), @event, watch, computed, reactive data.
 */
export function createApp(options) {
  const { data, el, watch = {}, computed = {}, methods = {}, router } = options;
  const root = document.querySelector(el);
  const rawData = typeof data === 'function' ? data() : data;

  // Store router instance globally for router-view / router-link access
  if (router) {
    window.__app_router__ = router;
  }

  // Store methods globally for component event lookups
  window.__app_methods__ = methods;

  // 1. Setup Computed Properties
  const computedValues = {};
  Object.keys(computed).forEach(key => {
      Object.defineProperty(computedValues, key, {
          get: () => computed[key].call(state)
      });
  });

  // 2. Create Reactive Proxy
  const state = new Proxy(rawData, {
    set(target, key, value) {
      const oldVal = target[key];
      if (oldVal === value) return true;
      
      target[key] = value;
      
      // Trigger watchers
      if (watch[key]) watch[key].call(state, value, oldVal);
      
      // Re-sync DOM
      syncDOM();
      return true;
    },
    get(target, key) {
        if (key in computedValues) return computedValues[key];
        return target[key];
    }
  });

  // Attach state to methods
  Object.keys(methods).forEach(k => {
      methods[k] = methods[k].bind(state);
  });

  // Bind $router and $route to state for access in methods via this.$router / this.$route
  if (router) {
    Object.defineProperty(state, '$router', {
      get() { return router; },
      enumerable: false
    });
    Object.defineProperty(state, '$route', {
      get() { return router.currentRoute; },
      enumerable: false
    });
  }

  function resolvePath(path, obj) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
  }

  function syncDOM() {
    // A. Update v-model
    root.querySelectorAll('[v-model]').forEach(element => {
        const key = element.getAttribute('v-model');
        const componentClass = customElements.get(element.tagName.toLowerCase());
        const modelProp = componentClass ? componentClass.modelProp : 'value';
        
        const value = resolvePath(key, state);
        if (element.getAttribute(modelProp) != value) element.setAttribute(modelProp, value);
        if (element.value !== undefined && element.value != value) element.value = value;
    });

    // B. Update attribute bindings :attr="key"
    root.querySelectorAll('*').forEach(element => {
        Array.from(element.attributes).forEach(attr => {
            if (attr.name.startsWith(':')) {
                const targetAttr = attr.name.slice(1);
                const key = attr.value;
                const value = resolvePath(key, state);

                if (element.tagName.includes('-') || (typeof value !== 'string' && value !== null)) {
                    if (element[targetAttr] !== value) {
                        element[targetAttr] = value;
                    }
                }
                
                const isPrimitive = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
                if (isPrimitive && element.getAttribute(targetAttr) != String(value)) {
                    element.setAttribute(targetAttr, value);
                }
            }
        });
    });

    // C. Update text bindings v-text="key"
    root.querySelectorAll('[v-text]').forEach(el => {
        const key = el.getAttribute('v-text');
        el.textContent = resolvePath(key, state);
    });
  }

  // Initial scan for initial listeners
  function initApp() {
    // Setup v-model listeners
    root.querySelectorAll('[v-model]').forEach(element => {
        const key = element.getAttribute('v-model');
        const componentClass = customElements.get(element.tagName.toLowerCase());
        const modelProp = componentClass ? componentClass.modelProp : 'value';
        
        const eventType = componentClass ? `update:${modelProp}` : 'input';
        element.addEventListener(eventType, (e) => {
            const val = e.detail !== undefined ? e.detail : e.target.value;
            // Support updating nested properties via v-model
            const parts = key.split('.');
            const leaf = parts.pop();
            const parent = resolvePath(parts.join('.'), state);
            if (parent) parent[leaf] = val;
        });
    });

    // Setup @click and other events for non-custom elements in the root
    // (Custom elements handle their own @ attributes in _syncAttributes)
    root.querySelectorAll('*').forEach(element => {
        // We skip custom elements because they handle @ via BaseComponent logic
        if (element.tagName.includes('-')) return;

        Array.from(element.attributes).forEach(attr => {
            if (attr.name.startsWith('@')) {
                const eventName = attr.name.slice(1);
                const handlerName = attr.value;
                element.addEventListener(eventName, (e) => {
                    if (methods[handlerName]) methods[handlerName](e);
                });
            }
        });
    });

    syncDOM();
  }

  initApp();

  // Initialize router after app DOM is ready (so router-view is mounted)
  if (router) {
    // Connect any router-view elements that were mounted before the router was available
    if (window.__pending_router_views__) {
      window.__pending_router_views__.forEach(view => {
        view._connectToRouter(router);
      });
      window.__pending_router_views__ = [];
    }

    // Listen for route changes to sync DOM
    router.onRouteChange(() => {
      syncDOM();
    });

    // Handle manual triggers (e.g. from RouterView after scripts)
    window.__app_sync_dom__ = syncDOM;

    router.init();
  }

  return state;
}
