// ManageListing.tsx

"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";



import {
  PageContent,
  PageLayout,
} from "../../../components/shared/PageLayout";

import DynamicTable from "../../../components/shared/DynamicTable";

import { UserListingTableColumn } from "./UserListingTableColumn";

import { useGetUserManageQuery } from "../../../redux/manageListApi/ManageListApi";

const UserManage = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  // API hook does not accept parameters; call without arguments
  const { data: userList, isLoading } = useGetUserManageQuery(status);

  const renderRouting = (id: string) => {
    navigate(`/admin/manage-user/${id}`);
  };

  const renderAction = () => {
    return (
      <div className="flex gap-2 flex-wrap">
      <Select onValueChange={(value) => setStatus(value)}>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Filter by Status" />
  </SelectTrigger>

  <SelectContent>
    <SelectGroup>
   

      <SelectItem value="IN_REVIEW">
        In Review
      </SelectItem>

      <SelectItem value="ACTIVE">
        Active
      </SelectItem>

      <SelectItem value="REJECTED">
        Rejected
      </SelectItem>

      <SelectItem value="BLOCKED">
        Blocked
      </SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

        
      </div>
    );
  };

  return (
    <PageLayout
      title="Manage Listings"
      action={renderAction()}
    >
      <PageContent>
        <DynamicTable
          columns={UserListingTableColumn(
            renderRouting
          )}
          data={userList?.data?.data || []}
          isLoading={isLoading}
        />
      </PageContent>
    </PageLayout>
  );
};

export default UserManage;