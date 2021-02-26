import FormattedDate from '../formatted-date'
import styles from './card.module.scss'

export interface CardProps {
  coverImageUrl: string
  date: string
  title: string
  description: string
}

export default function Card({ coverImageUrl, date, title, description }: CardProps) {
  return (
    <div className={styles.component}>
      <div className={styles.thumbnail}>
        <img src={coverImageUrl} alt={title}/>
      </div>
      <div className={styles.body}>
        <FormattedDate>{date}</FormattedDate>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
