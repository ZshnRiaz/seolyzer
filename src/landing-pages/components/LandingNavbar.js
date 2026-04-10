import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingNavbar extends BaseComponent {
  init() {
    this.state = { isMenuOpen: false };
  }

  toggleMenu() {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    this.refresh();
  }

  render() {
    const isMenuOpen = this.state.isMenuOpen;
    const container = document.createElement('div');
    container.className = 'w-[95%] max-w-[1200px] px-8 md:px-0 mx-auto mt-6 !sticky top-6 z-[1000]';

    container.innerHTML = `
        <nav class="bg-[#F2EAF9] backdrop-blur-md rounded-[10px] shadow-lg flex items-center justify-between pl-4 md:pl-[22px] md:pr-[16px] py-4 border border-white/20 transition-all duration-300 ${isMenuOpen ? 'rounded-b-none' : ''}">
            <!-- Logo Section -->
            <div class="flex items-center gap-2 cursor-pointer">
               <img src="../public/images/Mask group.png" alt="">
            </div>

            <!-- Desktop Nav Links -->
            <div class="hidden lg:flex items-center font-['Inter'] font-normal !text-[16px] leading-[24px] tracking-normal !text-[#4C4C4C]  gap-[25px]">
                <a href="#" class=" hover:text-black transition-colors">Function</a>
                <a href="#" class=" hover:text-black transition-colors">Module</a>
                <a href="#" class=" hover:text-black transition-colors">Testimonial</a>
                <a href="#" class=" hover:text-black transition-colors">Plan</a>
                <a href="#" class=" hover:text-black transition-colors">Questions?</a>
            </div>

            <!-- Right Side Actions -->
            <div class="flex items-center gap-2 md:gap-4">
                <div class="hidden sm:flex items-center gap-1 px-4 py-2 bg-[#F5F5F5] rounded-xl  border border-[#F5F5F5]">
                    <span class="['Inter'] font-normal !text-[16px] leading-[24px] tracking-normal !text-[#4C4C4C]">En</span>
                    <svg class="text-[#4C4C4C] mt-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </div>
                <my-button type="primary" text="Login" show-icon="false" class="!min-w-0 !w-auto !h-[42px]">
                    Login
                </my-button>
                
                <!-- Mobile Toggle -->
                <button id="menu-toggle" class="lg:hidden p-2 text-gray-600 hover:text-black transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        ${isMenuOpen ? '<path d="M18 6L6 18M6 6l12 12"/>' : '<path d="M3 12h18M3 6h18M3 18h18"/>'}
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Mobile Menu Dropdown -->
        <div class="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl rounded-b-[20px] overflow-hidden transition-all duration-300 origin-top transform ${isMenuOpen ? 'scale-y-100 opacity-100 p-6' : 'scale-y-0 opacity-0 h-0'} border-x border-b border-gray-100">
            <div class="flex flex-col gap-4">
                <a href="#" class="text-lg font-semibold text-gray-700 hover:text-[#a3cc00]">Function</a>
                <a href="#" class="text-lg font-semibold text-gray-700 hover:text-[#a3cc00]">Module</a>
                <a href="#" class="text-lg font-semibold text-gray-700 hover:text-[#a3cc00]">Testimonial</a>
                <a href="#" class="text-lg font-semibold text-gray-700 hover:text-[#a3cc00]">Plan</a>
                <a href="#" class="text-lg font-semibold text-gray-700 hover:text-[#a3cc00]">Questions?</a>
                <hr class="my-2 border-gray-100">
                <div class="flex items-center justify-between px-2">
                   <span class="font-medium text-gray-500 text-sm italic">Language: English</span>
                   <div class="flex gap-2">
                       <span class="w-2 h-2 rounded-full bg-[#a3cc00]"></span>
                       <span class="w-2 h-2 rounded-full bg-gray-200"></span>
                   </div>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#menu-toggle')?.addEventListener('click', () => this.toggleMenu());

    return container;
  }
}

defineComponent('landing-navbar', LandingNavbar);
