import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import enUS from 'date-fns/locale/en-US'
import esES from 'date-fns/locale/es'
import t from '../../utils/translations'
import styles from './formatted-date.module.scss'

function getLocaleObj(locale: string) {
  switch (locale) {
    case 'en-US':
      return enUS
    case 'es-ES':
      return esES
    default:
      return ptBR
  }
}

export interface FormattedDateProps {
  locale: string
  children: string
}

export default function FormattedDate({ locale, children }: FormattedDateProps) {
  const date = parseISO(children)

  return (
    <time className={styles.component} dateTime={children}>
      {format(date, t[locale].formattedDate.format, { locale: getLocaleObj(locale) })}
    </time>
  )
}
