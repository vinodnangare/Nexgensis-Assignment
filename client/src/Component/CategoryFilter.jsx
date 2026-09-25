import { formatCategory } from '../utils/format';

const CategoryFilter = ({ value, categories, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 capitalize transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
    >
      <option value="">All categories</option>
      {categories.map((cat) => (
        <option key={cat.slug} value={cat.slug}>
          {formatCategory(cat.slug)}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;