import { Loader } from 'lucide-react';
import { useRoleRedirect } from '../hooks/useRoleRedirect';
import { useRole } from '../hooks/useRole';
import { Navigate, Outlet } from 'react-router-dom';

function CheckRoutes() {
  useRoleRedirect();
  const { role, isLoading } = useRole()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin' />
        <h1 className='text-center'>Checking authentication...</h1>
      </div>
    );
  }
  if (!role) {
    return <Navigate to="/login" replace />

  }
  return <Outlet />
}

export default CheckRoutes
