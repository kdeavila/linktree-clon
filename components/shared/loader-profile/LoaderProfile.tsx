import { LoaderCircle } from "lucide-react";

export function LoaderProfile() {
    return <div className="h-screen flex flex-col items-center justify-center gap-2">
        <LoaderCircle className="size-10 animate-spin" />
        <p>Loading page... </p>
    </div>
}