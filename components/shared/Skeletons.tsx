export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[85vh] bg-neutral-900 animate-pulse">
      <div className="absolute bottom-[20%] left-8 md:left-16 max-w-xl space-y-4">
        <div className="h-14 w-96 bg-neutral-700 rounded-md" />
        <div className="h-4 w-80 bg-neutral-700 rounded-md" />
        <div className="h-4 w-64 bg-neutral-700 rounded-md" />
        <div className="flex gap-4 mt-6">
          <div className="h-12 w-28 bg-neutral-700 rounded-md" />
          <div className="h-12 w-32 bg-neutral-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function MovieRowSkeleton() {
  return (
    <section className="px-4 md:px-12 mt-8">
      <div className="h-6 w-44 bg-neutral-700 rounded-md mb-3 animate-pulse" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-36 md:w-44 lg:w-52 aspect-[2/3] bg-neutral-800 rounded-md animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
