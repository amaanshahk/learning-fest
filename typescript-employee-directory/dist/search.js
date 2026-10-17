export function searchEmployees(employees, query) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
        return employees;
    }
    return employees.filter((employee) => {
        return (employee.name.toLowerCase().includes(normalizedQuery) ||
            employee.role.toLowerCase().includes(normalizedQuery) ||
            employee.department.toLowerCase().includes(normalizedQuery) ||
            employee.muid.toLowerCase().includes(normalizedQuery));
    });
}
