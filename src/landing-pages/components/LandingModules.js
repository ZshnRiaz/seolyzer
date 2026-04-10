import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingModules extends BaseComponent {
  render() {
    const container = document.createElement('section');
    container.className = 'w-full py-4 md:py-24 px-6 md:px-20 bg-transparent flex flex-col items-center gap-[40px] md:gap-[60px]';

    container.innerHTML = `
        <!-- Header -->
        <div class="text-center max-w-[800px] flex flex-col items-center gap-6">
            <h2 class="font-['Inter'] font-semibold text-[32px] md:text-[54px] leading-tight text-[#111111] tracking-tight text-center">
                Innovative <span class="italic text-[#8F5FC4]">Modules</span><br>
                and Functions
            </h2>
            <p class="font-['Inter'] font-normal text-[#4C4C4C] text-sm md:text-[16px] max-w-[580px] leading-[24px] text-center">
                Access advanced features and smart tools designed to enhance performance, streamline workflows, and deliver better results.
            </p>
        </div>

        <!-- Cards Container -->
        <div class="w-full max-w-[1240px] !mx-auto flex flex-col gap-8">
            <!-- Top Card: Content Creation (Horizontal) -->
            <div class="bg-[#ffffff] w-full max-w-[935px] !mx-auto min-h-[300px] opacity-[1] rounded-[14px] px-6   flex flex-col lg:flex-row items-center justify-between gap-0 md:gap-12 overflow-hidden relative shadow-sm hover:shadow-md transition-all">
                <!-- Background Glow Effect (Cliped to Card) -->
                <div class="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-[60%] bg-[#8F5FC4] opacity-15 blur-[100px] rounded-full pointer-events-none  z-0 !top-0 left-[100%] "></div>
                
                <div class="relative py-[51px] z-10 w-full lg:w-1/2 flex flex-col gap-6">
                    <h3 class="font-['Inter'] font-semibold capitalize md:text-[24px] text-[20px] leading-[32px] text-[#111111]">Content Creation</h3>
                    <p class="font-['Inter'] text-sm font-normal text-[#4C4C4C] leading-[22px]">
                        Create and optimize your content directly at SEOlyze.com. SEOlyze.com's comprehensive and easy-to-understand reports provide you with the precise data you need to further optimize your content quickly and easily.
                    </p>
                    <a href="#" class="text-[#a3cc00] leading-[22px] font-['Inter'] font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-[16px]">
                        Learn More <span>></span>
                    </a>
                </div>
                <div class="relative z-10 w-full py-[26px] lg:w-[45%] flex justify-center lg:justify-end">
                    <img src="../public/images/Group.png" alt="Content Creation Dashboard" class="w-full max-w-[450px] md:max-w-[500px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(143,95,196,0.3)]">
                </div>
            </div>

            <!-- Bottom Row: 2 Columns -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[935px] !mx-auto">
                
                <!-- Card 2: Research -->
                <div class="bg-[#ffffff] w-full max-w-[458px] min-h-[402px] opacity-[1] rounded-[14px] px-[24px] py-[24px] flex flex-col gap-10 md:h-full overflow-hidden relative shadow-sm hover:shadow-md transition-all">
                    <!-- Background Glow Effect (Cliped to Card) -->
                    <div class="absolute w-[300px] h-[300px] -translate-x-1/2 -translate-y-[60%] bg-[#8F5FC4] opacity-15 blur-[70px] rounded-full pointer-events-none z-0 left-[90%] "></div>

                    <div class="relative z-10 flex justify-center w-full">  
                        <img src="../public/images/LocalSettings.png" alt="Research Analysis" class="w-full max-w-[180px] md:max-w-[220px] h-[139px] md:h-[160px] object-contain drop-shadow-[0_15px_40px_rgba(143,95,196,0.15)]">
                    </div>
                    <div class="relative z-10 flex flex-col gap-[15px]">
                        <h3 class="font-['Inter'] font-semibold capitalize md:text-[24px] text-[20px] leading-[32px] text-[#111111]">Research, Analyze Optimize</h3>
                        <p class="font-['Inter'] text-sm font-normal text-[#4C4C4C] leading-[22px]">
                            Benefit from comprehensive analyses based on the WDF*IDF principle and make your content stand out from your competitors. Analyze and optimize your content using the insights from SEOlyze.com.
                        </p>
                        <a href="#" class="text-[#a3cc00] leading-[22px] font-['Inter'] font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-[16px]">
                            Learn More <span>></span>
                        </a>
                    </div>
                </div>

                <!-- Card 3: Monitoring -->
                <div class="bg-[#ffffff] w-full max-w-[458px] min-h-[402px] opacity-[1] rounded-[14px] px-[24px] py-[24px] flex flex-col gap-10 md:h-full overflow-hidden relative shadow-sm hover:shadow-md transition-all">
                    <!-- Background Glow Effect (Cliped to Card) -->
                    <div class="absolute w-[300px] h-[300px] -translate-x-1/2 -translate-y-[60%] bg-[#8F5FC4] opacity-15 blur-[70px] rounded-full pointer-events-none z-0 left-[90%] "></div>

                    <div class="relative z-10 flex justify-center w-full">
                        <img src="../public/images/Rank-Tracker.png" alt="Ranking Monitoring" class="w-full max-w-[180px] md:max-w-[220px] h-[139px] md:h-[160px] object-contain drop-shadow-[0_15px_40px_rgba(143,95,196,0.15)]">
                    </div>
                    <div class="relative z-10 flex flex-col gap-6">
                        <h3 class="font-['Inter'] font-semibold capitalize md:text-[24px] text-[20px] leading-[32px] text-[#111111]">Ranking Monitoring</h3>
                        <p class="font-['Inter'] text-sm font-normal text-[#4C4C4C] leading-[22px]">
                            Monitor your success with our comprehensive and up-to-date ranking monitoring. Keep a constant eye on your main competitors through direct comparison in all reports.
                        </p>
                        <a href="#" class="text-[#a3cc00] leading-[22px] font-['Inter'] font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-[16px]">
                            Learn More <span>></span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    `;

    return container;
  }
}

defineComponent('landing-modules', LandingModules);
