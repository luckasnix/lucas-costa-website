import Link from 'next/link'
import FormattedDate from '../formatted-date'
import t from '../../utils/translations'
import styles from './card.module.scss'

export interface CardProps {
  locale: string
  slug: string
  coverImageUrl: string
  date: string
  title: string
  description: string
}

export default function Card({ locale, slug, coverImageUrl, date, title, description }: CardProps) {
  return (
    <div className={styles.component}>
      <div className={styles.thumbnail}>
        <img src={coverImageUrl} alt={title}/>
      </div>
      <div className={styles.body}>
        <FormattedDate locale={locale}>{date}</FormattedDate>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href={`/blog/${slug}`}>
          <button>{t[locale].card.buttonText}</button>
        </Link>
      </div>
    </div>
  )
}
