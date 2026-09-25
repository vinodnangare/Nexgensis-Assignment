import { Link } from 'react-router-dom';
import { EyeIcon, EditIcon, TrashIcon } from './Icons';

const base =
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2';

// full = true makes the 3 buttons share the width equally (used on mobile cards)
const ActionButtons = ({ product, onEdit, onDelete, full = false }) => {
  const extra = full ? 'flex-1 justify-center' : '';

  return (
    <div className="flex gap-2">
      <Link
        to={`/products/${product.id}`}
        className={`${base} ${extra} border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300`}
      >
        <EyeIcon /> View
      </Link>
      <button
        onClick={() => onEdit(product)}
        className={`${base} ${extra} border-indigo-300 text-indigo-700 hover:bg-indigo-50 focus:ring-indigo-200`}
      >
        <EditIcon /> Edit
      </button>
      <button
        onClick={() => onDelete(product)}
        className={`${base} ${extra} border-red-300 text-red-600 hover:bg-red-50 focus:ring-red-200`}
      >
        <TrashIcon /> Delete
      </button>
    </div>
  );
};

export default ActionButtons;