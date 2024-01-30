import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
interface Props {
    params : {id : string}
}

const IssueDetailsPage = async({params} :Props) => {
    if(typeof params.id ! == 'number') notFound()
    const issue =  await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}

    })
  if (!issue)
  return notFound()

  return (
    <div>

    <Heading>{issue.title}</Heading>
    <Flex className='space-x-3' my='4'>
    <IssueStatusBadge status={issue.status}/>
    <p>{issue.createdAt.toDateString()}</p>
    </Flex>

    <Card>
    <p>{issue.description}</p>
    </Card>
    </div>
  )
}

export default IssueDetailsPage