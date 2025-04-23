export function paginateUsers(users, currentPage, usersPerPage) {
    const startIdx = (currentPage - 1) * usersPerPage;
    return users.slice(startIdx, startIdx + usersPerPage);
}
