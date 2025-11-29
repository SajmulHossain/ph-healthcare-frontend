"use client"

import ManagementHeader from "@/components/shared/ManagementHeader";
import ManagementTable from "@/components/shared/ManagementTable";
import RefreshButton from "@/components/shared/RefreshButton";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

const DoctorDashboardPage = () => {
  return (
    <div>
      <ManagementHeader
        title="Management Header"
        action={{ label: "Read more", onClick: () => {}, icon: MoreHorizontal }}
      >
        <RefreshButton />
      </ManagementHeader>
      <ManagementTable
        columns={[
          {
            header: "Name",
            accessor: "ki jani ki",
          },
          {
            header: "Email",
            accessor: "ki jani ki",
          },
          {
            header: "Phone",
            accessor: () => <Badge>Get Phone</Badge>,
          },
        ]}
        data={[
          {
            "ki jani ki": "what",
          },
        ]}
        getRowKey={(key) => key}
      />
    </div>
  );
};

export default DoctorDashboardPage;
