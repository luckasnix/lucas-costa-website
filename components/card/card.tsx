import Link from 'next/link'
import FormattedDate from '../formatted-date'
import styles from './card.module.scss'

export interface CardProps {
  slug: string
  coverImageUrl: string
  date: string
  title: string
  description: string
}

export default function Card({ slug, coverImageUrl, date, title, description }: CardProps) {
  return (
    <div className={styles.component}>
      <div className={styles.thumbnail}>
        <img src={coverImageUrl} alt={title}/>
      </div>
      <div className={styles.body}>
        <FormattedDate>{date}</FormattedDate>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href={`/blog/${slug}`}>
          <button>Ler mais</button>
        </Link>
      </div>
    </div>
  )
}
