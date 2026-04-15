import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <div>
        <Skeleton className="w-2/3 h-14 mt-12" />
      </div>
      <div className="mt-12 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/3 ">
          <div className="flex">
            <Skeleton className="w-30 h-10" />
            <Skeleton className="w-20 h-10" />
            <Skeleton className="w-30 h-10" />
          </div>
          <div className="mt-8">
            <Skeleton className="w-full h-40" />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <Skeleton className="w-full h-60" />
        </div>
      </div>
    </>
  );
};

export default loading;
