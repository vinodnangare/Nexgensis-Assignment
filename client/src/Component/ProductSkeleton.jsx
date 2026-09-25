import useMediaQuery from '../hooks/useMediaQuery';

const TableSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="h-11 border-b border-gray-200 bg-gray-50" />
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="flex items-center gap-6 border-t border-gray-100 px-4 py-3 first:border-t-0">
        <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200" />
        <div className="h-4 flex-1 rounded bg-gray-200" />
        <div className="h-5 w-24 rounded-full bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-5 w-20 rounded-full bg-gray-200" />
        <div className="h-8 w-48 rounded-md bg-gray-200" />
      </div>
    ))}
  </div>
);

const CardSkeleton = () => (
  <div className="grid gap-3">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex gap-3">
          <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-20 rounded-full bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
        <div className="mt-3 h-8 rounded-md bg-gray-200" />
      </div>
    ))}
  </div>
);

// animate-pulse is a built-in Tailwind class that fades the grey blocks in and out
const ProductSkeleton = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="animate-pulse">
      {isDesktop ? <TableSkeleton /> : <CardSkeleton />}
      <div className="mt-4 h-14 rounded-xl border border-gray-200 bg-white" />
    </div>
  );
};

export default ProductSkeleton;