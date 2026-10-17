import { employees } from "./employees.js";
import { searchEmployees } from "./search.js";
import type { Employee } from "./types.js";

const employeeList =
    document.querySelector<HTMLDivElement>("#employee-list");

const searchInput =
    document.querySelector<HTMLInputElement>("#search-input");

const employeeCount =
    document.querySelector<HTMLParagraphElement>("#employee-count");

const emptyState =
    document.querySelector<HTMLParagraphElement>("#empty-state");

if (!employeeList || !searchInput || !employeeCount || !emptyState) {
    throw new Error("Required page elements were not found.");
}

// These constants are narrowed to non-null elements after the guard.
const listElement = employeeList;
const searchElement = searchInput;
const countElement = employeeCount;
const emptyElement = emptyState;

function createEmployeeCard(employee: Employee): HTMLElement {
    const card = document.createElement("article");
    card.className = "employee-card";

    const initials = employee.name
        .split(" ")
        .map((part: string) => part[0] ?? "")
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const top = document.createElement("div");
    top.className = "card-top";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = initials;
    avatar.setAttribute("aria-hidden", "true");

    const identity = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = employee.name;

    const role = document.createElement("p");
    role.className = "role";
    role.textContent = employee.role;

    identity.append(name, role);
    top.append(avatar, identity);

    const department = document.createElement("p");
    department.className = "department";
    department.textContent = employee.department;

    const details = document.createElement("div");
    details.className = "employee-details";

    const email = document.createElement("p");
    email.textContent = `Email: ${employee.email}`;

    const muid = document.createElement("p");
    muid.textContent = `μID: ${employee.muid}`;

    details.append(email, muid);
    card.append(top, department, details);

    return card;
}

function renderEmployees(list: Employee[]): void {
    listElement.replaceChildren(
        ...list.map((employee: Employee) => createEmployeeCard(employee))
    );

    countElement.textContent =
        `${list.length} of ${employees.length} employees`;

    emptyElement.hidden = list.length > 0;
}

function handleSearch(): void {
    const results = searchEmployees(employees, searchElement.value);
    renderEmployees(results);
}

searchElement.addEventListener("input", handleSearch);

renderEmployees(employees);
