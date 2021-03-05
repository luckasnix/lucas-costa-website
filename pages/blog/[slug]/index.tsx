import { GetServerSideProps } from 'next'
import { getBlogPost, BlogPost } from '../../../utils/sanity'

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
  return <h1>{blogPost.title}</h1>
}
