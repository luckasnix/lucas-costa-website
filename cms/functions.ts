import imageUrlBuilder from '@sanity/image-url'
import client from './client'
import { blogPostPathsQuery, blogPostSlugsQuery, blogPostsQuery, blogPostQuery } from './queries'
import { BlogPost, Asset, ImageReference } from './types'
import { BLOG_POSTS_PER_PAGE } from '../utils/constants'

export type GetBlogPostPaths = () => Promise<BlogPost[]>

export const getBlogPostPaths: GetBlogPostPaths = async () => {
  const blogPostPaths = await client.fetch(blogPostPathsQuery)

  return blogPostPaths
}

export type GetBlogPostSlugs = (locale: string) => Promise<BlogPost[]>

export const getBlogPostSlugs: GetBlogPostSlugs = async (locale) => {
  const blogPostSlugs = await client.fetch(blogPostSlugsQuery, { locale })

  return blogPostSlugs
}

export type GetBlogPosts = (locale: string, page: number) => Promise<BlogPost[]>

export const getBlogPosts: GetBlogPosts = async (locale, page) => {
  const start = (page - 1) * BLOG_POSTS_PER_PAGE
  const end = page * BLOG_POSTS_PER_PAGE
  const blogPosts = await client.fetch(blogPostsQuery, { locale, start, end })
  
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
