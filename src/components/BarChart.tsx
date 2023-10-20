import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef: any = useRef(null);

  useEffect(() => {
    const canvas: any = document.getElementById('chart-bar');
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales Overview',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: '#4FD1C5',
            backgroundColor: 'rgba(79, 209, 197, 0.2)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
  return (
    <div className="w-full max-w-full mt-0 lg:w-7/12 lg:flex-none">
      <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
        <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
          <h6 className="capitalize dark:text-white">
            Sales Overview Bar Chart
          </h6>
          <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
            <i className="fa fa-arrow-up text-emerald-500"></i>
            <span className="font-semibold">4% more</span> in 2023
          </p>
        </div>
        <div className="flex-auto p-4">
          <div>
            <canvas id="chart-bar" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
