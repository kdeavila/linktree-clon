import { z } from "zod";

export const formSchema = z.object({
    links: z.array(
        z.object({
            name: z.string(),
            link: z.string().url("Please enter a valid URL").min(10, "URL must be at least 10 characters long"),
        })
    ),
});