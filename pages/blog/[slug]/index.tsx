import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router'
import Layout from '../../../containers/layout'
import Article from '../../../containers/article'
import Message from '../../../containers/message'
import Fallback from '../../../containers/fallback'
import { getBlogPostPaths, getBlogPost, urlFor } from  '../../../cms/functions'
import { BlogPost } from '../../../cms/types'

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPostPaths = await getBlogPostPaths()
  const paths = blogPostPaths.map(({ locale, slug }) => ({
    params: { slug },
    locale
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
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
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Fallback/>
  }

  return (
    <>
      <Head>
        {/* Basic meta tags */}
        <title>{blogPost?.title} | Lucas Costa</title>
        <meta name='description' content={blogPost?.description}/>
      </Head>
      <Layout locale={locale}>
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
      </Layout>
    </>
  )
}
