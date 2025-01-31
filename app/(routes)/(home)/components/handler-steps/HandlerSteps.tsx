import { useState } from "react"
import { HandlerStepsProps } from "./HandlerSteps.types"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useStepConfig } from "@/hooks/use-step-config"
import { Progress } from "@/components/ui/progress"
import { StepOne } from "../step-one"
import { StepTwo } from "../step-two"
import { StepThree } from "../step-three"
import { StepFour } from "../step-four"
import { Summary } from "../summary"

export const HandlerSteps = (props: HandlerStepsProps) => {
    const { onReload } = props
    const [openDialog, setOpenDialog] = useState(true)
    const { totalSteps, step } = useStepConfig()

    const progressValue = (step / totalSteps) * 100

    const onCloseDialog = () => {
        onReload(true)
        setOpenDialog(false)
    }

    return (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <span className="mb-2 block text-base">
                            Step {step} of {totalSteps}
                        </span>

                        <Progress value={progressValue} />
                    </AlertDialogTitle>

                    <AlertDialogDescription asChild>
                        <div>
                            {step === 1 && <StepOne />}
                            {step === 2 && <StepTwo />}
                            {step === 3 && <StepThree />}
                            {step === 4 && <StepFour />}
                            {step === 5 && <Summary onReload={onCloseDialog} />}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    );
}