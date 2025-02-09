import { Ellipsis, Facebook, Twitter, Linkedin, Phone, Link } from "lucide-react";
import { MoreInfoProfileProps } from "./MoreInfoProfile.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export const MoreInfoProfile = (props: MoreInfoProfileProps) => {
    const { user } = props;

    const shareOptions = [
        { icon: <Facebook strokeWidth={1.5} />, color: "blue-600", url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}` },
        { icon: <Twitter strokeWidth={1.5} />, color: "blue-400", url: `https://twitter.com/intent/tweet?url=${window.location.href}` },
        { icon: <Linkedin strokeWidth={1.5} />, color: "blue-800", url: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}` },
        { icon: <Phone strokeWidth={1.5} />, color: "green-500", url: `https://api.whatsapp.com/send?text=${window.location.href}` },
        { icon: <Link strokeWidth={1.5} />, color: "gray-500", onClick: () => navigator.clipboard.writeText(window.location.href) },
    ];

    return (
        <div className="w-full flex items-end justify-end">
            <Dialog>
                <DialogTrigger>
                    <div className="p-2 text-neutral-100 hover:bg-neutral-700 rounded-full transition-colors">
                        <Ellipsis />
                    </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share profile</DialogTitle>
                    </DialogHeader>

                    <div className="gap-4 py-4">
                        <div className="p-8 rounded-md bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center">
                            <Image
                                src={user.avatarUrl || "https://yu88eqe5p0.ufs.sh/f/Dk6Z3495qeoEFGWzdThdfcCSj8pVvGOEsAbzui56mWXk29r4"}
                                alt="User profile picture"
                                width={96}
                                height={96}
                                className="rounded-full aspect-square object-cover border-4 border-neutral-100"
                            />
                            <h2 className="mt-2 text-xl font-semibold">{user.name}</h2>
                            <p className="text-base text-center text-neutral-300 line-clamp-3">{user.bio || "No bio yet"}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-base font-medium mb-2 text-center text-neutral-800">Other social networks</h3>
                            <div className="flex gap-4 justify-center">
                                {shareOptions.map((option, index) => (
                                    <a
                                        key={index}
                                        href={option.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={option.onClick}
                                        className={`p-3 rounded-md border-2 cursor-pointer transition-colors
                                         ${option.color === "blue-600" ? "border-blue-600 bg-blue-600 hover:bg-neutral-100 hover:text-blue-600" : ""}
                                         ${option.color === "blue-400" ? "border-blue-400 bg-blue-400 hover:bg-neutral-100 hover:text-blue-400" : ""}
                                         ${option.color === "blue-800" ? "border-blue-800 bg-blue-800 hover:bg-neutral-100 hover:text-blue-800" : ""}
                                         ${option.color === "green-500" ? "border-green-500 bg-green-500 hover:bg-neutral-100 hover:text-green-500" : ""}
                                         ${option.color === "gray-500" ? "border-gray-500 bg-gray-500 hover:bg-neutral-100 hover:text-gray-500" : ""}
                                         text-neutral-100
                                     `}
                                    >
                                        {option.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};