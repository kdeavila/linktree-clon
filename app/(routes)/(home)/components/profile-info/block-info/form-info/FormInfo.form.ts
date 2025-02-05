import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    username: z.string().min(2).max(20).optional(),
    bio: z.string().min(2).max(300).optional(),
})