import { UserContext } from "@/contexts";
import { useContext } from "react";

export const useUserInfo = () => useContext(UserContext);