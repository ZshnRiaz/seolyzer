import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingAbout extends BaseComponent {
  render() {
    const container = document.createElement('section');
    container.className = 'w-full max-w-[1200px] py-12 md:py-24 px-6 md:px-0 bg-transparent flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[63px] !mx-auto';

    container.innerHTML = `
        <!-- Content Side -->
        <div class="w-full md:w-1/2 max-w-[540px] text-center md:text-left">
            <h2 class="font-['Inter'] font-semibold text-[32px] md:text-[48px] leading-[1.2] md:leading-[1.1] text-[#111111] mb-6 md:mb-8 tracking-tight">
                About Us — <span class="italic text-[#8F5FC4]">SEOlyze</span>
            </h2>

            <p class="font-['Inter'] font-normal text-base md:text-[18px] leading-[26px] md:leading-[28px] text-[#4C4C4C]">
                SEOlyze.com is a next-generation SEO and content optimization platform designed to help businesses improve their online visibility and search performance. Using advanced semantic analysis (TF-IDF), SEOlyze provides in-depth keyword research, content optimization, and ranking monitoring tools to create highly relevant, competitive content and grow your organic traffic.
            </p>
        </div>

        <!-- Preview Side -->
        <div class="w-full md:w-1/2 relative flex justify-center items-center">
            <!-- Background Decorative Glow -->
            <div class="absolute inset-0 bg-gradient-to-tr from-[#E2D4F0] via-[#FDFAEE] to-[#FDECCE] opacity-60 blur-[120px] rounded-full z-0"></div>
            
            <!-- Dashboard Screenshot Wrap -->
            <div class="relative z-10 w-full flex justify-center">
                <img src="/public/images/Frame.png" alt="SEOlyze Dashboard Preview" class="w-full h-auto max-h-[500px] object-contain rounded-[12px] md:rounded-[20px] ">
            </div>
        </div>
    `;

    return container;
  }
}

defineComponent('landing-about', LandingAbout);
