/**
 * Vanilla JS Router — Vue Router-like API
 * 
 * Features:
 *   - Hash-based or History-based navigation
 *   - Dynamic route params (/user/:id)
 *   - Wildcard / catch-all routes (*)
 *   - Programmatic navigation: push, replace, back, forward, go
 *   - Route guards: beforeEach, afterEach, per-route beforeEnter
 *   - Redirect support
 *   - Reactive currentRoute object
 */

class Router {
  constructor(options = {}) {
    this._routes = [];
    this._beforeEachGuards = [];
    this._afterEachHooks = [];
    this._listeners = [];
    this._mode = options.mode || 'hash';
    this._started = false;

    this.currentRoute = {
      path: '',
      name: '',
      params: {},
      query: {},
      meta: {},
      matched: null
    };

    // Parse and store route definitions
    if (options.routes) {
      this._routes = options.routes.map(r => this._normalizeRoute(r));
    }
  }

  // ─── Route Normalization ────────────────────────────────────

  _normalizeRoute(route, parentPath = '') {
    const normalized = { ...route };
    
    // Ensure path is absolute or relative to parent
    let fullPath = route.path;
    if (parentPath && !fullPath.startsWith('/')) {
      fullPath = parentPath + (parentPath.endsWith('/') ? '' : '/') + fullPath;
    }
    normalized.path = fullPath;

    // Build regex for path matching
    if (fullPath === '*') {
      normalized._regex = /.*/;
      normalized._paramKeys = [];
    } else {
      const paramKeys = [];
      const regexStr = fullPath
        .replace(/\/:([^/]+)/g, (_, key) => {
          paramKeys.push(key);
          return '/([^/]+)';
        })
        .replace(/\//g, '\\/');
      normalized._regex = new RegExp(`^${regexStr}$`);
      normalized._paramKeys = paramKeys;
    }

    // Normalize children recursively
    if (route.children) {
      normalized.children = route.children.map(c => this._normalizeRoute(c, fullPath));
    }

    return normalized;
  }

  // ─── Route Matching ─────────────────────────────────────────

  _matchRoute(path) {
    const [pathname] = path.split('?');
    const matched = [];
    
    this._doMatch(pathname, this._routes, matched);
    
    if (matched.length > 0) {
      // The last element is the leaf route
      const leaf = matched[matched.length - 1];
      return { 
        route: leaf.route, 
        params: leaf.params,
        matched: matched.map(m => m.route) 
      };
    }

    return null;
  }

  _doMatch(pathname, routes, matched) {
    for (const route of routes) {
      const match = this._testRoute(route, pathname);
      if (match) {
        matched.push(match);
        if (route.children) {
          // If it has children, we might find a more specific match
          this._doMatch(pathname, route.children, matched);
        }
        return true;
      }
    }
    return false;
  }

  _testRoute(route, pathname) {
    if (route.path === '*') {
      return { route, params: { pathMatch: pathname } };
    }

    const match = pathname.match(route._regex);
    if (match) {
      const params = {};
      route._paramKeys.forEach((key, i) => {
        params[key] = decodeURIComponent(match[i + 1]);
      });
      return { route, params };
    }

    return null;
  }

  // ─── Query String Parsing ───────────────────────────────────

  _parseQuery(search) {
    const query = {};
    if (!search) return query;
    const str = search.startsWith('?') ? search.slice(1) : search;
    str.split('&').forEach(pair => {
      const [key, val] = pair.split('=').map(decodeURIComponent);
      if (key) query[key] = val ?? '';
    });
    return query;
  }

  _stringifyQuery(query) {
    if (!query || Object.keys(query).length === 0) return '';
    return '?' + Object.entries(query)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
  }

  // ─── Path Resolution ───────────────────────────────────────

  _resolvePath(to) {
    if (typeof to === 'string') {
      return to;
    }

    if (to.name) {
      const route = this._routes.find(r => r.name === to.name);
      if (!route) {
        console.warn(`[Router] No route found with name: "${to.name}"`);
        return '/';
      }
      let path = route.path;
      if (to.params) {
        Object.entries(to.params).forEach(([key, val]) => {
          path = path.replace(`:${key}`, encodeURIComponent(val));
        });
      }
      return path + this._stringifyQuery(to.query);
    }

    if (to.path) {
      return to.path + this._stringifyQuery(to.query);
    }

    return '/';
  }

  // ─── Current URL Helpers ────────────────────────────────────

  _getCurrentPath() {
    if (this._mode === 'hash') {
      const hash = window.location.hash.slice(1) || '/';
      return hash;
    }
    return window.location.pathname + window.location.search;
  }

  _setUrl(path, replace = false) {
    if (this._mode === 'hash') {
      if (replace) {
        const url = window.location.pathname + window.location.search + '#' + path;
        window.history.replaceState(null, '', url);
      } else {
        window.location.hash = path;
      }
    } else {
      if (replace) {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
    }
  }

  // ─── Navigation Guards Pipeline ─────────────────────────────

  async _runGuards(to, from, guards) {
    for (const guard of guards) {
      const result = await new Promise((resolve) => {
        const next = (arg) => {
          if (arg === undefined || arg === true) {
            resolve({ proceed: true });
          } else if (arg === false) {
            resolve({ proceed: false });
          } else {
            // arg is a redirect path or route object
            resolve({ proceed: false, redirect: arg });
          }
        };
        
        // Call guard — supports both callback style and return-value style
        const returnVal = guard(to, from, next);
        
        // If the guard returns a promise or doesn't call next, handle it
        if (returnVal instanceof Promise) {
          returnVal.then(val => {
            if (val === false) resolve({ proceed: false });
            else if (val && (typeof val === 'string' || typeof val === 'object')) {
              resolve({ proceed: false, redirect: val });
            }
            // If guard returned undefined but already called next, this resolve is ignored
          });
        }
      });

      if (!result.proceed) {
        if (result.redirect) {
          // Perform redirect (prevent infinite loops)
          const redirectPath = this._resolvePath(result.redirect);
          if (redirectPath !== to.path) {
            await this._navigate(redirectPath, true);
          }
        }
        return false;
      }
    }
    return true;
  }

  // ─── Core Navigation ───────────────────────────────────────

  async _navigate(path, isReplace = false) {
    const [pathname, queryString] = path.split('?');
    const query = this._parseQuery(queryString);
    const matched = this._matchRoute(pathname);

    if (!matched) {
      console.warn(`[Router] No matching route for path: "${path}"`);
      return;
    }

    const { route, params, matched: matchedRecords } = matched;

    // Handle redirect
    if (route.redirect) {
      const redirectPath = this._resolvePath(route.redirect);
      return this._navigate(redirectPath, isReplace);
    }

    // Build the "to" route object
    const to = {
      path: pathname,
      fullPath: path,
      name: route.name || '',
      params: params || {},
      query,
      meta: route.meta || {},
      matched: matchedRecords
    };

    const from = { ...this.currentRoute };

    // 1. Run global beforeEach guards
    const globalAllowed = await this._runGuards(to, from, this._beforeEachGuards);
    if (!globalAllowed) return;

    // 2. Run per-route beforeEnter guard
    if (route.beforeEnter) {
      const routeAllowed = await this._runGuards(to, from, [route.beforeEnter]);
      if (!routeAllowed) return;
    }

    // 3. Update URL
    this._setUrl(path, isReplace);

    // 4. Update current route
    Object.assign(this.currentRoute, to);

    // 5. Notify listeners (router-view etc.)
    this._notifyListeners(to, from);

    // 6. Run afterEach hooks
    this._afterEachHooks.forEach(hook => {
      try { hook(to, from); } catch (e) { console.error('[Router] afterEach error:', e); }
    });
  }

  // ─── Listeners (for router-view) ───────────────────────────

  _notifyListeners(to, from) {
    this._listeners.forEach(fn => fn(to, from));
  }

  onRouteChange(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn);
    };
  }

