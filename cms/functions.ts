import imageUrlBuilder from '@sanity/image-url'
import client from './client'
import { blogPostPathsQuery, blogPostsQuery, blogPostQuery } from './queries'
import { BlogPost, Asset, ImageReference } from './types'

export type GetBlogPostPaths = () => Promise<BlogPost[]>

export const getBlogPostPaths: GetBlogPostPaths = async () => {
  const blogPostPaths = await client.fetch(blogPostPathsQuery)

  return blogPostPaths
}

export type GetBlogPosts = (locale: string) => Promise<BlogPost[]>

export const getBlogPosts: GetBlogPosts = async (locale) => {
  const blogPosts = await client.fetch(blogPostsQuery, { locale })

  return blogPosts
}

export type GetBlogPost = (slug: string) => Promise<BlogPost>

export const getBlogPost: GetBlogPost = async (slug) => {
  const blogPost = await client.fetch(blogPostQuery, { slug })
    .then(res => res[0])

  return blogPost
}

const builder = imageUrlBuilder(client)

export function urlFor(src: Asset | ImageReference) {
  return builder.image(src)
}
