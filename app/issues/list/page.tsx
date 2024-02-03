import React from 'react'
import { Button, Table, TextArea,  } from '@radix-ui/themes'
//import Link from '../components/Link'
import prisma from '@/prisma/client'
//import IssueStatusBadge from '../components/IssueStatusBadge'
import {IssueStatusBadge, Link} from '@/app/components/index'
import IssueActions from './IssueActions'
const IssuesPage = async () => {

 const issues = await  prisma.issue.findMany()
 
  return (
    <div>
     <IssueActions/>
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
              <Link href= {`/issues/${issue.id}`}>
              {issue.title}
              </Link>
            <div className='block md:hidden'> <IssueStatusBadge status ={issue.status}/> </div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'> <IssueStatusBadge status={issue.status}/></Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>

          </Table.Row>
          ))}
        </Table.Body>

      </Table.Root>
      </div>
  )
}

export default IssuesPage