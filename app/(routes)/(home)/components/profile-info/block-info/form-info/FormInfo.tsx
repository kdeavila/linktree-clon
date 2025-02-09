"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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

import { useUserInfo } from "@/hooks/use-user";
import { FormInfoProps } from "./FormInfo.types"
import { formSchema } from "./FormInfo.form"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

export const FormInfo = (props: FormInfoProps) => {
  const { setOpenDialog } = props;
  const { user, reloadUser } = useUserInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      await axios.patch("/api/update-user", values);
      setOpenDialog(false);
      reloadUser();
      toast({
        title: '✅ Profile info updated successfully',
      })
      form.reset();

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="@username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Save</Button>
      </form>
    </Form>
  )
} 