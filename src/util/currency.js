export const formatCurrencyAud = amount => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

const currency = {
    formatCurrencyAud
};

export default currency;