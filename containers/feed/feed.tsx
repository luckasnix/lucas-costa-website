import { ReactNode } from 'react'
import styles from './feed.module.scss'

export interface FeedProps {
  children: ReactNode
}

export default function Feed({ children }: FeedProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.limiter}>
        {children}
      </ul>
    </div>
  )
}
