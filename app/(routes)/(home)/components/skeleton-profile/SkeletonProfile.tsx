import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonProfile = () => {
    return (
        <div className="p-6 space-y-4">
            <article className="grid grid-cols-1 md:grid-cols-[60%_auto] xl:grid-cols-[70%_auto]">
                <div className="w-full flex flex-col md:pr-6">
                    <Skeleton className="w-full p-4 flex flex-row justify-end items-center h-16" />

                    <div className="mt-6">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center gap-4">
                                <Skeleton className="size-16 shrink-0 rounded-full" />

                                <div className="flex flex-col gap-2">
                                    <Skeleton className="w-44 h-6" />
                                    <Skeleton className="w-32 h-6" />
                                </div>
                            </div>

                            <Skeleton className="size-10" />
                        </div>

                        <div className="mt-6 flex flex-row gap-2">
                            <Skeleton className="w-48 h-10" />
                            <Skeleton className="w-48 h-10" />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-4">
                        <Skeleton className="w-full h-16" />
                        <Skeleton className="w-full h-16" />
                        <Skeleton className="w-full h-16" />
                    </div>
                </div>

                <div className="md:border-l border-neutral-300 flex flex-col items-center text-center mt-6 md:pl-6 md:mt-0">
                    <Skeleton className="w-64 h-10 mb-2" />
                    <Skeleton className="w-48 h-6" />

                    <Skeleton className="mt-6 relative rounded-[40px] w-full max-w-[364px] aspect-[9/16] border-[10px]" />
                </div>
            </article>
        </div>
    )
}