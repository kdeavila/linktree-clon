import { Button } from "@/components/ui/button";
import { useStepConfig } from "@/hooks/use-step-config";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./StepThree.form";
import { z } from "zod";

export const StepThree = () => {
    const { setInfoUser, nextStep, infoUser, step, prevStep } = useStepConfig();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            links: infoUser.platforms.map((platform) => ({
                name: platform.name,
                link: platform.link || "",
            })),
        },
    });

    const handleContinue: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
        const updatePlatforms = infoUser.platforms.map((platform, index) => ({
            ...platform,
            link: data.links[index].link,
        }));

        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            platforms: updatePlatforms,
        }));

        nextStep();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleContinue)}>
                <div>
                    <h2 className="text-2xl font-semibold text-neutral-950">Add your links</h2>
                    <p className="text-sm text-neutral-600">Complete the fields to add your links</p>

                    <div className="grid grid-cols-1 gap-2">
                        {infoUser.platforms.map(({ icon, name }, index) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={`links.${index}.link`}
                                render={({ field }) => (
                                    <FormItem className="first:mt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col gap-2 items-center">
                                                <Image src={icon} alt={`${name} icon`} width={24} height={24} />
                                            </div>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id={`${name}-input`}
                                                    type="text"
                                                    placeholder={`https://example.com/your-${name.toLowerCase()}`}
                                                    className="w-full border rounded-md p-2 text-sm"
                                                />
                                            </FormControl>
                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    <div className="mt-4 flex flex-col gap-3 text-neutral-950">
                        {step > 1 && step <= 5 && (
                            <Button variant="outline" className="w-full" onClick={prevStep}>
                                <ArrowLeft />
                                Back
                            </Button>
                        )}
                        <Button type="submit" className="w-full">
                            Continue
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};