  // ─── Public API ─────────────────────────────────────────────

  /**
   * Register a global before-each guard
   * @param {Function} guard - (to, from, next) => {}
   */
  beforeEach(guard) {
    this._beforeEachGuards.push(guard);
  }

  /**
   * Register a global after-each hook
   * @param {Function} hook - (to, from) => {}
   */
  afterEach(hook) {
    this._afterEachHooks.push(hook);
  }

  /**
   * Navigate to a new route
   * @param {string|object} to - Path string or { name, params, query }
   */
  push(to) {
    const path = this._resolvePath(to);
    return this._navigate(path, false);
  }

  /**
   * Navigate without adding history entry
   * @param {string|object} to - Path string or { name, params, query }
   */
  replace(to) {
    const path = this._resolvePath(to);
    return this._navigate(path, true);
  }

  /** Go back */
  back() {
    window.history.back();
  }

  /** Go forward */
  forward() {
    window.history.forward();
  }

  /** Go by delta */
  go(n) {
    window.history.go(n);
  }

  /**
   * Resolve a route location to a full path
   * @param {string|object} to 
   * @returns {string}
   */
  resolve(to) {
    return this._resolvePath(to);
  }

  /**
   * Add routes dynamically
   * @param {Array} routes 
   */
  addRoutes(routes) {
    routes.forEach(r => {
      this._routes.push(this._normalizeRoute(r));
    });
  }

  /**
   * Start listening for URL changes and navigate to current URL
   */
  init() {
    if (this._started) return;
    this._started = true;

    if (this._mode === 'hash') {
      window.addEventListener('hashchange', () => {
        const path = this._getCurrentPath();
        this._navigate(path, true);
      });
    } else {
      window.addEventListener('popstate', () => {
        const path = this._getCurrentPath();
        this._navigate(path, true);
      });
    }

    // Navigate to current URL
    const currentPath = this._getCurrentPath();
    this._navigate(currentPath, true);
  }
}

/**
 * Factory function to create a router instance (Vue Router style)
 * @param {object} options - { routes, mode }
 * @returns {Router}
 */
export function createRouter(options = {}) {
  return new Router(options);
}

export { Router };
