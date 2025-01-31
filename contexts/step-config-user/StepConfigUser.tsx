import { createContext, useState } from "react"
import { StepConfigUserContextType, StepConfigUserProviderProps } from "./StepConfigUser.types"

export const StepConfigUserContext = createContext<StepConfigUserContextType>({
    step: 1,
    setStep: () => { },
    infoUser: {
        typeUser: "",
        name: "",
        platforms: [],
        avatarUrl: "",
        username: ""
    },
    setInfoUser: () => { },
    totalSteps: 5,
    nextStep: () => { },
    prevStep: () => { }
});

export function StepConfigUserProvider({ children }: StepConfigUserProviderProps) {
    const [step, setStep] = useState(1);
    const [infoUser, setInfoUser] = useState<StepConfigUserContextType["infoUser"]>({
        typeUser: "",
        name: "",
        platforms: [],
        avatarUrl: "",
        username: ""
    });

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const TOTAL_STEPS = 5;

    const data = {
        step,
        setStep,
        infoUser,
        setInfoUser,
        totalSteps: TOTAL_STEPS,
        nextStep,
        prevStep
    }

    return (
        <StepConfigUserContext.Provider value={data}>
            {children}
        </StepConfigUserContext.Provider>
    )
}