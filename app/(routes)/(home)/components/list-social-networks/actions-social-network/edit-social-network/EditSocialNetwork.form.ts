import { z } from "zod"
 
export const formSchema = z.object({
  link: z.string().min(10).max(150),
})