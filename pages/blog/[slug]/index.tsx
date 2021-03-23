import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../../containers/layout'
import Article from '../../../containers/article'
import Message from '../../../containers/message'
import { getBlogPost, BlogPost, urlFor } from '../../../utils/sanity'

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  let { slug } = params
  if (slug instanceof Array) {
    slug = slug[0]
  }
  const blogPost = await getBlogPost(slug)

  return {
    props: {
      locale,
      blogPost
    }
  }
}

export interface PostProps {
  locale: string
  blogPost: BlogPost
}

export default function Post({ locale, blogPost }: PostProps) {
  let content: ReactNode
  if (blogPost) {
    content = (
      <Article
        locale={locale}
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
    content = (
      <Message
        title='Postagem não encontrada'
        description='A postagem não existe ou foi removida. Tente acessar outra.'
      />
    )
  }

  return (
    <Layout>
      {content}
    </Layout>
  )
}
