import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * <proof-keywords-chart> — Visualizes keyword importance using ApexCharts.
 * Matches the design of "Importance of top keywords - Proof-keywords".
 */
export class ProofKeywordsChart extends BaseComponent {
  constructor() {
    super();
    this._chart = null;
    this._activeFilter = 'all';
  }

  init() {
    this.state = {
      series: [
        {
          name: 'Maximum EPS-KF characteristic value',
          data: [1.2, 1.6, 1.0, 3.8, 1.2, 0.8, 4.8, 5.2, 3.8, 5.1, 4.2, 2.5]
        },
        {
          name: 'Average EPS-KF value',
          data: [0.1, 1.2, 1.4, 1.9, 2.0, 2.5, 2.8, 2.6, 2.8, 3.1, 3.5, 3.7]
        },
        {
          name: 'EPS-KF value of the reference project',
          data: [3.8, 3.2, 2.8, 2.6, 2.8, 2.1, 2.4, 2.0, 1.8, 1.4, 1.2, 0.1]
        }
      ],
      categories: ['design', 'graphic', 'brand', 'visual', 'use', 'designer', 'create', 'elements', 'project', 'images', 'help', 'logo']
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._renderChart();
    
    // Add ResizeObserver to handle responsiveness when container size changes
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
  }

  _renderChart() {
    const chartContainer = this.querySelector('#chart-view');
    if (!chartContainer) return;

    const options = {
      series: this.state.series,
      chart: {
        type: 'area',
        height: 400,
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
      colors: ['#ffcc80', '#ff9800', '#9e9e9e'],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 2.5
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0.05,
          stops: [20, 100]
        }
      },
      grid: {
        borderColor: '#f3f4f6',
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        padding: {
          left: 10,
          right: 10
        }
      },
      xaxis: {
        categories: this.state.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px'
          },
          offsetY: 5
        }
      },
      yaxis: {
        min: 0,
        max: 6,
        tickAmount: 6,
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px'
          },
          formatter: (val) => Math.round(val)
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '13px',
        fontWeight: 500,
        offsetY: -10,
        markers: {
          width: 8,
          height: 8,
          radius: 2,
          offsetX: -4
        },
        itemMargin: {
          horizontal: 20,
          vertical: 10
        },
        labels: {
          colors: '#4b5563'
        }
      },
      tooltip: {
        x: { show: true },
        theme: 'light',
        style: {
          fontSize: '12px'
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 6,
          sizeOffset: 3
        }
      },
      annotations: {
        points: [{
          x: 'visual',
          y: 3.8,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#ff9800',
            strokeWidth: 3,
            radius: 2
          },
          label: {
            borderColor: '#ff980066',
            offsetY: -5,
            style: {
              color: '#ff9800',
              background: '#fff7ed',
              fontSize: '13px',
              fontWeight: 600,
              padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
              }
            },
            text: 'Logo: 4.13'
          }
        }]
      }
    };

    if (this._chart) {
      this._chart.destroy();
    }

    this._chart = new ApexCharts(chartContainer, options);
    this._chart.render();
  }

  _filterData(type) {
    this._activeFilter = type;
    this.refresh();
    
    const multipliers = {
      'very-high': 1.4,
      'high': 1.2,
      'normal': 0.9,
      'all': 1.0
    };
    const multiplier = multipliers[type] || 1.0;
    
    const newSeries = this.state.series.map(s => ({
      ...s,
      data: s.data.map(v => Math.min(6, Math.max(0, v * multiplier + (Math.random() * 0.4 - 0.2))))
    }));

    if (this._chart) {
      this._chart.updateSeries(newSeries);
    }
  }

  render() {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-8 mt-12 w-full overflow-hidden';

    container.innerHTML = `
      <div class="flex flex-col gap-8">
        <h2 class="font-['Inter'] font-semibold text-[26px] leading-[34px] tracking-tight text-gray-900 border-b border-gray-100 pb-6">
          Importance of top keywords - Proof-keywords
        </h2>
        
        <div class="flex flex-wrap gap-4">
          <button id="btn-very-high" class="px-6 py-2.5 rounded-[12px] border border-gray-200 text-[14px] font-semibold transition-all hover:border-gray-900 ${this._activeFilter === 'very-high' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600'}">
            Very High Proof
          </button>
          <button id="btn-high" class="px-6 py-2.5 rounded-[12px] border border-gray-200 text-[14px] font-semibold transition-all hover:border-gray-900 ${this._activeFilter === 'high' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600'}">
            High Proof
          </button>
          <button id="btn-normal" class="px-6 py-2.5 rounded-[12px] border border-gray-200 text-[14px] font-semibold transition-all hover:border-gray-900 ${this._activeFilter === 'normal' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600'}">
            Normal Proof
          </button>
          <button id="btn-all" class="px-6 py-2.5 rounded-[12px] border border-gray-200 text-[14px] font-semibold transition-all hover:border-gray-900 ${this._activeFilter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600'}">
            Show all
          </button>
        </div>
      </div>

      <div class="bg-white rounded-[28px] p-6 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/20 w-full overflow-hidden">
        <h3 class="font-['Inter'] font-bold text-[24px] mb-10 text-gray-900">Proof-keywords</h3>
        <div id="chart-view" class="w-full min-h-[400px]"></div>
      </div>
    `;

    // Click handlers
    container.querySelector('#btn-very-high').onclick = () => this._filterData('very-high');
    container.querySelector('#btn-high').onclick = () => this._filterData('high');
    container.querySelector('#btn-normal').onclick = () => this._filterData('normal');
    container.querySelector('#btn-all').onclick = () => this._filterData('all');

    return container;
  }
}

defineComponent('proof-keywords-chart', ProofKeywordsChart);
