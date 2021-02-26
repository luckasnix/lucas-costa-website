import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './formatted-date.module.scss'

export interface FormattedDateProps {
  children: string
}

export default function FormattedDate({ children }: FormattedDateProps) {
  const date = parseISO(children)

  return (
    <time className={styles.component} dateTime={children}>
      {format(date, `d 'de' MMMM 'de' yyyy`, { locale: ptBR })}
    </time>
  )
}
