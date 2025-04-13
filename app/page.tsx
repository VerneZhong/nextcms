'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Post {
    id: number
    title: string
    content: string
    createdAt: string
    author?: {
        name: string
    }
}

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
    const [search, setSearch] = useState('')
    const displayPosts =
        search.trim() === ''
            ? filteredPosts.slice(0, 4) // 初期最大値4
            : filteredPosts
    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                setFilteredPosts(data)
            })
    }, [])

    useEffect(() => {
        const keyword = search.toLowerCase()
        const filtered = posts.filter(
            post =>
                post.title.toLowerCase().includes(keyword) ||
                post.content.toLowerCase().includes(keyword)
        )
        setFilteredPosts(filtered)
    }, [search, posts])

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <section className="text-center mb-12">
                <h1 className="text-4xl font-extrabold mb-4">ようこそ、Mini CMSへ ✨</h1>
                <p className="text-lg text-gray-600 mb-6">
                    あなたの考えを世界に届けましょう！
                </p>
                <Link
                    href="/posts/new"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                    今すぐ投稿する
                </Link>
            </section>

            {/* 🔍 検索フォーム */}
            <div className="mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="記事タイトルや内容で検索..."
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* 📝 検索結果 */}
            <section>
                <h2 className="text-2xl font-bold mb-4">🆕 検索結果</h2>
                {displayPosts.length === 0 ? (
                    <p className="text-gray-500">該当する記事が見つかりませんでした。</p>
                ) : (
                    <ul className="space-y-6">
                        {displayPosts.map((post) => (
                            <li
                                key={post.id}
                                className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition"
                            >
                                <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    投稿者: {post.author?.name ?? '匿名'} ／ 投稿日: {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700 mb-3">
                                    {post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}
                                </p>
                                <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                                    続きを読む →
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}