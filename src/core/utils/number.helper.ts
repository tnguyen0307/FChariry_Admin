export const formatNumber = (value: number | string) => {
    return Number(value)
        .toString()

        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats a number or string to a currency format.
 * @param value - The number or string to be formatted.
 * @returns The formatted currency string.
 */
export const formatNumberToCurrency = (value: number | string) => {
    const config: Intl.NumberFormatOptions = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
    const formatted = new Intl.NumberFormat('vi-VN', config).format(typeof value === 'string' ? parseFloat(value) : value);

    return formatted;
};
