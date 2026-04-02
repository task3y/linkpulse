const LinkCardSkeleton = () => {
  return (
    <div className="bg-gray-900 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-800 animate-pulse">
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-800 rounded w-1/3" />
        <div className="h-3 bg-gray-800 rounded w-1/4" />
        <div className="h-3 bg-gray-800 rounded w-2/3" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-16 bg-gray-800 rounded-full" />
        <div className="h-6 w-6 bg-gray-800 rounded" />
        <div className="h-6 w-6 bg-gray-800 rounded" />
        <div className="h-6 w-6 bg-gray-800 rounded" />
        <div className="h-6 w-6 bg-gray-800 rounded" />
      </div>
    </div>
  );
};

const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-900 rounded-xl p-4 animate-pulse">
          <div className="h-4 bg-gray-800 rounded w-1/2 mb-2" />
          <div className="h-6 bg-gray-800 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
};

const AnalyticsSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-gray-900 rounded-2xl p-6 h-64" />
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-2xl p-6 h-48" />
        <div className="bg-gray-900 rounded-2xl p-6 h-48" />
      </div>
    </div>
  );
};

export { LinkCardSkeleton, StatsSkeleton, AnalyticsSkeleton };
