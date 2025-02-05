import { Button } from "@/components/ui/button"
import { useStepConfig } from "@/hooks/use-step-config"
import Image from "next/image"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { LinksSocialNetwork } from "@/data/links-social-network"


export const StepTwo = () => {
    const { setInfoUser, infoUser, nextStep, step, prevStep } = useStepConfig()
    const [selectedPlatforms, setselectedPlatforms] = useState<string[]>(
        infoUser.platforms.map(({ name }) => name) || []
    )

    const handleSelectPlataform = (selectedPlataform: string) => {
        setselectedPlatforms((prevSelectedPlatforms) => {
            if (prevSelectedPlatforms.includes(selectedPlataform)) {
                return prevSelectedPlatforms.filter((plataform) => plataform !== selectedPlataform)
            } else {
                return [...prevSelectedPlatforms, selectedPlataform]
            }
        })
    }

    const handleContinue = () => {
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            platforms: LinksSocialNetwork.filter(({ name }) => selectedPlatforms.includes(name))
        }))

        nextStep();
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-neutral-950">Which plataforms are you connected to?</h2>
            <p className="textt-sm text-neutral-600">Pick the ones your are on.</p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-4 sm:grid-cols-3">
                {LinksSocialNetwork.map(({ name, icon }) => {
                    return (
                        <div className={`flex flex-col items-center gap-2 rounded-md py-4 border cursor-pointer ${selectedPlatforms.includes(name) ? "bg-neutral-100 border-neutral-400" : ""}`} key={name} onClick={() => handleSelectPlataform(name)}>
                            <Image src={icon} alt={`${name} icon`} className="size-8" width={48} height={48} />
                            <span className="text-sm font-semibold text-neutral-950">{name}</span>
                        </div>
                    )
                })}
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
                <Button onClick={handleContinue} className="w-full">Continue</Button>
            </div>
        </div>
    )
}