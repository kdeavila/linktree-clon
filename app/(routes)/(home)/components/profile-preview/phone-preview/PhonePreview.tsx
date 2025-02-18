import { useUserInfo } from "@/hooks/use-user"
import Image from "next/image";
import { ListSocialNetwork } from "./llist-social-network";

export const PhonePreview = () => {
    const { user } = useUserInfo();

    return (
        <div className="mt-4 mx-auto w-full">
            <div className="relative rounded-[40px] w-full max-w-[330px] aspect-[9/16] border-[10px] border-neutral-950 bg-neutral-950 overflow-hidden shadow-2xl mx-auto">
                <div className="absolute inset-0">
                    {user?.backgroundImage ? (
                        <Image
                            src={user.backgroundImage}
                            alt="Background"
                            layout="fill"
                            className="object-cover opacity-40"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-40"></div>
                    )}
                </div>

                <div className="relative z-10 w-full h-full flex flex-col items-center text-neutral-100 text-center p-6 pt-12 phone">
                    <div className="relative size-24 overflow-hidden rounded-full border-4 border-neutral-100 shadow-md shrink-0">
                        <Image
                            src={user?.avatarUrl || "https://yu88eqe5p0.ufs.sh/f/Dk6Z3495qeoEFGWzdThdfcCSj8pVvGOEsAbzui56mWXk29r4"}
                            alt="User Avatar"
                            width={100}
                            height={100}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="mt-2 mb-2">
                        <h2 className="text-xl max-w-full font-semibold text-balance text-slate-50/90 md:text-2xl">{user?.name || 'Name profile'}</h2>
                        <div className="flex flex-row gap-2 items-center justify-center text-base">
                            <p className=" text-red-100/90">@{user?.username || 'username'}</p>
                            <span>-</span>
                            <p className=" text-yellow-100/90">{user?.typeUser || 'position'}</p>
                        </div>
                    </div>

                    <p className="text-sm text-neutral-400 text-pretty line-clamp-3 shrink-0">
                        {user?.bio || null}
                    </p>

                    <ListSocialNetwork />
                </div>


                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-neutral-950 rounded-b-xl z-20">
                    <div className="absolute top-0 right-0 -translate-x-4 transform size-4 bg-neutral-900 rounded-full z-30"></div>
                </div>
            </div>
        </div>
    )
}