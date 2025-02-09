import Image from "next/image";
import { UserProfileProps } from "./UserProfile.types";
import { MoreInfoProfile } from "./more-info-profile";

export const UserProfile = (props: UserProfileProps) => {
    const { user } = props;

    if (!user) return null;

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-neutral-950 overflow-hidden">
            {user?.backgroundImage ? (
                <Image
                    src={user.backgroundImage || ""}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="absolute w-full h-full top-0 left-0 opacity-60"
                />
            ) : (
                <div className="absolute w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-40"></div>
            )}

            <div className="relative flex flex-col items-center gap-4 pt-8 w-full px-6 max-w-xl text-center z-10 md:pt-16">
                <MoreInfoProfile user={user} />

                <div className="relative size-28 overflow-hidden rounded-full border-4 border-neutral-100 shadow-md">
                    <Image
                        src={user.avatarUrl || "https://yu88eqe5p0.ufs.sh/f/Dk6Z3495qeoEFGWzdThdfcCSj8pVvGOEsAbzui56mWXk29r4"}
                        alt="User profile picture"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h3 className="text-3xl font-bold text-neutral-100">{user.name}</h3>
                    <p className="text-xl font-semibold text-neutral-200">@{user.username}</p>
                    {user.bio && <p className="mt-2 text-neutral-200 text-lg max-w-xl text-balance leading-snug">{user.bio}</p>}
                </div>

                {user?.Links.length > 0 ? (
                    <div className="w-full grid grid-cols-1 gap-4 mt-4 mb-12">
                        {user.Links.map((link) => (
                            <a
                                key={link.id}
                                href={link.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-neutral-200/50 rounded-md p-4 flex gap-4 text-left items-center border border-neutral-400 shadow group hover:shadow-md transition-shadow"
                            >
                                <Image src={link.icon || ""} alt={link.name || "Social Icon"} height={40} width={40} className="size-10" />
                                <span className="text-sm font-medium line-clamp-1 text-neutral-950 group-hover:text-blue-700 transition-colors">{link.name}</span>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="mt-6 text-gray-500">There are no links available yet</p>
                )}
            </div>
        </div>
    );
};
