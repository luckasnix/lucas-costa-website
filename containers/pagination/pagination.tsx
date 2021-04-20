import Link from 'next/link'
import styles from './pagination.module.scss'

export interface PaginationProps {
  curPage: number
  numOfPages: number
}

export default function Pagination({ curPage, numOfPages }: PaginationProps) {
  const prevPage = curPage - 1
  const nextPage = curPage + 1

  return (
    <div className={styles.container}>
      <div className={styles.limiter}>
        {(prevPage > 0) && (
          <Link href={{
            pathname: '/blog',
            query: { page: prevPage }
          }}>
            <a className={styles.prevPage}>&larr; Anterior</a>
          </Link>
        )}
        <span className={styles.curPage}>{curPage}</span>
        {(nextPage <= numOfPages) && (
          <Link href={{
            pathname: '/blog',
            query: { page: nextPage }
          }}>
            <a className={styles.nextPage}>Próxima &rarr;</a>
          </Link>
        )}
      </div>
    </div>
  )
}
