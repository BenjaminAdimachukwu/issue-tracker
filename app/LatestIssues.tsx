import React from 'react'
import prisma from '@/prisma/client'
import { Table, Flex, Card, Avatar, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusBadge from './components/IssueStatusBadge'

const LatestIssues = async() => {

    const issues = await  prisma.issue.findMany({
        orderBy: { createdAt : 'desc'},
        take: 5,
        include: {
            assignedToUser: true // this is called eager loading, as we are fetching issues, to the users they are assinged to
        }
    })
  return (
    <Card>
        <Heading size='4' mb='5'>latest Issues</Heading>
    <Table.Root>
        <Table.Body>
            {issues.map(issue => (
                <Table.Row key={issue.id}>
                    <Table.Cell>
                        <Flex justify='between'>
                       <Flex direction='column' align='start' gap='2'>
                        <Link href={`/issues/${issue.id}`}> {issue.title}</Link>
                        <IssueStatusBadge status={issue.status} />
                       </Flex>
                       {issue.assignedToUserId && (
                        <Avatar src={issue.assignedToUser?.image!} fallback='?' size='2' radius='full' />

                       )}
                        </Flex>
                    </Table.Cell>

                </Table.Row>
            ))}
        </Table.Body>
    </Table.Root>
  </Card>
  )
}

export default LatestIssues