import { useEffect, useState } from "react";

const USERS_API = "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json";

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(USERS_API)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then((data) => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    return { users, isLoading, error };
}
