import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../../containers/layout'
import Article from '../../../containers/article'
import { getBlogPost, BlogPost, urlFor } from '../../../utils/sanity'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let { slug } = params
  if (slug instanceof Array) {
    slug = slug[0]
  }
  const blogPost = await getBlogPost(slug)

  return {
    props: {
      blogPost
    }
  }
}

export interface PostProps {
  blogPost: BlogPost
}

export default function Post({ blogPost }: PostProps) {
  let content: ReactNode
  if (blogPost) {
    content = (
      <Article
        title={blogPost?.title}
        description={blogPost?.description}
        date={blogPost?.date}
        authorName={blogPost?.author.name}
        authorAvatarUrl={urlFor(blogPost?.author?.avatar).width(40).url()}
        coverImageUrl={urlFor(blogPost?.coverImage).width(720).url()}
        content={blogPost?.content}
      />
    )
  } else {
    content = <p>Postagem não encontrada!</p>
  }

  return (
    <Layout>
      {content}
    </Layout>
  )
}
