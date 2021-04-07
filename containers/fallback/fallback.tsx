import Loader from '../../components/loader'
import styles from './fallback.module.scss'

export default function Fallback() {
  return (
    <div className={styles.container}>
      <Loader/>
    </div>
  )
}
