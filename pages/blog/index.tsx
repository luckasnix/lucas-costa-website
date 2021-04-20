import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../containers/layout'
import Feed from '../../containers/feed'
import Card from '../../components/card'
import Message from '../../containers/message'
import { getBlogPostSlugs, getBlogPosts, urlFor } from '../../cms/functions'
import { BlogPost } from '../../cms/types'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  let { page } = query
  if (page instanceof Array) {
    page = page[0]
  }
  const blogPostSlugs = await getBlogPostSlugs(locale)
  const blogPosts = await getBlogPosts(locale, +page)

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
    <Layout locale={locale}>
      {content}
    </Layout>
  )
}
