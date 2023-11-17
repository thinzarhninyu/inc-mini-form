const frameworks = [
    {
        id: "recents",
        label: "Recents",
    },
    {
        id: "home",
        label: "Home",
    },
    {
        id: "applications",
        label: "Applications",
    },
    {
        id: "desktop",
        label: "Desktop",
    },
    {
        id: "downloads",
        label: "Downloads",
    },
    {
        id: "documents",
        label: "Documents",
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