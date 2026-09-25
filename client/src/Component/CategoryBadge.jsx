import { formatCategory } from '../utils/format';
import { getCategoryColor } from '../utils/categoryColor';

const CategoryBadge = ({ category }) => {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${getCategoryColor(
        category
      )}`}
    >
      {formatCategory(category)}
    </span>
  );
};

export default CategoryBadge;