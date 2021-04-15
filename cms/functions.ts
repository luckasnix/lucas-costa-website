import imageUrlBuilder from '@sanity/image-url'
import client from './client'
import { BlogPost, Asset, ImageReference } from './types'

export type GetBlogPostPaths = () => Promise<BlogPost[]>

export const getBlogPostPaths: GetBlogPostPaths = async () => {
  const blogPostPaths = await client.fetch(`
    *[_type == 'post'] {
      locale,
      'slug': slug.current
    }
  `)

  return blogPostPaths
}

export type GetBlogPosts = (locale: string) => Promise<BlogPost[]>

export const getBlogPosts: GetBlogPosts = async (locale) => {
  const blogPosts = await client.fetch(`
    *[_type == 'post' && locale == $locale] | order(date desc) {
      'slug': slug.current,
      title,
      description,
      date,
      coverImage
    }
  `, { locale })

  return blogPosts
}

export type GetBlogPost = (slug: string) => Promise<BlogPost>

export const getBlogPost: GetBlogPost = async (slug) => {
  const blogPost = await client.fetch(`
    *[_type == 'post' && slug.current == $slug] {
      title,
      description,
      date,
      coverImage,
      content,
      'author': author-> {
        name,
        avatar
      }
    }
  `, { slug })
    .then(res => res[0])

  return blogPost
}

const builder = imageUrlBuilder(client)

export function urlFor(src: Asset | ImageReference) {
  return builder.image(src)
}
