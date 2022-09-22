import { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { useRouter } from 'next/router'
import { setAccessUser } from 'hooks/useUser'

const step = process.env.STEP || 'quiz'

export default function Scan() {
  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (data) {
      setAccessUser(data)
      router.push(`/${step}`)
    }
  }, [data])

  const handleReadQR = (result) => {
    if (result.length) {
      setData(JSON.parse(result.text))
    }
  }

  return (
    <section className='flex items-center justify-center h-full'>
      <div className='relative mx-auto' style={{ width: 700, height: 700 }}>
        <QrReader
          onResult={handleReadQR}
          constraints={{ facingMode: 'environment' }}
        />
      </div>
    </section>
  )
}
