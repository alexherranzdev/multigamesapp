import styles, { globalStsyles } from './styles'
import { useRouter } from 'next/router'

export default function AppLayout({ children }) {
  const getColors = () => {
    const router = useRouter()
    return router.pathname === '/' ? 'home' : router.pathname.split('/')[1]
  }

  return (
    <>
      <main className={['layout', getColors()].join(' ')}>{children}</main>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStsyles}
      </style>
    </>
  )
}
