import BlockContent from '@sanity/block-content-to-react'
import HighlightedCode from '../../components/highlighted-code'
import FormattedDate from '../../components/formatted-date'
import { urlFor } from '../../cms/functions'
import { ContentItem } from '../../cms/types'
import styles from './article.module.scss'

export interface ArticleProps {
  locale: string
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
    code: ({ node: { code, filename, language } }) => (
      <HighlightedCode filename={filename} language={language}>
        {code}
      </HighlightedCode>
    )
  }
}

export default function Article({ locale, title, description, date, authorName, authorAvatarUrl, coverImageUrl, content }: ArticleProps) {
  return (
    <article className={styles.container}>
      <div className={styles.limiter}>
        <div className={styles.head}>
          <h1>{title}</h1>
          <p>{description}</p>
          <FormattedDate locale={locale}>{date}</FormattedDate>
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
