import { IssueStatusBadge, Link } from "@/app/components/index";
import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import { Issue } from "next/dist/build/swc";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Suspense } from "react";
import { Metadata } from "next";
interface Props {
  searchParams: IssueQuery
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  
  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined; 
    const where = { status }
    const page = parseInt(searchParams.page) || 1
    const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where})

  return (
    <Suspense fallback={<div>Loading issues...</div>}>
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination
      itemCount={issueCount}
      pageSize={pageSize}
      currentpage={page}
      />
    </Flex>
    </Suspense>
  );
};
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};
export default IssuesPage;

