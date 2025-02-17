import { useUserInfo } from "@/hooks/use-user";
import Image from "next/image";

export const ListSocialNetwork = () => {
    const { links } = useUserInfo();

    if (!links?.length) return null;

    return (
        <nav aria-label="Social networks links" className="w-full mx-auto mt-6">
            <ul className="grid grid-cols-4 gap-3">
                {links.map(({ id, icon, link }) => (
                    <li key={id} className="relative group">
                        <a
                            href={link || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-3 rounded-md cursor-pointer border border-transparent group-hover:border-cyan-100 bg-neutral-100/5 backdrop-blur-sm group-hover:bg-neutral-200/20 transition-colors md:p-2 lg:p-3"
                            aria-label="Visitar red social"
                        >
                            {icon && (
                                <div className="w-full max-w-12">
                                    <Image
                                        src={icon}
                                        alt="Icono de red social"
                                        height={64}
                                        width={64}
                                    />
                                </div>
                            )}
                        </a>

                        <div className="absolute top-0 right-0 size-3 rounded-full  translate-x-1/2 -translate-y-1/2 bg-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </li>
                ))}
            </ul>
        </nav>
    );
};