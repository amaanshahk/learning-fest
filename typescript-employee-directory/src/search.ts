import type { Employee } from "./types.js";

export function searchEmployees(
    employees: Employee[],
    query: string
): Employee[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return employees;
    }

    return employees.filter((employee: Employee) => {
        return (
            employee.name.toLowerCase().includes(normalizedQuery) ||
            employee.role.toLowerCase().includes(normalizedQuery) ||
            employee.department.toLowerCase().includes(normalizedQuery) ||
            employee.muid.toLowerCase().includes(normalizedQuery)
        );
    });
}
