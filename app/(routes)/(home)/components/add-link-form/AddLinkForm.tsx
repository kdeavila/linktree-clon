import { AddLinkFormProps } from "./AddLinkForm.types";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "./AddLinkForm.form";
import { Plus } from "lucide-react";
import { LinksSocialNetwork } from "@/data/links-social-network";
import Image from "next/image";
import { useUserInfo } from "@/hooks/use-user";
import axios from "axios";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const AddLinkForm = (props: AddLinkFormProps) => {
    const { onReload } = props;
    const { reloadUser } = useUserInfo();
    const [open, setOpen] = useState(false);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(("/api/social-network"), values);
            toast({
                title: "✅ Social network added successfully",
            })

            reloadUser();
            onReload(true);
            setOpen(false);

        } catch (error) {
            console.error(error);
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            link: "",
            icon: "https://yu88eqe5p0.ufs.sh/f/Dk6Z3495qeoEZamfPpzJiHs02WBYbTS4mlwAyaPVnvEkKRu1",
        },
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="order-2 md:order-1">
                <Button >
                    <Plus />
                    Add social network
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new social network</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Select your social network</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                const selectedLink = LinksSocialNetwork.find((link) => link.icon === value);

                                                if (selectedLink) {
                                                    form.setValue("name", selectedLink.name);
                                                }
                                            }}
                                            value={field.value || ""}
                                            className="grid grid-cols-4"
                                        >
                                            {LinksSocialNetwork.map(({ name, icon }) => (
                                                <FormItem key={name} className="flex items-center gap-1 space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={icon} />
                                                    </FormControl>

                                                    <FormLabel className="font-normal">
                                                        <Image src={icon} alt={name} width={40} height={40} />
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name will be automatically filled" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Add new</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}