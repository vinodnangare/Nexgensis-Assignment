// Red = out of stock, yellow = low stock, green = fine
const StockBadge = ({ stock }) => {
  let style = 'bg-green-50 text-green-700 border-green-200';
  let text = `${stock} in stock`;

  if (stock === 0) {
    style = 'bg-red-50 text-red-700 border-red-200';
    text = 'Out of stock';
  } else if (stock < 10) {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
    text = `Low: ${stock} left`;
  }

  return <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>{text}</span>;
};

export default StockBadge;