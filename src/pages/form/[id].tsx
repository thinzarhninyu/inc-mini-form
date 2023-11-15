import { ProjectForm } from "@/components/form/Form"
import { api } from "@/utils/api";
import { useRouter } from 'next/router'

export default () => {
    const router = useRouter();
    const { id } = router?.query;
    const { data: form } = api.form.formSelectByID.useQuery({ id: id as string });
    console.log("form", form)

    return (

        <>
            {/* <div>id: {id}</div> */}
            <ProjectForm formData={form} />
        </>
    )
}