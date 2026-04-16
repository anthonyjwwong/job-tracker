import { Skeleton } from "@/components/ui/skeleton";
const loading = () => {
  return (
    <>
      <div className="flex gap-15">
        <Skeleton className="flex-1 h-28 rounded-lg" />
        <Skeleton className="flex-1 h-28 rounded-lg" />
        <Skeleton className="flex-1 h-28 rounded-lg" />
        <Skeleton className="flex-1 h-28 rounded-lg" />
      </div>
      <div className="w-full mt-15">
        <Skeleton className="w-full h-60" />
      </div>
      <div className="mt-20 ">
        <Skeleton className="h-100" />
      </div>
    </>
  );
};

export default loading;
