import styles from './message.module.scss'

export interface MessageProps {
  title: string
  description: string
}

export default function Message({ title, description }: MessageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.limiter}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
