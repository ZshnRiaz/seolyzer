import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * A responsive Navbar component matching the project's dashboard UI.
 * Features:
 * - Integrated Search bar.
 * - Action dropdown (orange).
 * - Notification system.
 * - User profile display with name, role, and avatar.
 * - Fully responsive layout using Tailwind CSS.
 */
export class Navbar extends BaseComponent {
  static get observedAttributes() {
    return ['user-name', 'user-role', 'user-avatar', 'notifications'];
  }

  render() {
    const userName = this.getAttribute('user-name') || 'User Name';
    const userRole = this.getAttribute('user-role') || 'Role';
    const userAvatar = this.getAttribute('user-avatar') || 'https://i.pravatar.cc/150?u=zubia';
    const hasNotifications = this.hasAttribute('notifications');

    const container = document.createElement('header');
    container.className = 'w-full h-[84px] bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[100] shadow-sm font-[inter]';

    // 0. MOBILE TOGGLE: Hamburger Menu (Visible only on small screens)
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none';
    mobileToggle.innerHTML = '<i class="fi fi-rr-menu-burger text-[20px] flex items-center"></i>';
    mobileToggle.onclick = () => this.emit('toggle-sidebar');
    container.appendChild(mobileToggle);

    // 1. LEFT: Search (Hidden on small mobile, compact on others)
    const leftSide = document.createElement('div');
    leftSide.className = 'hidden sm:flex items-center flex-1 max-w-[400px] mr-4';
    leftSide.innerHTML = `
        <my-search placeholder="Search" class="w-full scale-90 origin-left"></my-search>
    `;
    container.appendChild(leftSide);

    // 2. RIGHT: Actions & Profile
    const rightSide = document.createElement('div');
    rightSide.className = 'flex items-center gap-2 md:gap-6 flex-shrink-0';

    // Action Dropdown
    const actionDropdown = document.createElement('div');
    actionDropdown.className = 'hidden lg:block shrink-0';
    actionDropdown.innerHTML = `
        <my-dropdown 
            value="Content Optimization Area" 
            variant="orange"
        ></my-dropdown>
    `;
    rightSide.appendChild(actionDropdown);

    // Notification Icon
    const notifyBtn = document.createElement('div');
    notifyBtn.className = 'hidden   w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-50 lg:flex items-center justify-center text-[#a459fd] cursor-pointer hover:bg-gray-100 transition-colors relative flex-shrink-0';
    notifyBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
        ${hasNotifications ? '<div class="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FF383C] rounded-full border-2 border-white"></div>' : ''}
    `;
    rightSide.appendChild(notifyBtn);

    // Divider (Hidden on mobile)
    const divider = document.createElement('div');
    divider.className = 'hidden md:block w-[1px] h-8 bg-gray-100 mx-1';
    rightSide.appendChild(divider);

    // User Profile
    const profile = document.createElement('div');
    profile.className = 'flex items-center gap-3 pl-2 cursor-pointer group hover:bg-gray-50 p-2 rounded-2xl transition-all';
    profile.innerHTML = `
        <div class="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 flex-shrink-0">
            <img src="${userAvatar}" class="w-full h-full object-cover" alt="${userName}">
        </div>
        <div class="hidden sm:flex flex-col text-left group-hover:translate-x-0.5 transition-transform">
            <span class="text-[13px] font-black text-gray-900 leading-tight">${userName}</span>
            <span class="text-[11px] font-bold text-gray-400 capitalize">${userRole}</span>
        </div>
        <div class="text-gray-400 group-hover:text-gray-600 ml-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
            </svg>
        </div>
    `;
    rightSide.appendChild(profile);

    container.appendChild(rightSide);

    return container;
  }
}

defineComponent('my-navbar', Navbar);
