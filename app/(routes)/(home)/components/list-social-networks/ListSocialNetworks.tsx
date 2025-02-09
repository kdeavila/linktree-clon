import Image from "next/image";
import { ListSocialNetworksProps } from "./ListSocialNetworks.types";
import { ActionsSocialNetwork } from "./actions-social-network/ActionsSocialNetwork";


export const ListSocialNetworks = (props: ListSocialNetworksProps) => {
    const { links, onReload } = props;

    return (
        <div className="grid grid-cols-1 gap-4 mt-8">
            {links.map((link) => {
                return (
                    <div key={link.id}
                        className="bg-neutral-50 rounded-md p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border border-neutral-300">
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
                );
            })}
        </div>
    )
}   