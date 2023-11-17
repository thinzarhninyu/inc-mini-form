export type FormType  = {
    id: string;
    title: string;
    project_name: string,
    description: string,
    completion_date: Date,
    type: string,
    frameworks: string[],
    updates: string,
    rating: number,
    image: string,
    brief: string | null,
    // createdBy: string,
    createdAt: Date,
    updatedAt: Date
}