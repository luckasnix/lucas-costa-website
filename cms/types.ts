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

export interface Asset {
  _type: 'reference'
  _ref: string
}

export interface ImageReference {
  _type: 'image'
  asset: Asset
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
  locale?: string
  slug?: string
  title?: string
  description?: string
  date?: string
  coverImage?: ImageReference
  content?: ContentItem[]
  author?: Author
}
