import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import ActionButtons from './ActionButtons';
import CategoryBadge from './CategoryBadge';
import Rating from './Rating';
import StockBadge from './StockBadge';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-20 w-20 shrink-0 rounded-lg border border-gray-200 bg-gray-50 object-cover"
          />
        ) : (
          <div className="h-20 w-20 shrink-0 rounded-lg border border-gray-200 bg-gray-100" />
        )}

        <div className="min-w-0 flex-1">
          <Link to={`/products/${product.id}`} className="block font-semibold text-gray-900 hover:text-indigo-600">
            {product.title}
          </Link>
          <div className="mt-1">
            <CategoryBadge category={product.category} />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-indigo-600">{formatPrice(product.price)}</span>
            <Rating value={product.rating} />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <StockBadge stock={product.stock} />
      </div>

      <div className="mt-3 border-t border-gray-100 pt-3">
        <ActionButtons product={product} onEdit={onEdit} onDelete={onDelete} full />
      </div>
    </div>
  );
};

export default ProductCard;