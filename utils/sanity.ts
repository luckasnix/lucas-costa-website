import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production'
})

export interface Block {
  _key: string
  _type: 'block'
  style: string
  children: {
    _key: string
    _type: string
    text: string
    marks: string[]
  }[]
  markDefs: {
    _key: string
    _type: string
  }[]
}

export interface ImageReference {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
}

export interface ImageReferenceWithCaption extends ImageReference {
  caption: string
}

export interface Code {
  _key: string
  _type: 'code'
  code: string
  filename: string
  language: string
}

export type ContentItem = Block | ImageReferenceWithCaption | Code

export interface Author {
  name: string
  avatar: ImageReference
}

export interface BlogPost {
  slug?: string
  title?: string
  description?: string
  date?: string
  coverImage?: ImageReference
  content?: ContentItem[]
  author?: Author
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

export function urlFor(src: ImageReference) {
  return builder.image(src)
}
