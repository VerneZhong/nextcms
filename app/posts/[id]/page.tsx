// pages/posts/page.tsx
import {GetServerSideProps} from 'next'
import {PrismaClient} from '@prisma/client'
import React from 'react'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = Number(context.params?.id)
    const post = await prisma.post.findUnique({
        where: {id},
    })

    return {
        props: {
            post,
        },
    }
}

export default function PostDetail({post}: { post: any }) {
    return (
        <div style={{padding: '2rem'}}>
            <h1>{post.title}</h1>
            <p style={{whiteSpace: 'pre-line'}}>{post.content}</p>
        </div>
    )
}