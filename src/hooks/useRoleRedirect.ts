import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE_ROUTES } from '../constant/roleRoutes';
import type { UserRole } from '../types/roles';
import { useGetProfileQuery } from "../redux/services/profileApis";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/services/authSlice";

export const useRoleRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetProfileQuery();

  const role = data?.data?.user?.role as UserRole;
  console.log("Current User Role:", role);

  useEffect(() => {
    if (isLoading) return;

    if (isError || !data) {
      navigate("/login", { replace: true });
      return;
    }


    const userData = data?.data?.user;
    const role = userData?.role as UserRole;

    if (userData) {
      dispatch(setUser(userData));

      const redirectPath = ROLE_ROUTES[role];
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [data, isLoading, isError, navigate, dispatch]);
};