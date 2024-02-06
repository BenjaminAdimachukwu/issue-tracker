'use client'

import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import prisma from "@/prisma/client";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter =  () => {
    const router = useRouter()
  return (
    <Select.Root onValueChange={(status)=> {
        const query = status ? `?status=${status}` : ''
        router.push('/issues/list'+ query)
    }}>
      <Select.Trigger placeholder="Filter by status..."/>
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value!}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      
    </Select.Root>
  );
};

export default IssueStatusFilter;
