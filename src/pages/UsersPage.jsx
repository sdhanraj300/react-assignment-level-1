import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import useUsers from "../hooks/useUsers";
import { filterUsers } from "../utils/filterUsers";
import { sortUsers } from "../utils/sortUsers";

const UsersPage = () => {
  const { users, isLoading, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  
  const usersPerPage = 10;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredUsers = filterUsers(users, searchQuery);

  const sortedUsers = sortUsers(filteredUsers, sortField, sortOrder);

  const startIdx = (currentPage - 1) * usersPerPage;
  const paginatedUsers = sortedUsers.slice(startIdx, startIdx + usersPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200 bg-white">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              User Directory
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Browse and search through our user database
            </p>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md mx-6 my-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error Loading Data
                  </h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 px-6">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No users found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <UserTable
                users={paginatedUsers}
                onSort={setSortField}
                sortField={sortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>
          )}

          {filteredUsers.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Showing {filteredUsers.length > 0 ? startIdx + 1 : 0} -{" "}
          {Math.min(startIdx + usersPerPage, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
