import styles, { globalStsyles } from './styles'
import { useRouter } from 'next/router'

export default function AppLayout({ children }) {
  const getColors = () => {
    const router = useRouter()
    return router.pathname === '/' ? 'home' : router.pathname.split('/')[1]
  }

  const handleReload = (event) => {
    if (event.detail === 2) {
      location.reload()
    }
  }

  return (
    <>
      <button onClick={handleReload}></button>
      <main className={['layout', getColors()].join(' ')}>{children}</main>
      <style jsx>{`
        button {
          position: absolute;
          display: block;
          top: 0;
          right: 0;
          background: red;
          width: 100px;
          height: 100px;
          z-index: 999;
          opacity: 0;
        }
      `}</style>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStsyles}
      </style>
    </>
  )
}
