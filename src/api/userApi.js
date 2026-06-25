import axios from "axios";

export const getCurrentUser = async () => {
    const token =
        JSON.parse(localStorage.getItem("user"))
            ?.accessToken;

    const response = await axios.get(
        "http://localhost:8000/api/v1/users/profile",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};