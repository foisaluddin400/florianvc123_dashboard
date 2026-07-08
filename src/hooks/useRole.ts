import { useGetProfileQuery } from "../redux/services/profileApis"



export const useRole = () => {
    const { data, isLoading, isError } = useGetProfileQuery();

    if (isError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    const role = data?.data?.user?.role;
    return { role, isLoading, isError };
};
