import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingFooter extends BaseComponent {
  render() {
    const container = document.createElement('footer');
    container.className = 'w-full bg-[#0a0a0a] text-white pt-[130px] pb-[40px] font-["Inter"] overflow-hidden';

    container.innerHTML = `
        <!-- CTA Section -->
        <div class="container mx-auto px-6 text-center mb-[120px] relative">
            <!-- Radial Glow Effect -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[800px] h-[500px] bg-[#38260F] opacity-50 blur-[120px] rounded-[100%] pointer-events-none"></div>
            
            <div class="relative z-10 flex flex-col gap-[25px] items-center justify-center">
                <h2 class="font-semibold md:text-[48px] text-[30px] leading-[66px] tracking-normal text-center">
                    NEXT LEVEL <span class="italic font-semibold md:text-[48px] text-[30px] leading-[66px] tracking-normal text-center font-normal text-[#8F5FC4]">Website</span><br>
                    Optimization
                </h2>

                <p class="text-[#FFFFFF] max-w-[580px] mx-auto font-['Inter'] font-weight-[400] font-style-[Regular] font-size-[16px] leading-trim-[NONE] line-height-[24px] letter-spacing-[0px] text-align-[center] ">
                    Take your website performance to the next level with advanced<br class="hidden md:block">
                    tools, insights, and strategies that boost rankings, speed,<br class="hidden md:block">
                    and user engagement.
                </p>
                <div class="flex justify-center">
                    <my-button type="primary" text="Try It Free For 30 Days" show-icon="false" class="w-full sm:w-auto !h-[48px] ">
                        Try It Free For 30 Days
                    </my-button>
                </div>
            </div>
        </div>

        <!-- Footer Main Content -->
        <div class="container mx-auto px-6 lg:px-20">
            <div class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-y-[20px] md:gap-y-[100px] relative">
                
                <!-- Left Column: Menu -->
                <div class="flex flex-col py-4 pr-4 md:text-start text-center gap-[25px]">
                    <h3 class="font-['Inter'] font-bold text-[20px] leading-[30px] text-white">Menu</h3>
                    <div class="grid grid-cols-2 gap-y-[2px] gap-x-[15px] w-fit md:mx-0 mx-auto">
                        <div class="flex  flex-col gap-[21px]">
                            <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">Function</a>
                            <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">Testimonial</a>
                            <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">Questions?</a>
                            <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">Privacy Policy</a>
                        </div>
                        <div class="flex flex-col gap-[21px]">
                            <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">Module</a>
                            <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">Plan</a>
                            <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">LogIn</a>
                            <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">Legal Notice</a>
                        </div>
                    </div>
                    <a href="#" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px] ">Terms and Conditions</a>
                </div>

                <!-- Vertical Divider Left (Desktop only) -->
                <div class="hidden md:block absolute left-[28%] top-0 bottom-0 w-[1px] bg-gray-800/40"></div>

                <!-- Middle Column: Logo & Description -->
                <div class="flex flex-col items-center text-center px-4 py-4 gap-[35px]">
                    <!-- Logo Component -->
                    <div class="flex gap-2.5 mt-5 mb-5">
                       <img src="/public/images/seolyze 1.png" alt="Logo" class="w-[208px] h-[58px]">
                    </div>

                    <p class="text-base font-['Inter'] font-normal text-[#D1D1D1] leading-[24px] w-full max-w-[580px] sm:whitespace-nowrap md:whitespace-normal">
                        A comprehensive SEO platform that provides tools for<br class="hidden md:block">
                        keyword research, content optimization, competitive<br class="hidden md:block">
                        analysis, and performance monitoring.
                    </p>
                    
                    <p class="text-base font-['Inter'] font-normal text-[#D1D1D1] leading-[24px] opacity-80 sm:whitespace-nowrap">
                        © Copyright 2026 by SEOlyze.com - All Rights Reserved.
                    </p>
                </div>

                <!-- Vertical Divider Right (Desktop only) -->
                <div class="hidden md:block absolute left-[72%] top-0 bottom-0 w-[1px] bg-gray-800/40"></div>

                <!-- Right Column: Contact -->
                <div class="flex flex-col items-center md:items-start text-center md:text-left py-4 md:pl-20">
                    <h3 class="font-['Inter'] font-bold text-[20px] leading-[30px] mb-10 text-white">Contact Us</h3>
                    <div class="flex flex-col gap-[15px] mb-12">
                        <a href="mailto:seolyzecompany@gmail.com" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">seolyzecompany@gmail.com</a>
                        <a href="tel:+1123098765432" class="text-[#D1D1D1] hover:text-white transition-colors text-[16px] leading-[24px]">+1(123) 0987 654 32</a>
                        <p class="text-[#D1D1D1] text-[16px] leading-[24px]">
                            13th Street. 47 W 13th St,<br>
                            New York
                        </p>
                    </div>
                    
                    <!-- Social Icons -->
                    <div class="flex items-center gap-8">
                        <a href="#" class="text-white hover:opacity-70 transition-all">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a href="#" class="text-white hover:opacity-70 transition-all">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a href="#" class="text-white hover:opacity-70 transition-all">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="#" class="text-white hover:opacity-70 transition-all">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    `;

    return container;
  }
}

defineComponent('landing-footer', LandingFooter);
