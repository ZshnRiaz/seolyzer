import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * <monthly-trend-chart> — Visualizes monthly trends using ApexCharts.
 * Matches the design of the "Monthly Trend" bar chart.
 */
export class MonthlyTrendChart extends BaseComponent {
  constructor() {
    super();
    this._chart = null;
  }

  init() {
    this.state = {
      series: [
        {
          name: 'Count',
          data: [1600, 1600, 1600, 2150, 2150, 1850, 1850, 1500, 1500, 1850, 1850, 1500]
        }
      ],
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
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
        type: 'bar',
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
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%',
          distributed: false,
        }
      },
      colors: ['#FF9100'], // Vibrant orange from the image
      dataLabels: { enabled: false },
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
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        min: 0,
        max: 3000,
        tickAmount: 6,
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px'
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
        <h3 class="font-['Inter'] font-semibold text-[18px] mb-8 text-gray-900">Monthly Trend</h3>
        <div id="chart-view" class="w-full min-h-[350px]"></div>
      </div>
    `;

    return container;
  }
}

defineComponent('monthly-trend-chart', MonthlyTrendChart);
