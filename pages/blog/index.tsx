import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import { getBlogPosts, BlogPost, urlFor } from '../../utils/sanity'
import Layout from '../../containers/layout'
import Feed from '../../containers/feed'
import Card from '../../components/card'
import Message from '../../containers/message'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const blogPosts = await getBlogPosts(locale)

  return {
    props: {
      locale,
      blogPosts
    }
  }
}

export interface BlogProps {
  locale: string
  blogPosts: BlogPost[]
}

export default function Blog({ locale, blogPosts }: BlogProps) {
  let content: ReactNode
  if (blogPosts && blogPosts.length) {
    content = (
      <Feed>
        {blogPosts.map(blogPost => (
          <li key={blogPost?.slug}>
            <Card
              locale={locale}
              slug={blogPost?.slug}
              coverImageUrl={urlFor(blogPost?.coverImage).width(480).url()}
              date={blogPost?.date}
              title={blogPost?.title}
              description={blogPost?.description}
            />
          </li>
        ))}
      </Feed>
    )
  } else {
    content = (
      <Message
        title='Nenhuma postagem encontrada'
        description='Não há postagens para a localidade selecionada.Tente alterar a localidade atual.'
      />
    )
  }
  
  return (
    <Layout>
      {content}
    </Layout>
  )
}
