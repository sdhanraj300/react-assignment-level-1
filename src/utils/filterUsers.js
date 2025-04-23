export function filterUsers(users, query) {
    if (!query) return users;

    const lowerQuery = query.toLowerCase();
    return users.filter(
        (user) =>
            user.first_name.toLowerCase().includes(lowerQuery) ||
            user.last_name.toLowerCase().includes(lowerQuery)
    );
}
