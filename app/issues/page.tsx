import React from 'react'
import { Button, Table, TextArea } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'

const IssuesPage = async () => {

 const issues = await  prisma.issue.findMany()
  return (
    <div>
      <div className='mb-5'>
      <Button>
       <Link href='/issues/new'>New Issue</Link>
      </Button>
      </div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>

            <Table.ColumnHeaderCell>issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>created</Table.ColumnHeaderCell>
          </Table.Row>

        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              {issue.title}
            <div className='block md:hidden'>{issue.progress}</div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.progress}</Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>

          </Table.Row>
          ))}
        </Table.Body>

      </Table.Root>
      </div>
  )
}

export default IssuesPage