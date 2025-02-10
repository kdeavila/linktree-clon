import { Button } from "@/components/ui/button"
import { dataCreator } from "./StepOne.data"
import { useStepConfig } from "@/hooks/use-step-config"
import { useState } from "react"

export const StepOne = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const { setInfoUser, nextStep } = useStepConfig()

    const handleClick = (value: string) => {
        setSelectedValue(value)
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            typeUser: value,
        }))
    }

    return <div>
        <h2 className="text-2xl font-semibold text-neutral-950">Tell us about yourself</h2>
        <p className="textt-sm text-neutral-600">This help us get to know you better</p>

        <div className="grid grid-cols-1 gap-2 mt-4">
            {dataCreator.map(({ title, value }) => (
                <div
                    key={title}
                    className={`inline-flex rounded-md border p-4 transition-colors cursor-pointer ${selectedValue === value
                            ? "bg-neutral-100 border-neutral-400 text-neutral-950"
                            : "text-neutral-950 hover:bg-neutral-100/80 hover:border-neutral-300"
                        }`}
                    onClick={() => handleClick(value)}
                >
                    {title}
                </div>
            ))}
        </div>

        <div className="mt-4">
            <Button onClick={nextStep} disabled={!selectedValue} className="w-full">Continue</Button>
        </div>
    </div >
}