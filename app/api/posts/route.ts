// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { title, content } = body

    const post = await prisma.post.create({
        data: { title, content },
    })

    return NextResponse.json(post)
}