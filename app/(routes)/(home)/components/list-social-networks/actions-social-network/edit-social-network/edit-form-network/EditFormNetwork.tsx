import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import axios from "axios"

import { z } from "zod"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "../EditSocialNetwork.form"
import { EditFormNetworkProps } from "./EditFormNetwork.types"
import { useUserInfo } from "@/hooks/use-user"
import { toast } from "@/hooks/use-toast"

export const EditFormNetwork = (props: EditFormNetworkProps) => {
    const { link, onReload, closeDialog } = props;
    const { reloadUser } = useUserInfo();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: link.link || "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await axios.patch(`/api/social-network/${link.id}`, {
            link: values.link
        });

        onReload(true);
        reloadUser();
        closeDialog();
        toast({
            title: "✅ Social network updated successfully",
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit">Submit</Button>
            </form>
        </Form>
    )
}