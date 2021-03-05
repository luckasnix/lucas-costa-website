import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import { getBlogPosts, BlogPost, urlFor } from '../../utils/sanity'
import Layout from '../../containers/layout'
import Feed from '../../containers/feed'
import Card from '../../components/card'

export const getServerSideProps: GetServerSideProps = async () => {
  const blogPosts = await getBlogPosts()

  return {
    props: {
      blogPosts
    }
  }
}

export interface BlogProps {
  blogPosts: BlogPost[]
}

export default function Blog({ blogPosts }: BlogProps) {
  let content: ReactNode
  if (blogPosts && blogPosts.length) {
    content = (
      <Feed>
        {blogPosts.map(blogPost => (
          <li key={blogPost?.slug}>
            <Card
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
    content = <p>Nenhuma postagem publicada</p>
  }
  
  return (
    <Layout>
      {content}
    </Layout>
  )
}
