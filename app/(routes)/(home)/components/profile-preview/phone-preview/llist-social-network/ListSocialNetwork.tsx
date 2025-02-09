import { useUserInfo } from "@/hooks/use-user";
import Image from "next/image";

export const ListSocialNetwork = () => {
    const { links } = useUserInfo();

    if (!links?.length) return null;

    return (
        <nav aria-label="Social networks links" className="w-full mx-auto mt-6">
            <ul className="grid grid-cols-3 gap-2 lg:grid-cols-4">
                {links.map(({ id, icon, link }) => (
                    <li key={id} className="relative">
                        <a
                            href={link || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-3 rounded-md cursor-pointer"
                            aria-label="Visitar red social"
                        >
                            {icon && (
                                <div className="relative size-9">
                                    <Image
                                        src={icon}
                                        alt="Icono de red social"
                                        height={64}
                                        width={64}
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};