// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { title, content, } = body

    const defaultAuthor = await prisma.user.findFirst()

    if (!defaultAuthor) {
        return NextResponse.json({ message: 'ユーザーが見つかりません。' }, { status: 400 })
    }

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: defaultAuthor.id,
        },
    })

    return NextResponse.json(post)
}

export async function GET() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
}