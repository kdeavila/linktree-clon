import { UserX2 } from "lucide-react"

export const UserNotFound = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center">
            <div className="py-10 text-center flex flex-col items-center">
                <UserX2 className="size-24 text-neutral-500" strokeWidth={1.5} />
                <h3 className="my-2 text-2xl font-semibold text-neutral-500/90">User Not Found</h3>
                <p className="max-w-80 text-balance text-neutral-400">The profile you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
            </div>
        </div>
    )
}