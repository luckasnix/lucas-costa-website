import BlockContent from '@sanity/block-content-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import FormattedDate from '../../components/formatted-date'
import { urlFor, ContentItem } from '../../utils/sanity'
import styles from './article.module.scss'

export interface ArticleProps {
  title: string
  description: string
  date: string
  authorName: string
  authorAvatarUrl: string
  coverImageUrl: string
  content: ContentItem[]
}

const serializers = {
  types: {
    image: ({ node: { asset, caption } }) => (
      <figure>
        <img src={urlFor(asset).width(720).url()} alt={caption}/>
        <figcaption>{caption}</figcaption>
      </figure>
    ),
    code: ({ node: { filename, language, code } }) => (
      <div>
        <small>{filename}</small>
        <SyntaxHighlighter language={language} style={dracula}>
          {code}
        </SyntaxHighlighter>
      </div>
    )
  }
}

export default function Article({ title, description, date, authorName, authorAvatarUrl, coverImageUrl, content }: ArticleProps) {
  return (
    <article className={styles.container}>
      <div className={styles.limiter}>
        <div className={styles.head}>
          <h1>{title}</h1>
          <p>{description}</p>
          <FormattedDate>{date}</FormattedDate>
        </div>
        <div className={styles.authorSnippet}>
          <img src={authorAvatarUrl} alt={authorName}/>
          <span>{authorName}</span>
        </div>
        <div className={styles.coverImage}>
          <img src={coverImageUrl} alt={title}/>
        </div>
        <BlockContent className={styles.blockContent} blocks={content} serializers={serializers}/>
      </div>
    </article>
  )
}
