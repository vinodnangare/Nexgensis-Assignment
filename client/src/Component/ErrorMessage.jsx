const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <div className="text-3xl">⚠️</div>
      <p className="mt-2 font-medium text-red-700">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorMessage;