import ReactApexChart from 'react-apexcharts';

type PieChartProps = {
    series: number[];
    labels: string[];
    width?: number;
    title?: string;
    unit?: string;
};

const NKPieChart = ({ labels, series, width, title, unit }: PieChartProps) => {
    return (
        <ReactApexChart
            options={{
                labels,
                series,
                chart: {
                    width: width,
                    type: 'pie',
                },
                title: {
                    text: title,
                    align: 'left',
                },
                tooltip: {
                    y: {
                        formatter: (value: number) => {
                            return unit ? `${value} ${unit}` : value.toString();
                        },
                    },
                    enabled: true,
                },
            }}
            series={series}
            type="pie"
            width={width}
        />
    );
};

export default NKPieChart;
