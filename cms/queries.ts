import groq from 'groq'

export const blogPostPathsQuery = groq`
  *[_type == 'post'] {
    locale,
    'slug': slug.current
  }
`

export const blogPostsQuery = groq`
  *[_type == 'post' && locale == $locale] | order(date desc) {
    'slug': slug.current,
    title,
    description,
    date,
    coverImage
  }
`

export const blogPostQuery = groq`
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
`
