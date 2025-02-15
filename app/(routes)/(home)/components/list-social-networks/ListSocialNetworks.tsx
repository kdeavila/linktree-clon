import Image from "next/image";
import { ListSocialNetworksProps } from "./ListSocialNetworks.types";
import { ActionsSocialNetwork } from "./actions-social-network/ActionsSocialNetwork";
import { TreePalm } from "lucide-react";

export const ListSocialNetworks = (props: ListSocialNetworksProps) => {
    const { links, onReload } = props;

    if (!links || links.length === 0) {
        return (
            <div className="flex flex-col items-center mt-20">
                <div className="py-10 text-center flex flex-col items-center">
                    <TreePalm className="size-24 text-neutral-400" strokeWidth={1} />
                    <h3 className="mt-2 text-lg font-semibold text-neutral-400">Show the world who you are</h3>
                    <p className="text-sm text-neutral-400">Add a link to get started.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 mt-8">
            {links.map((link) => (
                <div 
                    key={link.id} 
                    className="bg-neutral-50 rounded-md p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border border-neutral-300"
                >
                    <div className="flex gap-2 lg:gap-3 items-center">
                        <Image
                            src={link.icon || ""}
                            alt="Icono de red social"
                            height={72}
                            width={72}
                            className="size-10"
                        />

                        <div className="flex flex-col">
                            <span className="font-semibold text-sm line-clamp-1">{link.name}</span>
                            <span className="text-sm text-neutral-600 break-all line-clamp-1">{link.link}</span>
                        </div>
                    </div>

                    <ActionsSocialNetwork link={link} onReload={onReload} />
                </div>
            ))}
        </div>
    );
};