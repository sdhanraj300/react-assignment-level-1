import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        const selectedUser = data.find((u) => u.id === Number(id));
        if (!selectedUser) {
          throw new Error("User not found");
        }
        setUser(selectedUser);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  // Function to format field names for display
  const formatFieldName = (key) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Determine which fields to highlight as primary info
  const isPrimaryField = (key) => {
    return [
      "first_name",
      "last_name",
      "email",
      "company_name",
      "job_title",
    ].includes(key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate("/users")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <svg
              className="mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Users
          </button>
        </div>

        {isLoading ? (
          <div className="bg-white shadow-xl rounded-xl p-8 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="bg-red-50 p-6 border-b border-red-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-red-400"
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
                  <h3 className="text-lg font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-red-700">{error}</div>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate("/users")}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Return to user list
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            {/* Header with user's name */}
            <div className="bg-indigo-700 px-6 py-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white rounded-full p-2">
                  <svg
                    className="h-12 w-12 text-indigo-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {user.first_name} {user.last_name}
                  </h2>
                  {user.job_title && (
                    <p className="text-indigo-200 text-lg">{user.job_title}</p>
                  )}
                  {user.company_name && (
                    <p className="text-indigo-300 text-md">
                      {user.company_name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Primary information */}
            <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(user)
                  .filter(
                    ([key]) =>
                      isPrimaryField(key) &&
                      key !== "first_name" &&
                      key !== "last_name"
                  )
                  .map(([key, value]) => (
                    <div key={key} className="flex">
                      <div className="text-gray-500 font-medium w-32">
                        {formatFieldName(key)}:
                      </div>
                      <div className="text-gray-900">{value}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Secondary information */}
            <div className="px-6 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Additional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {Object.entries(user)
                  .filter(([key]) => !isPrimaryField(key) && key !== "id")
                  .map(([key, value]) => (
                    <div key={key} className="flex">
                      <div className="text-gray-500 font-medium w-32">
                        {formatFieldName(key)}:
                      </div>
                      <div className="text-gray-900">{value}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-right">
              <button
                onClick={() => navigate("/users")}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Return to User List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
