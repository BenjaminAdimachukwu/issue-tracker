import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Card, Flex, Heading, Grid, Button, size } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import {
  FaceIcon,
  ImageIcon,
  SunIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  if (typeof params.id! == "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return notFound();

  return (
    <Grid columns={{initial: '1', md:'2' }} gap="8" >
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3" my="2">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
        <Link href={`/issues/${issue.id}/edit`}>
          Edit Issue
        </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
