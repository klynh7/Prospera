import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatRupiah } from '../utils/format';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function TrendChart({ labels, sales, profit, salesLabel = 'Penjualan Kotor', profitLabel = 'Laba Bersih' }) {
    const data = {
        labels,
        datasets: [
            {
                label: salesLabel,
                data: sales,
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: profitLabel,
                data: profit,
                borderColor: '#10B981',
                backgroundColor: 'transparent',
                tension: 0.4,
            },
        ],
    };

    return (
        <Line
            data={data}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${formatRupiah(context.raw)}`,
                        },
                    },
                },
            }}
        />
    );
}

export default TrendChart;
