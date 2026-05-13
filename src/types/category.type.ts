export interface AddCategoryModalProp {
    isOpen: boolean;
    onOpenChange: () => void
}

export interface CategoryInitI {
    jobName: string;
    location: string;
    id: string;
    skills: string[];

}

export interface ICandidateForm {
    role: string;
    description: string;
    imageName: string;
    skills: string[];
    id: string;
}