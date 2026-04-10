import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingHero extends BaseComponent {
  render() {
    const container = document.createElement('section');
    container.className = 'w-full py-20 px-6 gap-[45px] flex flex-col items-center text-center ';

    container.innerHTML = `
        <div class="max-w-[900px] flex flex-col gap-[20px] md:gap-[45px]">
            <h1 class="font-['Inter'] font-semibold text-[36px] md:text-[58px] leading-[1.2] md:leading-[76px] tracking-[-0.02em] text-gray-900 text-center ">
                Optimize & Monitor <span class="italic text-[#8F5FC4]">Next</span>
                <br>
                <span class="italic text-[#8F5FC4]">Level</span> Optimization
            </h1>
            <p class="font-['Inter'] font-normal text-[18px] leading-[26px] tracking-[0px] text-[#4C4C4C] max-w-[650px] mx-auto text-center ">
                Continuously improve your content and track performance to ensure<br class="hidden md:block"> 
                better rankings and long-term SEO success.
            </p>
            
            <div class="flex justify-center">
                <my-button type="primary" text="Try It Free For 30 Days" show-icon="false" class="w-full sm:w-auto !h-[48px] px-12 !rounded-[10px] text-[16px] font-semibold transition-all">
                    Try It Free For 30 Days
                </my-button>
            </div>
        </div>
    `;

    return container;
  }
}

defineComponent('landing-hero', LandingHero);
