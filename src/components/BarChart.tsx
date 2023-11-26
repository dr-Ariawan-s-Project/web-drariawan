import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  data: { month: string; count: number }[];
  label?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  yAxisLabel?: string;
  height?: number;
  width?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  label = 'Count',
  backgroundColor = 'rgba(75, 192, 192, 0.2)',
  borderColor = 'rgba(75, 192, 192, 1)',
  borderWidth = 1,
  yAxisLabel = 'Count',
  height = 200,
  width = 400,
}) => {
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
                label,
                data: counts,
                backgroundColor,
                borderColor,
                borderWidth,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: yAxisLabel,
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false, 
          },
        });

        setChart(newChart);
      } else {
        chart.data.labels = labels;
        chart.data.datasets[0].data = counts;
        chart.update();
      }
    }
  }, [data, chart, label, backgroundColor, borderColor, borderWidth, yAxisLabel]);

  return <canvas id="barChart" width={width} height={height}></canvas>;
};

export default BarChart;
