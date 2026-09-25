const formatCategory = (slug) => (slug || '').replace(/-/g, ' ');
const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

export { formatCategory, formatPrice };