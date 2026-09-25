import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import ActionButtons from './ActionButtons';
import CategoryBadge from './CategoryBadge';
import Rating from './Rating';
import StockBadge from './StockBadge';

const headCell = 'px-4 py-3 font-semibold';
const cell = 'px-4 py-3';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* min-w keeps the table wide; on small laptops it scrolls sideways instead of squeezing */}
      <table className="w-full min-w-240 text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className={headCell}>Image</th>
            <th className={headCell}>Title</th>
            <th className={headCell}>Category</th>
            <th className={headCell}>Price</th>
            <th className={headCell}>Rating</th>
            <th className={headCell}>Stock</th>
            <th className={headCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="group border-t border-gray-100 transition hover:bg-indigo-50/40">
              <td className={cell}>
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-14 w-14 rounded-lg border border-gray-200 bg-gray-50 object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-lg border border-gray-200 bg-gray-100" />
                )}
              </td>
              <td className={`${cell} min-w-55`}>
                <Link to={`/products/${product.id}`} className="font-medium text-gray-900 hover:text-indigo-600">
                  {product.title}
                </Link>
                {product.brand && <p className="text-xs text-gray-500">{product.brand}</p>}
              </td>
              <td className={cell}>
                <CategoryBadge category={product.category} />
              </td>
              <td className={`${cell} whitespace-nowrap font-semibold`}>{formatPrice(product.price)}</td>
              <td className={cell}>
                <Rating value={product.rating} />
              </td>
              <td className={`${cell} whitespace-nowrap`}>
                <StockBadge stock={product.stock} />
              </td>
              <td className={`${cell} whitespace-nowrap`}>
                <ActionButtons product={product} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;