import { Button } from "@/components/ui/button"
import { Megaphone, Share } from "lucide-react"

export const ButtonsHeader = () => {
    return (
        <div className="flex justify-end gap-2">
            <Button variant="outline">
                <Megaphone strokeWidth="1.5" />
            </Button>

            <Button variant="outline">
                <Share strokeWidth="2" className="size-4" />
                <span className="text-sm font-semibold">Share</span>
            </Button>
        </div>
    )
}