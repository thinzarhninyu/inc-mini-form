import React, { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";


export interface Form {
    name: string,
    type: string,
    last_edited: string
}

export const forms: Form[] = [
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
    {
        name: "Mini Form",
        type: "School Project",
        last_edited: "29 Oct 2023",
    },
]

export default () => {

    // const [forms, setForms] = useState([]);

    return (
        <>
            <div className="flex items-center justify-center mb-5">
                <Link href="/form" className={buttonVariants({ variant: "outline" })}>Create New Project</Link>
            </div>
            <div className="mb-5 text-center font-bold underline">Recent Projects</div>
            {/* <ScrollArea className="w-96 whitespace-nowrap rounded-md border"> */}
            <div className="mx-4 flex flex-wrap justify-between p-4">
                {forms.map((project, index) => (
                    <Link href="/form">
                        <Card key={index} className="w-96 mb-4">
                            <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{project.type}</p>
                            </CardContent>
                            <CardFooter>
                                <p>Last edited: {project.last_edited}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* <ScrollBar orientation="horizontal" /> */}
            {/* </ScrollArea> */}
        </>
    )
}