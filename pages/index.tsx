import { GetStaticProps } from 'next'
import Layout from '../containers/layout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale
    }
  }
}

export interface HomeProps {
  locale: string
}

export default function Home({ locale }: HomeProps) {
  return (
    <Layout locale={locale}>
      <h2>Página "home"</h2>
    </Layout>
  )
}
