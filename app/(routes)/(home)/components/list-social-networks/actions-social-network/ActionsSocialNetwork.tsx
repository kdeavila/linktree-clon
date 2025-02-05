import { ExternalLink } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditSocialNetwork } from "./edit-social-network";
import { ActionsSocialNetworkProps } from "./ActionsSocialNetwork.types";
import { RemoveSocialNetwork } from "./remove-social-network/RemoveSocialNetwork";

export const ActionsSocialNetwork = (props: ActionsSocialNetworkProps) => {
    const { link, onReload } = props;

    return (
        <div className="flex gap-2 items-center">
            <a
                href={link.link || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full px-4 py-2 gap-2 bg-neutral-950 text-sm rounded-md font-semibold text-neutral-50"
            >
                <ExternalLink className="size-4" />
            </a>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="inline-flex items-center px-4 py-2 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100">Actions</div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <EditSocialNetwork link={link} onReload={onReload} />
                    <RemoveSocialNetwork link={link} onReload={onReload}/>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}