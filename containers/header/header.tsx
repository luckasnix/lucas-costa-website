import Link from 'next/link'
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.limiter}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>
              <h1>Lucas Dev</h1>
            </a>
          </Link>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href='/blog'>
                <a>Blog</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.localeSwitcher}></div>
      </div>
    </header>
  )
}
