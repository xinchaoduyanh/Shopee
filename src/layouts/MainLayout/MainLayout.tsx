import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import TestDemo from 'src/components/TestDemo'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      {/* <TestDemo /> */}
      <Footer />
    </div>
  )
}
