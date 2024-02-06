import { IssueStatusBadge, Link } from "@/app/components/index";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import { Issue } from "next/dist/build/swc";
import NextLink from 'next/link'
import { ArrowUpIcon } from "@radix-ui/react-icons";
interface Props {
  searchParams: { status: Status, orderBy: keyof Issue };
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  //console.log(statuses)
  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });
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

  //console.log(issues)
  //console.log(searchParams);
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink href={{
                  query : {...searchParams, orderBy: column.value}
                }}>
                {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
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
    </div>
  );
};

export default IssuesPage;
