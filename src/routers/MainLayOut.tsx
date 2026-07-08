import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import type { ROLES } from '../lib/roles';
import { useRole } from "../hooks/useRole";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";



function MainLayOut() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { role, isLoading } = useRole()
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <Loader className="animate-spin text-brand" size={40} />
    </div>
  }
  if (!role) {
    return <Navigate to="/login" replace />
  }
  return (
    <div className="flex flex-col justify-center">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role as keyof typeof ROLES} />
      <Sidebar role={role as keyof typeof ROLES} sidebarOpen={sidebarOpen} />
    </div>
  );
}

export default MainLayOut;
