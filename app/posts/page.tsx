'use client'

import { useEffect, useState } from 'react'

interface Post {
    id: number
    title: string
    content: string
    createdAt: string
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                setLoading(false)
            })
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold tracking-tight">📰 ニュース一覧</h1>
                <a
                    href="/posts/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    新規投稿
                </a>
            </div>
            {loading ? (
                <p className="text-gray-500">読み込み中...</p>
            ) : (
                <ul className="space-y-6">
                    {posts.map(post => (
                        <li
                            key={post.id}
                            className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 transition hover:shadow-xl"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                            <p className="text-sm text-right text-gray-400">
                                投稿日: {new Date(post.createdAt).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}