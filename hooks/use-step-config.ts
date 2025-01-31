import { StepConfigUserContext } from "@/contexts";
import { useContext } from "react";

export const useStepConfig = () => useContext(StepConfigUserContext);