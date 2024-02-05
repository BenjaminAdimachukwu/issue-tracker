import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany({orderBy: {name: 'asc'}})

    if(!users)
    return NextResponse.json({error: 'users not found'}, {status: 404})

    return NextResponse.json(users)
}