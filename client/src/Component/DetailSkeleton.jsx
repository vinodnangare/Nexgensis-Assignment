const DetailSkeleton = () => {
  return (
    <main className="mx-auto max-w-5xl animate-pulse p-4">
      <div className="h-8 w-40 rounded-md bg-gray-200" />
      <div className="mt-4 grid gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <div>
          <div className="h-80 rounded-lg bg-gray-200" />
          <div className="mt-3 flex gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-16 w-16 rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-5 w-24 rounded-full bg-gray-200" />
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-9 w-32 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
      </div>
    </main>
  );
};

export default DetailSkeleton;