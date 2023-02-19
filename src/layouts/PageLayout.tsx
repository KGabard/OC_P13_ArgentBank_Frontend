import { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <section className="main-section">{children}</section>
      <Footer />
    </>
  )
}

export default PageLayout
