import { useState, useEffect } from "react";
import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import { api } from "@/utils/api";
import { types } from "@/data/option"

import { format } from 'date-fns';

const Dashboard = () => {

    const { data: forms } = api.form.formSelect.useQuery();
    const deleteForm = api.form.deleteForm.useMutation();

    const [form_list, set_forms] = useState(forms);

    useEffect(() => {
        set_forms(forms);
    }, [forms])

    const handleDelete = async (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            await deleteForm.mutateAsync({ id });
            toast({
                title: "You have successfully deleted the form!"
            })
            set_forms((form_list) => form_list?.filter((form) => form.id !== id));
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-wrap p-4 gap-y-4 gap-x-4 max-w-screen-xl mx-auto">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href="/form">
                                <Card className="w-96 h-52 flex justify-center items-center">
                                    <CardContent className="flex justify-center items-center">
                                        <Plus size={48} />
                                    </CardContent>
                                </Card>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Create New Project</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {form_list?.map((project, index) => (
                    <Link
                        key={index}
                        href={{
                            pathname: '/form/[id]',
                            query: { id: project.id },
                        }}
                    >
                        <Card key={index} className="w-96 h-full">
                            <CardHeader>
                                <CardTitle className="text-center whitespace-normal break-words">{project.project_name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {types.map((type) => (
                                    type.id === project.type && (
                                        <p key={type.id}>{type.label}</p>
                                    )
                                ))}
                                <CardDescription>
                                    <p className="sm">
                                        Last edited: {format(project.updatedAt, 'MMMM dd, yyyy HH:mm:ss')}
                                    </p>
                                </CardDescription>
                            </CardContent>

                            <CardFooter className="justify-center flex">
                                <Button onClick={(event) => handleDelete(project.id, event)}>
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;