export function formatPrice({ price, currency = 'SAR' }) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    })
    return formatter.format(price)
}