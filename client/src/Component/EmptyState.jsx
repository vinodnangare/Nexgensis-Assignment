const EmptyState = ({ message, onClear }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
      <div className="text-4xl">🔍</div>
      <p className="mt-2 text-gray-600">{message}</p>
      {onClear && (
        <button
          onClick={onClear}
          className="mt-4 rounded-md border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;