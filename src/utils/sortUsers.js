export function sortUsers(users, sortField, sortOrder = "asc") {
    if (!sortField) return users;

    return [...users].sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (typeof valA === "string" && typeof valB === "string") {
            return sortOrder === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        return sortOrder === "asc" ? valA - valB : valB - valA;
    });
}
