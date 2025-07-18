import { Skeleton } from "./skeleton";

function SkeletonList({ count = 5, className = "", icon = false }) {
  const skeletonStyle =
    className ||
    "h-6 w-36 mb-3 bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse";
  const iconStyle =
    "h-6 w-6 rounded-md bg-gray-100 dark:bg-gray-700 animate-pulse";

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={"skeleton-" + i} className="flex items-center space-x-2 mb-3">
          {icon && <div className={iconStyle} />}
          <Skeleton className={skeletonStyle} />
        </div>
      ))}
    </>
  );
}

export { SkeletonList };
