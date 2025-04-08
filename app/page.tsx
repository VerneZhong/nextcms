// app/page.tsx
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function HomePage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })

  return (
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
        <ul>
          {posts.map(post => (
              <li key={post.id} className="mb-2">
                <h2 className="text-xl">{post.title}</h2>
                <p className="text-gray-600">{post.content}</p>
              </li>
          ))}
        </ul>
      </main>
  )
}