import { useStepConfig } from "@/hooks/use-step-config";
import { SummaryProps } from "./Summary.types"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Confetti } from "@/components/shared";

export const Summary = (props: SummaryProps) => {
    const { onReload } = props;
    const { infoUser, step, prevStep } = useStepConfig();
    const { avatarUrl, name, username, typeUser, platforms } = infoUser;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-neutral-950">Your profile has been created</h2>
            <p>It&#39;s time to share to the world.</p>

            <div className="relative">
                <div className="flex flex-row items-center my-6">
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        width={80}
                        height={80}
                        className="size-20 rounded-full aspect-square object-cover"
                    />

                    <div className="ml-4 space-y-1 text-left">
                        <h3 className="text-2xl font-semibold text-neutral-950">{name}</h3>
                        <p className="text-sm text-neutral-600">@{username}</p>
                        <p className="text-sm text-neutral-600">Type: {typeUser}</p>
                    </div>
                </div>

                <div>
                    <div className="space-y-2 mt-4">
                        {platforms.map(({ icon, name, link }) => (
                            <div key={name} className="flex items-center gap-2 mt-2">
                                <Image src={icon} alt={`${name} icon`} width={24} height={24} />
                                <p>{name}: {link}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex flex-col gap-3 text-neutral-950">
                        {step > 1 && step <= 5 && (
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={prevStep}>
                                <ArrowLeft />
                                Back
                            </Button>
                        )}
                        <Button onClick={onReload} className="w-full">Finish</Button>
                    </div>
                </div>
            </div>

            <Confetti />
        </div>
    )
}