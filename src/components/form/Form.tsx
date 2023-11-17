"use client"
import React, { useEffect } from "react"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"

import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { FileUpload } from "@/components/FileUpload"

import { cn } from "@/lib/utils"
import { api } from "@/utils/api"
import { type FormType } from "@/types/form"
import { frameworks, updates, types } from "@/data/option"

const FormSchema = z.object({
    project_name: z.string().min(1, {
        message: "Input field cannot be null.",
    }),
    description: z.string().min(2, {
        message: "Input field cannot be null.",
    }),
    completion_date: z.date().min(new Date("1900-01-01"), {
        message: "Input field cannot be null.",
    }),
    type: z.string().min(2, {
        message: "Input field cannot be null."
    }),
    frameworks: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    updates: z.string().min(1, {
        message: "Input field cannot be null."
    }),
    rating: z.number().min(0, {
        message: "Input field cannot be null."
    }),
    image: z.string().min(2, {
        message: "You need to upload a picture."
    }),
    brief: z.string().nullable(),
})

export function ProjectForm({ formData }: { formData?: FormType }) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            project_name: '',
            description: '',
            completion_date: new Date(),
            type: '',
            frameworks: [],
            updates: '',
            rating: 0,
            image: '',
            brief: null,
        }
    })

    useEffect(() => {
        if (formData) {
            form.reset({
                project_name: formData.project_name,
                description: formData.description,
                completion_date: formData.completion_date,
                type: formData.type,
                frameworks: formData.frameworks,
                updates: formData.updates,
                rating: formData.rating,
                image: formData.image,
                brief: formData.brief,
            })
        }
        console.log("formData.rating", formData?.rating)
    }, [formData, form])

    const createForm = api.form.createForm.useMutation();
    const updateForm = api.form.updateForm.useMutation();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("submit is clicked");

        if (formData) {
            try {
                const res = await updateForm.mutateAsync({
                    id: formData.id,
                    title: "Project Form",
                    project_name: data.project_name,
                    description: data.description,
                    completion_date: data.completion_date,
                    type: data.type,
                    frameworks: data.frameworks,
                    updates: data.updates,
                    rating: data.rating,
                    image: data.image,
                    brief: data.brief,
                });

                console.log("updating form");
                toast({
                    title: "You updated the following values:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                        </pre>
                    ),
                });
                window.location.href = "/";
                return res;
            } catch (error) {
                console.error("Error updating form:", error);
            }
        } else {
            try {
                const res = await createForm.mutateAsync({
                    title: "Project Form",
                    project_name: data.project_name,
                    description: data.description,
                    completion_date: data.completion_date,
                    type: data.type,
                    frameworks: data.frameworks,
                    updates: data.updates,
                    rating: data.rating,
                    image: data.image,
                    brief: data.brief,
                });

                console.log("creating form");
                toast({
                    title: "You submitted the following values:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                        </pre>
                    ),
                });

                form.reset({
                    project_name: "",
                    description: "",
                    completion_date: new Date(),
                    type: "",
                    frameworks: [],
                    updates: "",
                    rating: 0,
                    image: "",
                    brief: null,
                });

                return res;
            } catch (error) {
                console.error("Error creating form:", error);
            }
        }
    }

    return (
        <>
            <div className="flex justify-center items-center py-7 mx-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="project_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mini Form" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your description here." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="completion_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Project Completion Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date: Date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the project type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {types.map((item) => (
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.label}
                                                </SelectItem>

                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="frameworks"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Frameworks</FormLabel>
                                    </div>
                                    {frameworks.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="frameworks"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked: string | boolean) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="updates"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Open to Updates?</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-1">
                                            {updates.map((item) => (
                                                <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={item} checked={field.value === item} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{item}</FormLabel>
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
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Difficulty Rating</FormLabel>
                                    <FormControl>
                                        <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} min={0} max={5} step={1} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            endpoint="projectImage"
                                            onChange={(value) => {
                                                // Update the value in your form state using the provided onChange callback
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                        />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brief"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Brief <span className="text-xs">(Optional)</span></FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            endpoint="projectBrief"
                                            onChange={(value) => {
                                                // Update the value in your form state using the provided onChange callback
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                        />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-center gap-x-3">
                            <Link href="/" className={buttonVariants({ variant: "outline" })}>Discard</Link>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </div >
        </>
    )
}
