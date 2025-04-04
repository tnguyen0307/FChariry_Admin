import * as React from 'react';

import { Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';

import { formatNumber } from '@/core/utils/number.helper';

interface ChartBasicAreaProps {
    values: {
        name: string;
        data: number;
    }[];
    unit: string;
    title: string;
    colors: string[];
}

const ChartBasicArea: React.FC<ChartBasicAreaProps> = ({ title, values, unit, colors }) => {
    if (values.length === 0) {
        return (
            <div className="flex min-h-[350px] w-full items-center justify-center">
                <Typography.Title level={4}>No data</Typography.Title>
            </div>
        );
    }

    return (
        <div>
            <ReactApexChart
                options={{
                    chart: {
                        zoom: {
                            enabled: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'straight',
                    },

                    title: {
                        text: title,
                        align: 'left',
                    },
                    labels: values.map((item) => item.name),
                    xaxis: {
                        labels: {
                            formatter: (value: any) => {
                                return value;
                            },
                        },
                    },
                    yaxis: {
                        min: 0,
                        stepSize:1,
                        labels: {
                            formatter: (value: any) => {
                                return formatNumber(value);
                            },
                        },
                    },
                    legend: {
                        horizontalAlign: 'left',
                    },
                    colors: colors,
                }}
                series={[
                    {
                        name: unit,
                        data: values.map((item) => item.data),
                    },
                ]}
                type="area"
                height={350}
            />
        </div>
    );
};

export default ChartBasicArea;
