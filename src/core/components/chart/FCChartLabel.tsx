import * as React from 'react';

import clsx from 'clsx';

interface FCChartLabelProps {
    label: string;
    value: number | string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    color: 'red' | 'blue' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'gray' | 'white' | 'black';
    precision?: number;
}

const colorMap: Readonly<Record<FCChartLabelProps['color'], string>> = {
    red: 'bg-red-500 shadow-red-500/70',
    blue: 'bg-blue-500 shadow-blue-500/70',
    green: 'bg-green-500 shadow-green-500/70',
    yellow: 'bg-yellow-500 shadow-yellow-500/70',
    indigo: 'bg-indigo-500 shadow-indigo-500/70',
    purple: 'bg-purple-500 shadow-purple-500/70',
    pink: 'bg-pink-500 shadow-pink-500/70',
    gray: 'bg-gray-500 shadow-gray-500/70',
    white: 'bg-white shadow-white-500/70',
    black: 'bg-black shadow-black-500/70',
};

const FCChartLabel: React.FC<FCChartLabelProps> = ({ label, value, color, precision = 2, prefix, suffix }) => {
    return (
        <div className={clsx('rounded-lg p-4 text-white shadow-lg ', colorMap[color])}>
            <div className="text-lg font-semibold">{label}</div>
            <div className="mt-4 flex items-center gap-2">
                {prefix}
                <div className="h-9 text-3xl">{value}</div>
                {suffix}
            </div>
        </div>
    );
};

export default FCChartLabel;
