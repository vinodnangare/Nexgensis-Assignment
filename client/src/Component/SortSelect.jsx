const options = [
  { label: 'Sort: Default', value: '' },
  { label: 'Price: Low to High', value: 'price:asc' },
  { label: 'Price: High to Low', value: 'price:desc' },
  { label: 'Rating: High to Low', value: 'rating:desc' },
  { label: 'Rating: Low to High', value: 'rating:asc' },
  { label: 'Title: A to Z', value: 'title:asc' },
  { label: 'Title: Z to A', value: 'title:desc' },
];

const SortSelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;