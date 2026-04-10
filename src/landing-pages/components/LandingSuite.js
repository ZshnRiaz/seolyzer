import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingSuite extends BaseComponent {
  render() {
    const container = document.createElement('section');
    container.className = 'w-full py-12 md:py-24 bg-transparent flex flex-col items-center gap-12 md:gap-[60px]';

    container.innerHTML = `
        <!-- Header -->
        <div class="flex flex-col items-center gap-6">
            <div class="flex flex-col md:flex-row items-center gap-2 text-center font-['Inter'] font-semibold text-[32px] md:text-[52px] leading-tight md:leading-[66px] tracking-tight">
                <p class="text-[#111111]">All-in-One SEO</p>
                <p class="italic text-[#8F5FC4]">Suite</p>
            </div>
            <p class="font-['Inter'] text-center font-normal text-[#4C4C4C] text-sm md:text-[16px] max-w-[505px] leading-relaxed">
                Three powerful modules combined to drive smarter insights, better optimization, and real results.
            </p>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-[18px] w-full max-w-[1440px]">
            
            <!-- Card 1: Content Creation -->
            <div class="bg-white w-full md:w-[360px]] rounded-[16px] px-6 md:pl-[35px] md:pr-[38px] py-8 flex flex-col h-full shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
            <div class="flex flex-col gap-[15px]">
                <h3 class="font-['Inter'] font-semibold text-[24px] leading-[32px] tracking-[0%] text-[#111111]">Content Creation Area</h3>
                <p class="font-['Inter'] font-normal text-[14px] leading-[22px] tracking-[0%] text-[#4C4C4C]">Write, edit, and optimize content efficiently in one place.</p>
            </div>
                <div class="w-full h-[1px] bg-gray-100 my-8"></div>
                <ul class="flex md:gap-[16px] gap-[10px] font-['Inter'] font-normal text-[14px] leading-[22px] tracking-[0%] !text-[#4C4C4C] flex-col mb-[26px]">
                    ${this.renderFeature('Public Beta')}
                    ${this.renderFeature('Better WDF/IDF Content Optimization')}
                    ${this.renderFeature('Extensive wizard for content creation')}
                    ${this.renderFeature('Briefing for Content Creation')}
                    ${this.renderFeature('Integrated system for different editors')}
                    ${this.renderFeature('Clear management of all content orders')}
                    ${this.renderFeature('Perfect support agile content development')}
                    ${this.renderFeature('Illustration complete content development')}
                </ul>
                <div class="w-full h-[1px] bg-[#6C6C6C4D] mt-auto mb-[30px]"></div>
 <div class="flex justify-end">
                <my-button type="primary" text="Add-ons/Upgrades" show-icon="false" class="w-full sm:!w-[200px] !rounded-[12px] !h-[48px] font-bold shadow-md active:scale-95">
                    Add-ons/Upgrades
                </my-button>
                </div>
            </div>

            <!-- Card 2: Content Analysis (Featured) -->
            <div class="bg-[#111111] w-full md:w-[360px]] rounded-[16px] px-6 md:pl-[35px] md:pr-[38px] py-8 flex flex-col h-full shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
             <div class="flex flex-col gap-[15px]">
                <h3 class="font-['Inter'] font-semibold text-[24px] leading-[32px] tracking-[0%] text-white">Content Analysis Area</h3>
                <p class="font-['Inter'] w-full max-w-[350px] font-normal text-[13px] leading-[22px] tracking-[0%] text-[#FFFFFF]">Quickly evaluate your content's SEO performance and identify improvement opportunities.</p>
                </div>
                <div class="w-full h-[1px] bg-white/10 my-8"></div>
                
                <ul class="flex md:gap-[16px] gap-[10px] flex-col mb-[26px]">
                    ${this.renderFeature('Advanced WDF*IDF Analysis', true)}
                    ${this.renderFeature('Ultimate Keyword Research (New)', true)}
                    ${this.renderFeature('Live Content Editor', true)}
                    ${this.renderFeature('Professional Bulk Analysis', true)}
                    ${this.renderFeature('W-Questions Research Tool', true)}
                    ${this.renderFeature('On-Page & Duplicate Checks', true)}
                    ${this.renderFeature('Readability & Style Analysis', true)}
                    ${this.renderFeature('Landing Page Rank Tracking', true)}
                </ul>
                <div class="w-full h-[1px] bg-white/10 mt-auto mb-[30px]"></div>
                <div class="flex justify-end">
                <my-button type="primary" text="Add-ons/Upgrades" show-icon="false" class="w-full sm:!w-[200px] !rounded-[12px] !h-[48px] font-bold shadow-md active:scale-95">
                    Add-ons/Upgrades
                </my-button>
                </div>
            </div>

            <!-- Card 3: Content Monitoring -->
            <div class="bg-white w-full md:w-[360px]] rounded-[16px] px-6 md:pl-[35px] md:pr-[38px] py-8 flex flex-col h-full shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 md:col-span-2 lg:col-span-1">
                <div class="flex flex-col gap-[15px]">
                    <h3 class="font-['Inter'] font-semibold text-[24px] leading-[32px] tracking-[0%] text-[#111111]">Content Monitoring Area</h3>
                    <p class="font-['Inter'] font-normal text-[14px] leading-[22px] tracking-[0%] text-[#4C4C4C]">Monitor your keyword rankings and track SEO performance over time.</p>
                </div>
                <div class="w-full h-[1px] bg-gray-100 my-8"></div>
                
                <ul class="flex md:gap-[16px] gap-[10px] flex-col mb-[26px]">
                    ${this.renderFeature('50 ranking monitoring tools for your projects')}
                    ${this.renderFeature('Daily and automatic review')}
                    ${this.renderFeature('Monitoring of top competitors')}
                    ${this.renderFeature('NO limit on the number of monitored projects')}
                    ${this.renderFeature('Keyword categories for improved overview')}
                    ${this.renderFeature('A separate ranking index for each project')}
                    ${this.renderFeature('Sub-accounts for employees or customers')}
                    ${this.renderFeature('Automatic reporting with all relevant data')}
                </ul>
                <div class="w-full h-[1px] bg-[#6C6C6C4D] mt-auto mb-[30px] "></div>
                <div class="flex justify-end">
                    <my-button type="primary" text="Add-ons/Upgrades" show-icon="false" class="w-full sm:!w-[200px] !rounded-[12px] !h-[48px] font-bold shadow-md active:scale-95">
                        Add-ons/Upgrades
                    </my-button>
                </div>
            </div>

        </div>
    `;

    return container;
  }

  renderFeature(text, isDark = false) {
    const textColor = isDark ? 'text-[#FFFFFF]' : 'text-[#4C4C4C]';
    const checkColor = isDark ? 'text-[#8F5FC4]' : 'text-[#8F5FC4] opacity-80';
    
    return `
        <li class="flex items-start gap-3">
            <svg class="w-4 h-4 flex-shrink-0 mt-1 ${checkColor}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="${textColor} text-[13px] leading-[22px]">${text}</span>
        </li>
    `;
  }
}

defineComponent('landing-suite', LandingSuite);
