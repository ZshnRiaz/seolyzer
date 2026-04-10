import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingFAQ extends BaseComponent {
  init() {
    this.state = {
      activeIndex: null,
      faqs: [
        {
          question: "How do I start a new analysis in SEOlyze?",
          answer: "Simply navigate to the Analysis section, enter your target URL and primary keywords, and click 'Start Analysis'. Our system will crawl the page, analyze competing content, and provide actionable WDF/IDF insights in minutes."
        },
        {
          question: "Can I customize my own stopwords list?",
          answer: "Yes! SEOlyze allows you to manage global and project-specific stopwords. You can easily add, remove, or import custom lists to ensure your analysis focuses only on the terms that matter for your SEO strategy."
        },
        {
          question: "What data does the WDF/IDF Editor provide?",
          answer: "The editor provides a comprehensive comparison of your keyword weight against the top-performing competitors. It highlights over-optimization, missing semantic terms, and suggests the ideal term frequency to improve your rankings."
        },
        {
          question: "How do I track landing page performance?",
          answer: "Our Monitoring module lets you track specific landing pages over time. It records keyword movements, performance scores, and technical SEO health, presenting them in easy-to-read charts so you can see the impact of your optimizations."
        },
        {
          question: "Is there access for multiple writers on one project?",
          answer: "Absolutely. Our Agency and Enterprise plans support multi-user collaboration. You can invite writers, assign specific projects, and allow them to use the WDF/IDF editor directly with pre-configured optimization goals."
        }
      ]
    };
  }

  toggleActive(index) {
    this.state.activeIndex = this.state.activeIndex === index ? null : index;
    this.refresh();
  }

  render() {
    const { faqs, activeIndex } = this.state;
    const container = document.createElement('section');
    container.className = 'w-full py-4 md:py-24 bg-transparent flex flex-col items-center px-6';

    container.innerHTML = `
    
        <div class="max-w-[800px] font-['Inter'] font-semibold text-[48px] leading-[66px] tracking-[0px] text-center vertical-align: middle  w-full mb-8 md:mb-16">
            <h2 class="text-[32px] md:text-[48px] font-semibold text-[#111111] mb-6 tracking-tight leading-tight">
                Frequently <span class="italic text-[#8F5FC4]">Asked</span> Questions
            </h2>
            <p class="font-['Inter'] font-normal text-sm md:text-[16px] leading-[24px] tracking-[0px] text-center vertical-align: middle  text-[#4C4C4C] max-w-[540px] mx-auto leading-relaxed">
                Find quick answers to common queries about SEOlyze, its features, and how to get the most out of the platform.
            </p>
        </div>

        <div class="max-w-[900px] w-full flex flex-col gap-2 md:gap-5">
            ${faqs.map((faq, index) => {
                const isOpen = activeIndex === index;
                return `
                <div class="faq-item">
                    <div 
                        class="w-full bg-white border border-gray-100 rounded-[14px] overflow-hidden transition-all duration-300 ${isOpen ? '' : ''}"
                    >
                        <!-- Question Header -->
                        
                        <button 
                            class="faq-toggle w-full px-8 py-6 flex items-center justify-between text-left group"
                            data-index="${index}"
                        >
                            <span class="text-sm font-['Inter'] md:text-[16px] !font-medium text-[#111111] transition-colors duration-300 ${isOpen ? 'text-[#8F5FC4]' : 'group-hover:text-black'}">${faq.question}</span>
                            
                            <!-- Dynamic Icon (+ to - transition) -->
                            <div class="relative w-6 h-6 flex items-center justify-center">
                                <div class="absolute w-2 h-[1.2px] bg-[#111111] transition-all duration-300"></div>
                                <div class="absolute w-2 h-[1.2px] bg-[#111111] transition-all duration-300 ${isOpen ? 'rotate-0 opacity-0' : 'rotate-90'}"></div>
                            </div>
                        </button>

                        <!-- Expanding Content -->
                        <div class="grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}">
                            <div class="overflow-hidden">
                                <div class="px-8 pb-8 pt-0 text-[#4C4C4C] font-['Inter'] text-[15px] md:text-[16px] leading-[24px]">
                                    ${faq.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;}).join('')}
        </div>
    `;

    container.querySelectorAll('.faq-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            this.toggleActive(index);
        });
    });

    return container;
  }
}

defineComponent('landing-faq', LandingFAQ);
