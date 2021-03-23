import { ReactNode } from 'react'
import Header from '../header'

export interface LayoutProps {
  locale: string
  children: ReactNode
}

export default function Layout({ locale, children }: LayoutProps) {
  return (
    <>
      <Header locale={locale}/>
      <main>
        {children}
      </main>
    </>
  )
}
