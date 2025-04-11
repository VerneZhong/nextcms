// app/posts/[id]/page.tsx

import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function PostDetail({ params }: { params: { id: string } }) {
    const post = await prisma.post.findUnique({
        where: { id: Number(params.id) },
        include: { author: true },
    })

    if (!post) {
        return notFound()
    }

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
                投稿者: {post.author?.name ?? '匿名'}
            </p>
            <p className="text-sm text-gray-500 mb-6">
                投稿日: {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className="prose">
                {post.content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            <div className="mt-6">
                <a href="/posts" className="text-blue-600 hover:underline">← 一覧に戻る</a>
            </div>
        </div>
    )
}