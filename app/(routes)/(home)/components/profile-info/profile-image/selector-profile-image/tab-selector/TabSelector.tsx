import { ChevronRight, ImageUp, Trash2 } from "lucide-react";
import { TabSelectorProps } from "./TabSelector.types"

export const TabSelector = (props: TabSelectorProps) => {
    const { setShowTab } = props;

    return (
        <>
            <div className="flex gap-2 p-2 justify-between items-center hover:bg-neutral-200 transition-colors rounded-md cursor-pointer"
                onClick={() => setShowTab("upload")}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2">
                        <ImageUp className="size-6 text-neutral-950" strokeWidth={1.5} />
                    </div>

                    <div>
                        <span className="block text-sm font-semibold">Upload image</span>
                        <span className="text-sm text-neutral-600">
                            Choose an image from your device
                        </span>
                    </div>
                </div>
                <ChevronRight className="size-6" />
            </div>

            <div className="flex gap-2 p-2 justify-between items-center hover:bg-neutral-200 transition-colors rounded-md cursor-pointer"
                onClick={() => setShowTab("delete")}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2">
                        <Trash2 className="size-6 text-neutral-950" strokeWidth={1.5} />
                    </div>

                    <div>
                        <span className="block text-sm font-semibold">Delete  image</span>
                        <span className="text-sm text-neutral-600">
                            Delete your current image
                        </span>
                    </div>
                </div>
                <ChevronRight className="size-6" />
            </div>
        </>
    )
}