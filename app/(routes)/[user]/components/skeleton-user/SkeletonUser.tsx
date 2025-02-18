import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonUser = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full">
            <div className="relative flex flex-col items-center gap-4 pt-8 w-full px-6 max-w-xl text-center z-10 md:pt-16">
                <Skeleton className="size-28 rounded-full" />

                <div className="flex flex-col items-center gap-3">
                    <Skeleton className="w-44 h-8" />
                    <Skeleton className="w-32 h-6" />
                    <Skeleton className="w-72 h-16" />
                </div>

                <div className="w-full grid grid-cols-1 gap-4 mt-4 mb-12">
                    <Skeleton className="w-full h-16" />
                    <Skeleton className="w-full h-16" />
                    <Skeleton className="w-full h-16" />
                </div>
            </div>
        </div>
    )
}