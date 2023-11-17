import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Header from "@/components/Header/Header";
import { ProjectForm } from "@/components/form/Form";
import Redirect from "@/components/Redirect";
import Loading from "@/components/Loading";

const Form = () => {
    const router = useRouter();
    const { id } = router?.query;
    const { data: sessionData, status } = useSession();
    const { data: form } = api.form.formSelectByID.useQuery({ id: id as string });

    const [project_name, set_project_name] = useState("Project Form");

    useEffect(() => {
        if (form) {
            set_project_name(form.project_name);
        }
    }, [form]);

    if (status === "loading") {
        return <Loading />;
    }

    return (
        <>
            {sessionData ? (
                <>
                    <Header page={project_name} />
                    {form && <ProjectForm formData={form} />}
                </>
            ) : (
                <Redirect />
            )}
        </>
    );
};

export default Form;
