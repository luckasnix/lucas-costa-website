import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production'
})

export interface ImageReference {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  coverImage: ImageReference
}

export type GetBlogPosts = () => Promise<BlogPost[]>

export const getBlogPosts: GetBlogPosts = async () => {
  const blogPosts = await client.fetch(`
    *[_type == 'post'] {
      'slug': slug.current,
      title,
      description,
      date,
      coverImage
    }
  `)

  return blogPosts
}
