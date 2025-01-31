import { Button } from "@/components/ui/button";
import { useStepConfig } from "@/hooks/use-step-config";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export const StepThree = () => {
    const { setInfoUser, nextStep, infoUser, step, prevStep } = useStepConfig()

    const handleContinue = () => {
        const updatePlatforms = infoUser.platforms.map(({ icon, name }) => {
            const input = document.getElementById(`${name}-input`) as HTMLInputElement
            return {
                icon,
                name,
                link: input?.value
            }
        })

        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            platforms: updatePlatforms
        }))

        nextStep();
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-neutral-950">Add your links</h2>
            <p className="textt-sm text-neutral-600">Complete the fields to add your links</p>

            {infoUser.platforms.map(({ icon, name, link }) => (
                <div key={name} className="flex items-center gap-2 mt-4">
                    <div className="flex flex-col gap-2 items-center">
                        <Image src={icon} alt={`${name} icon`} width={24} height={24} />
                    </div>

                    <input
                        id={`${name}-input`}
                        required
                        type="text"
                        placeholder={`https://example.com/your-${name.toLowerCase()}`}
                        className="w-full border rounded-md p-2 text-sm"
                        defaultValue={link}
                    />

                </div>
            ))}


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