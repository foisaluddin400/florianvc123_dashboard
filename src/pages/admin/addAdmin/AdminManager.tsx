// AdminManager.tsx

"use client";

import { useState } from "react";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import { PageContent, PageLayout } from "../../../components/shared/PageLayout";

import DynamicTable from "../../../components/shared/DynamicTable";

import {
  useAddAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "../../../redux/createAdmin/addAdminApi";

import { AdminDataColumn } from "./AdminDataColumn";
import toast from "react-hot-toast";

const AdminManager = () => {
  const { data: adminData, refetch } = useGetAllAdminQuery();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addAdmin, { isLoading }] = useAddAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAdmin = async () => {
    try {
      const res = await addAdmin(formData).unwrap();

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
      toast.success(res?.message);

      setOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error((error as any)?.data?.message || "Failed to add admin");
    }
  };

  const handleDelete = async () => {
    try {
      if (!deleteId) return;

      await deleteAdmin(deleteId).unwrap();

      refetch();
      setDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };
  const renderAction = () => {
    return (
      <div className="flex gap-2 items-center flex-wrap">
        {/* <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active Users</SelectItem>
              <SelectItem value="blocked">Blocked Users</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        {/* <Field>
          <ButtonGroup>
            <Input
              className="h-9 focus:outline-none! focus:ring-0!"
              id="input-button-group"
              placeholder="Type to search..."
            />

            <Button
              size="default"
              className="h-9"
              variant="outline"
            >
              Search
            </Button>
          </ButtonGroup>
        </Field> */}

        <Button onClick={() => setOpen(true)}>Add Admin</Button>
      </div>
    );
  };

  return (
    <>
      <PageLayout title="Manage Admins" action={renderAction()}>
        <PageContent
          children={
            <DynamicTable
              columns={AdminDataColumn((id) => setDeleteId(id))}
              data={adminData?.data?.result || []}
            />
          }
        />
      </PageLayout>
      {/* DELETE CONFIRMATION POPUP */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-3">Delete Admin</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this admin?
            </p>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>

              <Button variant="destructive" onClick={handleDelete}>
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* CUSTOM POPUP */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-6">Add New Admin</h2>

            <div className="space-y-4">
              <Input
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />

              <Input
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              <Input
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button onClick={handleAddAdmin} disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Admin"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminManager;
