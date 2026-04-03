import { BaseComponent, defineComponent } from '../../BaseComponent.js';

/**
 * <project-envelope-chart> — Visualizes multiple analyzed projects on an envelope curve.
 * Matches the design of "Overall view of all analyzed projects - envelope curve".
 */
export class ProjectEnvelopeChart extends BaseComponent {
  constructor() {
    super();
    this._chart = null;
  }

  init() {
    this.state = {
      series: [
        { name: 'Graphic Design', data: [4.4, 4.5, 4.2, 3.6, 3.5, 4.2, 4.8, 5.3, 5.1, 4.8, 4.6, 4.8, 4.4, 4.2, 4.0, 4.1, 4.3, 4.5] },
        { name: 'Resource Library', data: [3.1, 3.3, 3.6, 3.8, 4.2, 4.0, 4.5, 4.8, 4.9, 4.6, 4.4, 4.5, 3.9, 3.6, 3.2, 3.3, 3.5, 3.8] },
        { name: 'Canva', data: [2.0, 2.5, 3.2, 3.8, 4.0, 4.5, 4.2, 3.5, 2.8, 2.7, 3.3, 4.2, 4.8, 5.0, 5.2, 5.0, 5.3, 5.4] },
        { name: 'Development', data: [5.5, 5.4, 5.0, 4.5, 4.2, 3.5, 2.8, 2.4, 2.2, 2.1, 2.8, 3.5, 3.8, 3.6, 3.2, 2.8, 2.3, 2.1] },
        { name: 'YouTube', data: [5.2, 5.2, 5.0, 4.5, 4.0, 3.5, 2.8, 3.1, 3.5, 4.2, 4.8, 5.3, 5.5, 5.2, 4.2, 3.8, 4.4, 5.0] },
        { name: 'Galleries', data: [0.3, 0.8, 1.8, 2.5, 2.6, 2.1, 1.2, 0.4, 0.3, 1.1, 2.6, 3.8, 4.8, 5.4, 4.2, 2.9, 2.4, 2.5] },
        { name: 'Reddit', data: [3.1, 3.5, 4.1, 4.3, 4.5, 4.8, 4.4, 3.3, 2.9, 3.2, 4.1, 5.2, 6.0, 5.8, 4.4, 4.1, 4.8, 5.2] },
        { name: 'Design', data: [3.2, 3.8, 5.2, 6.3, 6.7, 6.2, 5.4, 4.2, 3.5, 3.8, 4.5, 5.3, 5.9, 6.0, 5.8, 5.4, 5.1, 5.0] },
        { name: 'Specializations', data: [2.1, 2.4, 3.2, 4.1, 4.5, 4.2, 3.8, 3.1, 2.7, 2.9, 3.8, 4.8, 5.4, 5.5, 3.3, 3.1, 4.2, 5.5] },
        { name: 'Features', data: [2.4, 2.6, 3.5, 4.2, 5.8, 5.4, 4.2, 2.8, 2.6, 2.5, 3.1, 4.4, 5.2, 4.8, 3.4, 3.4, 4.6, 7.3] }
      ],
      categories: ['design', 'link', 'brand', 'experience', 'learn', 'designer', 'user', 'visual', 'brand_2', 'art', 'use', 'create', 'skills', 'graphics', 'color', 'help', 'picture', 'text']
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
        height: 450,
        width: '100%',
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'Inter, sans-serif',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        }
      },
      colors: [
        '#d97706', // Graphic Design
        '#f59e0b', // Resource Library
        '#fbbf24', // Canva
        '#1e293b', // Development
        '#64748b', // YouTube
        '#94a3b8', // Galleries
        '#166534', // Reddit
        '#22c55e', // Design
        '#10b981', // Specializations
        '#0ea5e9'  // Features
      ],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.2,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      },
      dataLabels: { enabled: false },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '11px',
        fontWeight: 500,
        markers: {
          width: 8,
          height: 8,
          radius: 2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5
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
            fontSize: '10px'
          },
          formatter: (val) => val === 'brand_2' ? 'brand' : val
        }
      },
      yaxis: {
        min: 0,
        max: 10,
        tickAmount: 10,
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '11px'
          }
        }
      },
      tooltip: {
        theme: 'light',
        shared: true,
        intersect: false
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
      <div class="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm w-full overflow-hidden">
        <h3 class="font-['Inter'] font-bold text-[22px] text-gray-900 mb-8">Overall view of all analyzed projects - envelope curve</h3>
        <div id="chart-view" class="w-full min-h-[450px]"></div>
      </div>
    `;

    return container;
  }
}

defineComponent('project-envelope-chart', ProjectEnvelopeChart);
