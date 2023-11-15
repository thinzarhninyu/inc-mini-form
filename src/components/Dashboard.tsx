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
import { buttonVariants, Button } from "@/components/ui/button";

import { api } from "@/utils/api";
import { format } from 'date-fns';


export default () => {

    const { data: forms } = api.form.formSelect.useQuery();
    const deleteForm = api.form.deleteForm.useMutation();

    const handleDelete = async (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent the link from navigating if the event is defined
        // if (event) {
        event.preventDefault();
        // }

        try {
            await deleteForm.mutateAsync({ id });
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };


    console.log("form", forms);

    return (
        <>
            <div className="flex items-center justify-center mb-5">
                <Link href="/form" className={buttonVariants({ variant: "outline" })}>Create New Project</Link>
            </div>
            <div className="mb-5 text-center font-bold underline">Recent Projects</div>
            <div className="mx-4 flex flex-wrap justify-evenly p-4">
                {forms?.map((project, index) => (
                    <Link href={{
                        pathname: '/form/[id]',
                        query: { id: project.id },
                    }}>
                        <Card key={index} className="w-96 mb-4">
                            <CardHeader>
                                <CardTitle className="text-center">{project.project_name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{project.type}</p>
                                <CardDescription>
                                    <p className="sm">Last edited: {format(project.updatedAt, 'MMMM dd, yyyy HH:mm:ss')}</p>
                                </CardDescription>
                            </CardContent>

                            <CardFooter className="justify-center flex">
                                <Button onClick={(event) => handleDelete(project.id, event)}>Delete</Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )
}