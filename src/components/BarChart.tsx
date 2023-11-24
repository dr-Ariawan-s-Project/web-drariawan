import  { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  data: { month: string; count: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((item) => item.month);
      const counts = data.map((item) => item.count);

      const ctx = document.getElementById('barChart') as HTMLCanvasElement;

      if (!chart) {
        const newChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Count',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
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

        setChart(newChart);
      } else {
        chart.data.labels = labels;
        chart.data.datasets[0].data = counts;
        chart.update();
      }
    }
  }, [data, chart]);

  return <canvas id="barChart" width="400" height="200"></canvas>;
};

export default BarChart;