import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingKeywords extends BaseComponent {
  render() {
    const container = document.createElement('section');
    container.className = 'w-full py-4 md:py-24 bg-transparent flex flex-col items-center px-6';

    const cards = [
      { country: "Germany", count: "40M", active: true, flag: "DE" },
      { country: "Austria", count: "28M", active: false, flag: "AT" },
      { country: "Spain", count: "30M", active: false, flag: "ES" },
      { country: "Italy", count: "30M", active: false, flag: "IT" }
    ];

    container.innerHTML = `
        <!-- Header -->
        <div class="text-center max-w-[800px] mb-20 flex flex-col items-center gap-[25px]">
      

            <h2 class=" font-['Inter'] font-semibold text-[32px] md:text-[48px] leading-[40px] md:leading-[66px] tracking-tight ">
                Ultimate <span class="italic font-['Inter'] font-semibold text-[32px] md:text-[48px] md:leading-[66px] leading-[40px] tracking-tight text-[#8F5FC4]">Keyword</span><br>
                Research Tool
            </h2>
            <p class="font-normal text-sm md:text-[16px] max-w-[620px] leading-[24px] text-[#4C4C4C]">
                Discover high-impact keywords, analyze trends, and uncover opportunities to boost your content and rankings.
            </p>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1200px]">
            ${cards.map(card => `
                <div class="relative ${card.active ? 'bg-[#FF8F00] text-white' : 'bg-white text-[#111111]'} w-full min-h-[188px] rounded-[20px] p-8 pt-12 shadow-sm border ${card.active ? 'border-[#FF8F00]' : 'border-gray-50'} hover:shadow-xl transition-all duration-500 overflow-hidden">
                    <!-- Flag Icon Badge -->
                    <div class="absolute top-[22px] right-[22px] w-[50px] h-[50px] rounded-full ${card.active ? 'bg-white text-[#ffffff]' : 'bg-[#FFF5E9] '} flex items-center justify-center shadow-sm">
                        <div class="w-[18px] h-[18px] !rounded-[40px] flex items-center justify-center shadow-inner">
                            ${this.renderFlag(card.flag)}
                        </div>
                    </div>
                    
                    <div class="flex mt-[28px] flex-col gap-2">
                        <span class="font-['Inter'] font-semibold text-[58px] leading-[100%] tracking-normal">${card.count}</span>
                        <span class="font-['Inter'] font-medium text-sm leading-[22px] tracking-normal" style="color: ${card.active ? 'white' : '#4C4C4C'}">Keywords for ${card.country}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    return container;
  }

  renderFlag(code) {
    const flags = {
      DE: `<svg viewBox="0 0 512 512" class="w-full h-full"><rect width="512" height="170.7" fill="#000"/><rect y="170.7" width="512" height="170.7" fill="#D00"/><rect y="341.3" width="512" height="170.7" fill="#FFCE00"/></svg>`,
      AT: `<svg viewBox="0 0 512 512" class="w-full h-full"><rect width="512" height="170.7" fill="#ED2939"/><rect y="170.7" width="512" height="170.7" fill="#FFF"/><rect y="341.3" width="512" height="170.7" fill="#ED2939"/></svg>`,
      ES: `<svg viewBox="0 0 512 512" class="w-full h-full"><rect width="512" height="128" fill="#AD1519"/><rect y="128" width="512" height="256" fill="#FABD00"/><rect y="384" width="512" height="128" fill="#AD1519"/></svg>`,
      IT: `<svg viewBox="0 0 512 512" class="w-full h-full"><rect width="170.7" height="512" fill="#009246"/><rect x="170.7" width="170.7" height="512" fill="#FFF"/><rect x="341.4" width="170.7" height="512" fill="#CE2B37"/></svg>`
    };
    return flags[code] || '';
  }
}

defineComponent('landing-keywords', LandingKeywords);
