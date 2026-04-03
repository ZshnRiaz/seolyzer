/**
 * Main Application Entry Point
 * 
 * Sets up the router with all page routes, configures guards,
 * and initializes the reactive app with the sidebar/navbar shell.
 */
import { createApp } from './BaseComponent.js';
import { createRouter } from './Router.js';
import './components/index.js';

// ─── Router Setup ────────────────────────────────────────────
const router = createRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      templateUrl: '/src/static/dashboard.htm',
      meta: { title: 'Dashboard - SEOlyze', sidebarId: 'analysis' }
    },
    {
      path: '/keyword-research',
      name: 'keyword-research',
      templateUrl: '/src/static/keyword-research.htm',
      meta: { title: 'Keyword Research - SEOlyze', sidebarId: 'keyword' }
    },
    {
      path: '/text-providers',
      name: 'text-providers',
      templateUrl: '/src/static/text-providers.htm',
      meta: { title: 'Certified Text Providers - SEOlyze', sidebarId: 'certified' }
    },

    {
      path:'/showcase',
      name:'showcase',
      templateUrl: '/src/static/showcase.htm',
      meta: { title: 'Showcase - SEOlyze', sidebarId: 'showcase' }
    },
    {
      path: '*',
      redirect: '/dashboard'
    }
  ]
});

// ─── Global Guards ────────────────────────────────────────────

// Guard: Update document title on navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || 'SEOlyze';
  next();
});

// After hook: Log navigation
router.afterEach((to, from) => {
  console.log(`[Router] Navigated: ${from.path || '(start)'} → ${to.path}`);
});

// ─── App Initialization ──────────────────────────────────────

const state = createApp({
  el: '#app',
  router,
  data() {
    return {
      isSidebarOpen: "false",
      menu: JSON.stringify([
        { id: 'analysis', label: 'WDF/IDF Analysis', icon: 'fi-rr-chart-line-up', route: '/dashboard' },
        { 
          id: 'keyword', label: 'Keyword-Research', hasChildren: true, icon: 'fi-rr-folder-tree', route: '/keyword-research',
          children: [ { label: 'Search Volume' }, { label: 'Difficulty' } ]
        },
        { id: 'onpage', label: 'OnPage Area', icon: 'fi-rr-document' },
        { id: 'snippet', label: 'Snippet-Optimizer', icon: 'fi-rr-magic-wand' },
        { id: 'question', label: 'Question-Tool', icon: 'fi-rr-interrogation' },
        { id: 'pro', label: 'Professional Analysis', icon: 'fi-rr-briefcase' },
        { id: 'editor', label: 'WDF/IDF Editor', icon: 'fi-rr-edit' },
        { id: 'quick', label: 'WDF Quick Check', icon: 'fi-rr-check' },
        { id: 'saved', label: 'Saved Analyses', icon: 'fi-rr-picture' },
        { id: 'landing', label: 'Landingpage Monitoring', icon: 'fi-rr-flag' },
        { id: 'writers', label: 'Access for Writers', icon: 'fi-rr-pencil' },
        { id: 'certified', label: 'Certified Text Providers', icon: 'fi-rr-shield-check', route: '/text-providers' },
        { id: 'videos', label: 'Videos', icon: 'fi-rr-play-alt' }
      ]),
      stats: JSON.stringify([
        { label: 'Briefings:', value: 1, variant: 'primary' },
        { label: 'Redakteure:', value: 0, variant: 'primary' },
        { label: 'Access for Writers:', value: 2, variant: 'warning' },
        { label: 'Ranking Monitoring:', value: 10, variant: 'success' }
      ])
    };
  },
  watch: {
    isSidebarOpen(val) {
      const overlay = document.getElementById('sidebar-overlay');
      if (val === "true") {
        overlay.classList.remove('pointer-events-none', 'opacity-0');
        overlay.classList.add('opacity-100');
      } else {
        overlay.classList.add('pointer-events-none', 'opacity-0');
        overlay.classList.remove('opacity-100');
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = this.isSidebarOpen === "true" ? "false" : "true";
    },
    handleNavClick(item) {
      // Navigate when sidebar item has a route
      if (item && item.route) {
        this.$router.push(item.route);
      }
    }
  }
});

// Make state available for debugging
window.state = state;
window.router = router;
