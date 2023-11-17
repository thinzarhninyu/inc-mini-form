import { useSession } from "next-auth/react";

import { ProjectForm } from "@/components/form/Form"
import Redirect from "@/components/Redirect";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading";

const Form = () => {
    const { data: sessionData, status } = useSession();

    if (status === "loading") {
        return <Loading />;
    }

    return (
        <>
            {sessionData ? (
                <>
                    <Header page={"Project Form"} />
                    <ProjectForm />
                </>
            ) : (
                <Redirect />
            )}
        </>
    );
}

export default Form;