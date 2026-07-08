// ManageListing.tsx
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { Field } from "../../../components/ui/field";
import { ButtonGroup } from "../../../components/ui/button-group";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import {
  PageContent,
  PageLayout,
} from "../../../components/shared/PageLayout";

import DynamicTable from "../../../components/shared/DynamicTable";

import { useGetAllManageListQuery } from "../../../redux/manageListApi/ManageListApi";

import { ManageListingDataColumn } from "./ManageListingDataColumn";
import { useNavigate } from "react-router-dom";

const ManageListing = () => {
    const navigate = useNavigate()
  const { data: manageList } = useGetAllManageListQuery();
 const renderRouting = (id: string) => {
    navigate(`/admin/manage-listing/${id}`)
  }
  const renderAction = () => {
    return (
      <div className="flex gap-2 ">
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="UNDER_REVIEW">
                Under Review
              </SelectItem>
              <SelectItem value="APPROVED">
                Approved
              </SelectItem>
              <SelectItem value="REJECTED">
                Rejected
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Field>
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
        </Field>
      </div>
    );
  };

  return (
    <PageLayout
      title="Manage Listings"
      action={renderAction()}
    >
      <PageContent
        children={
          <DynamicTable
            columns={ManageListingDataColumn(renderRouting)}
            data={manageList?.data || []}
          />
        }
      />
    </PageLayout>
  );
};

export default ManageListing;