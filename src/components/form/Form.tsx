"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import React, { useState, useEffect } from "react"

import { CalendarIcon, Pencil } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
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
import { cn } from "@/lib/utils"
import Link from "next/link"

const FormSchema = z.object({
    project_name: z.string().min(1, {
        message: "Input field cannot be null.",
    }),
    description: z.string().min(2, {
        message: "Input field cannot be null.",
    }),
    // completion_date: z.string().min(2, {
    //     message: "Input field cannot be null.",
    // }),
    completion_date: z.date().min(new Date("1900-01-01"), {
        message: "Input field cannot be null.",
    }),
    type: z.string().min(2, {
        message: "Input field cannot be null."
    })
})

export function ProjectForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            project_name: "",
            description: "",
            completion_date: new Date(),

        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const [project_name, set_project_name] = useState("Project Form");

    return (
        <>
            <div className="sticky top-0 bg-gray-800 text-center p-5 text-white flex items-center justify-center">
                {/* <Input type="text" placeholder="Project Form" defaultValue="Project Form" value={project_name} onChange={(e) => set_project_name(e.target.value)} className="w-75 bg-transparent text-center border-0" /> */}
                {project_name}
            </div>
            <div className="flex justify-center items-center pt-7 mx-10">
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the project type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="m@example.com">School Project</SelectItem>
                                            <SelectItem value="m@google.com">Personal Project</SelectItem>
                                            <SelectItem value="m@support.com">Paid Project</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-center gap-x-3">
                            {/* <Button type="button" variant={"outline"}>Discard</Button> */}
                            <Link href="/" className={buttonVariants({ variant: "outline" })}>Discard</Link>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}
