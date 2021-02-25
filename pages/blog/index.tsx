import { ReactNode } from 'react'
import { GetServerSideProps } from 'next'
import { getBlogPosts, BlogPost, urlFor } from '../../utils/sanity'
import Layout from '../../containers/layout'

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
      <ul>
        {blogPosts.map(blogPost => (
          <li key={blogPost?.slug}>
            <img src={urlFor(blogPost?.coverImage).width(480).url()} alt={blogPost?.title}/>
            <h2>{blogPost?.title}</h2>
            <p>{blogPost?.description}</p>
            <time>{blogPost?.date}</time>
          </li>
        ))}
      </ul>
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
