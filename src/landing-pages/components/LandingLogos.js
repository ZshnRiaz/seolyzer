import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingLogos extends BaseComponent {
  render() {
    const container = document.createElement('section');
    container.className = 'w-full p-4 md:py-16 bg-transparent flex flex-col items-center gap-4 overflow-hidden';

    // Logo data as HTML strings
    const logos = [
      '<div class="flex items-center gap-2 font-bold text-xl text-gray-500 hover:text-gray-900 transition-colors cursor-default"><span class="text-2xl font-black">finanzen<span class="text-blue-500/50">.de</span></span></div>',
      '<div class="flex items-center gap-2 font-bold text-xl text-gray-500 hover:text-gray-900 transition-colors cursor-default"><div class="w-6 h-6 bg-gray-300 rounded-full"></div><span>Witt-Gruppe</span></div>',
      '<div class="flex items-center gap-2 font-bold text-xl text-gray-500 px-6 hover:text-gray-900 transition-colors cursor-default"><span class="tracking-tighter uppercase whitespace-nowrap">Active Traffic</span></div>',
      '<div class="flex items-center gap-2 font-bold text-xl text-gray-500 hover:text-gray-900 transition-colors cursor-default"><span class="lowercase">friseur<span class="text-gray-300">.com</span></span></div>',
      '<div class="bg-gray-400 text-white px-2 py-0.5 text-sm font-black italic whitespace-nowrap hover:bg-gray-600 transition-colors cursor-default">GRÜNDERSZENE</div>',
      '<div class="flex flex-col leading-none font-black text-gray-500 hover:text-gray-900 transition-colors cursor-default"><span>OTTO</span><span class="text-[10px] font-medium border-t border-gray-300">OFFICE</span></div>',
      '<div class="flex items-center gap-3 font-semibold text-xl text-gray-500 hover:text-gray-900 transition-colors cursor-default"><span class="text-2xl whitespace-nowrap">otto group</span></div>',
      '<div class="flex items-center gap-2 font-medium text-lg text-gray-400 hover:text-gray-900 transition-colors cursor-default"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg><span class="whitespace-nowrap">websitehosting</span></div>'
    ];

    const logoContent = logos.join('');
    container.innerHTML = `
        <h3 class="font-['Inter']  font-semibold text-[20px] text-[#111111] tracking-tight mb-10">
            A selection of satisfied customers
        </h3>
        
        <div class="relative w-full px-4 max-w-full overflow-hidden flex grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div class="logo-scroll-container flex animate-scroll whitespace-nowrap">
                <div class="flex items-center gap-[34px] md:gap-[34px]">
                    ${logoContent}
                </div>
                <div class="flex items-center gap-[34px] md:gap-[34px]">
                    ${logoContent}
                </div>
                <div class="flex items-center gap-[34px] md:gap-[34px]">
                    ${logoContent}
                </div>
            </div>
        </div>

        <style>
            .logo-scroll-container {
                display: flex;
                width: max-content;
                animation: infinite-scroll 60s linear infinite;
                /* Ensure it doesn't cause overflow until it starts moving */
                will-change: transform;
            }

            @keyframes infinite-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.33%); }
            }

            .relative:hover .logo-scroll-container {
                animation-play-state: paused;
            }
            
        </style>
    `;

    return container;
  }
}

defineComponent('landing-logos', LandingLogos);
