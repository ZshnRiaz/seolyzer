import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * <router-link> — Declarative navigation component.
 * 
 * Renders as a clickable element that navigates via the router
 * instead of a full page reload.
 * 
 * Attributes:
 *   - to          : Path string, e.g. "/dashboard"
 *   - name        : Route name (alternative to `to`)
 *   - replace     : If present, uses router.replace() instead of push()
 *   - active-class: CSS class when this link's route is active (default: "router-link-active")
 *   - exact       : If present, only adds active class on exact path match
 *   - tag         : HTML tag to render as (default: "a")
 * 
 * Usage:
 *   <router-link to="/dashboard">Dashboard</router-link>
 *   <router-link to="/users/42" active-class="is-active">User</router-link>
 *   <router-link name="keyword-research">Keywords</router-link>
 */
export class RouterLink extends HTMLElement {
  constructor() {
    super();
    this._capturedContent = null;
    this._initialized = false;
    this._unsubscribe = null;
  }

  static get observedAttributes() {
    return ['to', 'name', 'active-class', 'exact', 'replace', 'tag'];
  }

  connectedCallback() {
    if (this._initialized) return;

    // Capture slot content before we modify innerHTML
    this._capturedContent = this.innerHTML;
    this._initialized = true;

    this._render();
    this._setupRouteWatcher();
  }

  disconnectedCallback() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._initialized) {
      this._render();
      this._updateActiveState();
    }
  }

  _getRouter() {
    return window.__app_router__;
  }

  _getResolvedPath() {
    const router = this._getRouter();
    if (!router) return '#';

    const to = this.getAttribute('to');
    const name = this.getAttribute('name');

    if (to) return to;
    if (name) return router.resolve({ name });

    return '#';
  }

  _getHref() {
    const router = this._getRouter();
    const path = this._getResolvedPath();

    if (router && router._mode === 'hash') {
      return '#' + path;
    }
    return path;
  }

  _render() {
    const tagName = this.getAttribute('tag') || 'a';
    const href = this._getHref();
    const isReplace = this.hasAttribute('replace');

    const el = document.createElement(tagName);
    
    if (tagName === 'a') {
      el.setAttribute('href', href);
    }

    el.style.cursor = 'pointer';
    el.style.textDecoration = 'none';
    el.style.color = 'inherit';
    el.innerHTML = this._capturedContent || '';

    // Click handler — prevent default and use router
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const router = this._getRouter();
      if (!router) return;

      const path = this._getResolvedPath();
      if (isReplace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    });

    this.innerHTML = '';
    this.appendChild(el);

    // Apply active state
    this._updateActiveState();
  }

  _setupRouteWatcher() {
    const router = this._getRouter();
    if (!router) return;

    this._unsubscribe = router.onRouteChange(() => {
      this._updateActiveState();
    });
  }

  _updateActiveState() {
    const router = this._getRouter();
    if (!router) return;

    const activeClass = this.getAttribute('active-class') || 'router-link-active';
    const exactActiveClass = 'router-link-exact-active';
    const isExact = this.hasAttribute('exact');
    const targetPath = this._getResolvedPath();
    const currentPath = router.currentRoute?.path || '';

    // Remove existing classes
    this.classList.remove(activeClass, exactActiveClass);

    // Check for match
    const isExactMatch = currentPath === targetPath;
    const isPartialMatch = currentPath.startsWith(targetPath) && targetPath !== '/';

    if (isExact) {
      if (isExactMatch) {
        this.classList.add(activeClass, exactActiveClass);
      }
    } else {
      if (isExactMatch) {
        this.classList.add(activeClass, exactActiveClass);
      } else if (isPartialMatch) {
        this.classList.add(activeClass);
      }
    }
  }
}

defineComponent('router-link', RouterLink);
