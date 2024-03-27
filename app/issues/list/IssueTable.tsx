import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import NextLink from "next/link";
import React, { Suspense } from 'react'


export interface IssueQuery {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  }
  
  interface Props { 
    searchParams: IssueQuery,
    issues: Issue[]
  }

 

const IssueTable = ({ searchParams, issues }:Props) => {

   
     
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  {" "}
                  <IssueStatusBadge status={issue.status} />{" "}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {" "}
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      </Suspense>
  )
}
const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status" as keyof Issue,
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt" as keyof Issue,
      className: "hidden md:table-cell",
    },
  ];

  export const columnNames = columns.map(column => column.value)

export default IssueTable