import { z } from "zod"

export const formSchema = z.object({
    link: z.string().min(10).max(200),
    name: z.string().min(3).max(50),
    icon: z.string({
        required_error: "Icon is required",
    })
})