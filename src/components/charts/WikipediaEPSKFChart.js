import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * <wikipedia-epskf-chart> — Visualizes the EPS-KF value from Wikipedia content.
 * Matches the design of the Wikipedia-specific "EPS-KF" area chart.
 */
export class WikipediaEPSKFChart extends BaseComponent {
  constructor() {
    super();
    this._chart = null;
  }

  init() {
    this.state = {
      series: [
        {
          name: 'EPS-KF value of Wikipedia reference',
          data: [3.7, 3.1, 2.8, 2.6, 2.8, 2.1, 2.4, 2.0, 1.9, 1.4, 1.3, 0.1]
        }
      ],
      categories: ['design', 'graphic', 'art', 'visual', 'use', 'designer', 'create', 'elements', 'project', 'images', 'help', 'logo']
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._renderChart();
    
    // Add ResizeObserver to handle responsiveness
    this._resizeObserver = new ResizeObserver(() => {
      if (this._chart) {
        this._chart.updateOptions({ chart: { width: '100%' } }, false, false);
      }
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    if (this._chart) {
      this._chart.destroy();
    }
  }

  _renderChart() {
    const chartContainer = this.querySelector('#chart-view');
    if (!chartContainer) return;

    const options = {
      series: this.state.series,
      chart: {
        type: 'area',
        height: 350,
        width: '100%',
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'Inter, sans-serif',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      colors: ['#FFB74D'], // Soft orange color from the image
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 2.5
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        }
      },
      grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
      xaxis: {
        categories: this.state.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '11px'
          }
        }
      },
      yaxis: {
        min: 0,
        max: 6,
        tickAmount: 6,
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '11px'
          },
          formatter: (val) => val
        }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: (val) => val
        }
      }
    };

    if (this._chart) {
      this._chart.destroy();
    }

    this._chart = new ApexCharts(chartContainer, options);
    this._chart.render();
  }

  render() {
    const container = document.createElement('div');
    container.className = 'w-full';

    container.innerHTML = `
      <div class="bg-white rounded-[16px] p-6 border border-gray-100 shadow-sm w-full overflow-hidden">
        <div class="mb-6">
          <h3 class="font-['Inter'] font-bold text-[20px] text-gray-900 mb-2">EPS-KF</h3>
          <p class="text-[12px] text-gray-500 font-normal">https://en.wikipedia.org/wiki/Graphic_design</p>
        </div>
        <div id="chart-view" class="w-full min-h-[350px]"></div>
      </div>
    `;

    return container;
  }
}

defineComponent('wikipedia-epskf-chart', WikipediaEPSKFChart);
