import { ReactNode } from 'react'
import Header from '../header'

export interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
    </>
  )
}
