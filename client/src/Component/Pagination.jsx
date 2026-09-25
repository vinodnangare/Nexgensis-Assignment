import { PAGE_SIZES } from '../utils/queryParams';

const Pagination = ({ page, limit, total, onPageChange, onLimitChange }) => {
  const totalPages = Math.ceil(total / limit);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  // Show at most 5 page numbers around the current page
  let start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  start = Math.max(1, end - 4);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const buttonClass =
    'rounded-md border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm md:flex-row">
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold">{from}–{to}</span> of <span className="font-semibold">{total}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          className={`${buttonClass} border-gray-300 bg-white hover:bg-gray-100`}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`${buttonClass} ${
              p === page
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-gray-300 bg-white hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          className={`${buttonClass} border-gray-300 bg-white hover:bg-gray-100`}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>

      <select
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        {PAGE_SIZES.map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;