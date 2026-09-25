const ConfirmModal = ({ title, message, loading, onConfirm, onCancel }) => {
  // Clicking the dark background cancels (but not while deleting)
  const handleBackdropClick = () => {
    if (!loading) onCancel();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pop w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">🗑️</div>
        <h2 className="mb-1 text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mb-5 text-sm text-gray-600">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;