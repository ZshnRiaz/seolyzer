import { BaseComponent, defineComponent } from '../../BaseComponent.js';

export class LandingTestimonials extends BaseComponent {
  render() {
    const container = document.createElement('section');
    container.className = 'w-full py-12 md:py-24 bg-transparent flex flex-col items-center gap-[20px] md:gap-[60px] overflow-hidden';

    const testimonials = [
      {
        name: "Marco Frazzetta",
        title: "www.om-strategen.de",
        quote: "SEOlyze's topic research, WDF*IDF tools helped us optimize hundreds of articles. Analyzing and editing texts in SEOlyze has become our standard, speeding up our workflow. Thumbs up!",
        avatar: "https://i.pravatar.cc/150?u=marco"
      },
      {
        name: "Nicolas Sacotte",
        title: "Managing Director of active traffic",
        quote: "Anyone who understands what WDF*p*IDF means and how it works simply can't do without SEOlyze.com! The tool offers excellent usability and is fast. The results are easy to analyze and directly applicable for optimizing texts. Therefore, I highly recommend SEOlyze.com!",
        avatar: "https://i.pravatar.cc/150?u=nicolas"
      },
      {
        name: "Paul Porzky",
        title: "COO, www.keyworddomains.com",
        quote: "SEOlyze's WDF-IDF tools have helped us optimize hundreds of articles. Analyzing and editing texts in Seolyze has become our standard, speeding up our workflow. Thumbs up!",
        avatar: "https://i.pravatar.cc/150?u=paul"
      },
      {
        name: "Kevin Hillman",
        title: "Managing Director",
        quote: "We use Seolyze for research, content creation, and optimization. Its clear analyses show which terms to emphasize, and the text assistant lets external authors analyze their work easily.",
        avatar: "https://i.pravatar.cc/150?u=kevin"
      },
      {
        name: "Denis Agca",
        title: "Managing Director",
        quote: "Since our founding, Seolyze has been essential for content creation and optimization. Its clear analyses and excellent value make it highly recommendable!",
        avatar: "https://i.pravatar.cc/150?u=denis"
      }
    ];

    // Duplicate testimonials for seamless infinite scroll
    const scrollContent = [...testimonials, ...testimonials];

    container.innerHTML = `
        <!-- Header -->
        <div class="text-center max-w-[800px] flex flex-col items-center gap-6 px-6">
            <h2 class="font-['Inter'] font-semibold text-[32px] md:text-[48px] leading-tight text-[#111111] tracking-tight">
                What Our <span class="italic text-[#8F5FC4]">Users</span> Say
            </h2>
            <p class="font-['Inter'] font-normal text-[#4C4C4C] text-[16px] max-w-[580px] leading-[24px] ">
                Hear from our users about their experiences and the results they've achieved with SEOlyze.com.
            </p>
        </div>

        <!-- Infinite Slider -->
        <div class="relative w-full overflow-hidden">
            <div class="flex gap-6 animate-scroll whitespace-nowrap  px-6 hover:pause">
                ${scrollContent.map(item => `
                    <div class="flex-shrink-0 w-[311px] h-[337px] bg-white rounded-[16px] px-[28px] py-[32px] shadow-sm border border-[#FFFFFF] flex flex-col gap-[20px] whitespace-normal hover:shadow-lg transition-all duration-500">
                        <!-- Quote Icon -->
                        <div class="w-[17px] h-[13px]">
                            <img src="/public/images/Vector.png" alt="Quote" class="w-full h-full object-contain">
                        </div>

                        <!-- Quote Text -->

                        <p class="font-['Inter'] font-normal text-[#4C4C4C] text-[14px] leading-[20px]">
                            "${item.quote}"
                        </p>

                        <!-- Author -->
                        <div class="flex items-center gap-3 mt-auto">
                            <img src="${item.avatar}" alt="${item.name}" class="w-[48px] h-[48px] rounded-full object-cover">
                            <div class="flex flex-col gap-2">
                                <span class="font-medium text-[#111111] font-['Inter'] text-[16px] leading-tight">${item.name}</span>
                                <span class="font-normal text-[#4C4C4C] font-['Inter'] text-[10px] leading-tight">${item.title}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <style>
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-scroll {
                display: flex;
                width: max-content;
                animation: scroll 40s linear infinite;
            }
            .hover\\:pause:hover {
                animation-play-state: paused;
            }
        </style>
    `;

    return container;
  }
}

defineComponent('landing-testimonials', LandingTestimonials);
