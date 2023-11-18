const frameworks = [
    {
        id: "reactjs",
        label: "ReactJS",
    },
    {
        id: "nextjs",
        label: "NextJS",
    },
    {
        id: "vuejs",
        label: "VueJS",
    },
    {
        id: "nuxtjs",
        label: "NuxtJS",
    },
    {
        id: "angular",
        label: "AngularJS",
    },
    {
        id: "laravel",
        label: "Laravel",
    },
] as const;

const updates = [
    "yes", "no", "maybe"
] as const;

const types = [
    {
        id: "school_project",
        label: "School Project",
    },
    {
        id: "personal_project",
        label: "Personal Project"
    },
    {
        id: "paid_project",
        label: "Paid Project",
    },
] as const;

export { frameworks, updates, types };