import { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default PageLayout
