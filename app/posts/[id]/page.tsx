export const runtime = 'nodejs'

import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

// 静的参数生成
export async function generateStaticParams() {
    const prisma = new PrismaClient()
    const posts = await prisma.post.findMany({ select: { id: true } })
    return posts.map((post) => ({ id: post.id.toString() }))
}

export default async function PostDetail(props: { params: { id: string } }) {
    const idStr = props.params?.id
    const id = Number(idStr)

    if (Number.isNaN(id)) return notFound()

    const prisma = new PrismaClient()
    const post = await prisma.post.findUnique({
        where: { id },
        include: { author: true },
    })

    if (!post) return notFound()

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-2">投稿者: {post.author?.name ?? '匿名'}</p>
            <p className="text-sm text-gray-500 mb-6">投稿日: {new Date(post.createdAt).toLocaleString()}</p>
            <div className="prose whitespace-pre-wrap">{post.content}</div>
            <div className="mt-6">
                <a href="/posts" className="text-blue-600 hover:underline">← 一覧に戻る</a>
            </div>
        </div>
    )
}