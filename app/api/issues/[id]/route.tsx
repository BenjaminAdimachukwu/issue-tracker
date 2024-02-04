import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import delay from "delay";
import { request } from "http";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
  

) {
  const session = await getServerSession(authOptions)
  if(!session)
  return NextResponse.json({}, {status: 401})
  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue?.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}

//delay(2000)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if(!session)
  return NextResponse.json({}, {status: 401})
const issue = await prisma.issue.findUnique({
  where: { id: parseInt(params.id)}
})
if(!issue)
return NextResponse.json({ error: 'Invalid issue'}, {status: 400})

await prisma.issue.delete({
  where: {id : issue.id}
})
return NextResponse.json({})
}