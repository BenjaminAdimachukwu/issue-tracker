"use client";

import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import prisma from "@/prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Select.Root
    defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        console.log(params);
        searchParams.get("orderBy");

        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);

        // const query = status ? `?status=${status}` : ''
        // router.push('/issues/list'+ query)
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value!}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
    </Suspense>
  );
};

export default IssueStatusFilter;
