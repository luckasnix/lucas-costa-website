import Link from 'next/link'
import Image from 'next/image'
import BrazilFlag from '../../icons/brazil-flag'
import UsaFlag from '../../icons/usa-flag'
import SpainFlag from '../../icons/spain-flag'
import styles from './header.module.scss'

const localeOptions = [
  {
    code: 'pt-BR',
    icon: BrazilFlag
  },
  {
    code: 'en-US',
    icon: UsaFlag
  },
  {
    code: 'es-ES',
    icon: SpainFlag
  }
]

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.limiter}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>
              <Image src='/logo.svg' alt='Logo' width='125' height='50'/>
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
        <div className={styles.localeSwitcher}>
          <ul>
            {localeOptions.map(({ code, icon: Icon }) => (
              <li key={code}>
                <Icon/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
