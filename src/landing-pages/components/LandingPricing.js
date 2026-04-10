import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingPricing extends BaseComponent {
  render() {
    const container = document.createElement('section');
    container.className = 'w-full py-12 md:py-[130px] rounded-[40px] px-4 md:px-[120px] bg-[#111111] flex flex-col items-center';

    container.innerHTML = `
        <!-- Header -->
        <div class="flex flex-col gap-6  md:gap-[60px] items-center mb-16">
            <div class="text-center max-w-[800px] flex flex-col items-center gap-6">
                <h2 class="font-['Inter'] font-semibold text-[32px] md:text-[48px] leading-[1.2] md:leading-[66px] text-[#FFFFFF] tracking-tight">
                    Your SEO Strategy Plan
                </h2>
                <p class="font-['Inter'] font-normal text-[#D1D1D1] text-[16px] max-w-[580px] leading-[24px]">
                    Choose the right subscription to access features that fit your needs and scale your SEO efforts effectively.
                </p>
            </div>

            <!-- CTA Button -->
            <div class="">
                <my-button type="primary" text="Start Now" show-icon="false">
                    Start Now
                </my-button>
            </div>
        </div>

        <!-- Switcher -->
        <div class="flex items-center gap-4 bg-[#1E1E1E] p-1 rounded-full mb-16 border border-white/5">
            <div class="p-1 flex items-center gap-1">
                <button class="px-6 py-2 rounded-full text-sm font-medium bg-[#2A2A2A] text-white transition-all shadow-sm">Monthly</button>
                <div class="flex items-center gap-2 transition-all hover:bg-white/5 px-4 py-2 rounded-full cursor-pointer">
                    <span class="text-sm font-medium text-[#71717A]">Annual</span>
                    <span class="text-[#a3cc00] text-[10px] bg-[#a3cc00]/10 px-1.5 py-0.5 rounded">-20%</span>
                </div>
            </div>
        </div>

        <!-- Table Container -->
        <div class="w-full max-w-[1240px] overflow-x-auto">
            <table class="w-full border-collapse text-left text-white min-w-[900px]">
                <thead>
                    <tr>
                        <th class="py-8 w-[25%] pr-4 font-semibold text-[18px]"></th>
                        <th class="px-2">
                           <div class="bg-[#262626] rounded-[10px] py-[20px] px-4 text-center border border-white/5 shadow-xl w-[180px] md:w-[204px] h-[94px] mx-auto flex flex-col justify-center">
                                <div class="text-[18px] md:text-[20px] font-semibold font-['Inter'] text-[#FFFFFF] mb-1">Trial</div>
                                <div class="text-[12px] md:text-[14px] font-normal font-['Inter'] text-[#FFFFFFBF] leading-tight">Free for 30 days</div>
                            </div>
                        </th>
                        <th class="px-2">
                           <div class="bg-[#262626] rounded-[10px] py-[20px] px-4 text-center border border-white/5 shadow-xl w-[180px] md:w-[204px] h-[94px] mx-auto flex flex-col justify-center">
                                <div class="text-[18px] md:text-[20px] font-semibold font-['Inter'] text-[#FFFFFF] mb-1">Starter</div>
                                <div class="text-[12px] md:text-[14px] font-normal font-['Inter'] text-[#FFFFFFBF] leading-tight">€ 39.00 / month</div>
                            </div>
                        </th>
                        <th class="px-2">
                           <div class="bg-[#262626] rounded-[10px] py-[20px] px-4 text-center border border-white/5 shadow-xl w-[180px] md:w-[204px] h-[94px] mx-auto flex flex-col justify-center">
                                <div class="text-[18px] md:text-[20px] font-semibold font-['Inter'] text-[#FFFFFF] mb-1">Pro</div>
                                <div class="text-[12px] md:text-[14px] font-normal font-['Inter'] text-[#FFFFFFBF] leading-tight">€ 74.00 / month</div>
                            </div>
                        </th>
                        <th class="px-2">
                           <div class="bg-[#262626] rounded-[10px] py-[20px] px-4 text-center border border-white/5 shadow-xl w-[180px] md:w-[204px] h-[94px] mx-auto flex flex-col justify-center">
                                <div class="text-[18px] md:text-[20px] font-semibold font-['Inter'] text-[#FFFFFF] mb-1">Ultimate</div>
                                <div class="text-[12px] md:text-[14px] font-normal font-['Inter'] text-[#FFFFFFBF] leading-tight">€ 129.00 / month</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="font-['Inter']">
                    <!-- Category: Content optimization -->
                    <tr>
                        <td colspan="5" class="pt-16 pb-8 text-[#FFFFFF] font-bold text-[20px] leading-[24px]">Content optimization</td>
                    </tr>
                    ${this.renderRow('WDF/IDF analysis', '5', 'Unlimited', 'Unlimited', 'Unlimited')}
                    ${this.renderRow('Copywriter access', '3', '30', '100', '250')}
                    ${this.renderRow('W-questions tool', '3', 'Unlimited', 'Unlimited', 'Unlimited')}
                    ${this.renderRow('Keyword Research', '3', 'Unlimited', 'Unlimited', 'Unlimited')}

                    <!-- Category: Content Creation -->
                    <tr>
                        <td colspan="5" class="pt-16 pb-8 text-[#FFFFFF] font-bold text-[20px] leading-[24px]">Content Creation</td>
                    </tr>
                    ${this.renderRow('Briefing Creator', '1', '5 / month', '50 / month', '200 / month')}
                    ${this.renderRow('Editors', '0', '1', '5', '25')}

                    <!-- Category: Performance Monitoring -->
                    <tr>
                        <td colspan="5" class="pt-16 pb-8 text-[#FFFFFF] font-bold text-[20px] leading-[24px]">Performance Monitoring</td>
                    </tr>
                    ${this.renderRow('Keywords', '10', '50', '250', '700')}
                    ${this.renderRow('Projects', '1', 'Unlimited', 'Unlimited', 'Unlimited')}

                    <!-- Category: Additional Functions -->
                    <tr>
                        <td colspan="5" class="pt-16 pb-8 text-[#FFFFFF] font-bold text-[20px] leading-[24px]">Additional Functions</td>
                    </tr>
                    ${this.renderRow('API', '—', '—', '—', '✓')}
                    ${this.renderRow('Support', '—', 'Message', 'Message + Phone', 'Message + Phone')}
                    ${this.renderRow('Webinar / Training', '—', '—', '—', '✓')}
                </tbody>
            </table>
        </div>
    `;

    return container;
  }

  renderRow(label, v1, v2, v3, v4) {
    const formatValue = (v) => {
        if (v === '✓') return `✓`;
        return v;
    };

    const valueColor = 'text-white opacity-60';

    return `
        <tr class="border-y border-white/[0.08] hover:bg-white/[0.02] transition-all">
            <td class="py-6 pr-4 font-normal text-white text-[16px]">${label}</td>
            <td class="py-6 px-4 text-center text-[16px] font-normal border-l border-white/[0.08] ${valueColor}">${formatValue(v1)}</td>
            <td class="py-6 px-4 text-center text-[16px] font-normal border-l border-white/[0.08] ${valueColor}">${formatValue(v2)}</td>
            <td class="py-6 px-4 text-center text-[16px] font-normal border-l border-white/[0.08] ${valueColor}">${formatValue(v3)}</td>
            <td class="py-6 px-4 text-center text-[16px] font-normal border-l border-white/[0.08] ${valueColor}">${formatValue(v4)}</td>
        </tr>
    `;
  }
}

defineComponent('landing-pricing', LandingPricing);
