export type Department =
    | "Engineering"
    | "Human Resources"
    | "Marketing"
    | "Finance";

export interface Employee {
    id: number;
    name: string;
    role: string;
    department: Department;
    email: string;
    muid: string;
}
