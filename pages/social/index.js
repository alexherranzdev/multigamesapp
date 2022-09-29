import { useState } from 'react'
import Landing from 'components/Landing'
import BGObject from 'components/BGObject'
import { useIdleTimer } from 'react-idle-timer'
import Result from 'components/Result'
import SocialFilter from 'components/SocialFilter'
import { uploadPhoto } from 'services/SocialService'
import QRCode from 'react-qr-code'
import { colors } from 'styles/theme'
import BigTick from 'components/icons/BigTick'

const step = 'social'
const filterImage = 'images/social-tipos.gif'
const marcoImage = 'images/social_marco.png'

export default function Quiz() {
  const [status, setStatus] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const [showQR, setShowQR] = useState(false)

  const handleChangeStatus = () => {
    setStatus(1)
  }

  const IDLE_TIMEOUT = 1000 * 60 * 5

  const onIdle = () => resetStep()

  useIdleTimer({
    onIdle,
    timeout: IDLE_TIMEOUT
  })

  const resetStep = () => {
    location.reload()
  }

  const handleShowResults = () => {
    setShowQR(false)
    setTimeout(() => {
      setUserImage(null)
      setStatus(false)
      setShowResults(true)
    }, 1000)
  }

  const onCapture = (image) => {
    uploadPhoto({
      id: Date.now(),
      image
    }).then((data) => {
      if (data.success) {
        setUserImage(data.image)
        setTimeout(() => setShowQR(true), 1000)
      }
    })
  }

  return (
    <>
      <BGObject status={status} hide={status} step={step}></BGObject>
      {status === 0 && (
        <Landing
          step={step}
          title='¿Qué tipo de asesor eres?'
          subtitle='Descúbrelo.'
          status={status}
          onClick={handleChangeStatus}
        />
      )}
      {status === 1 && !showResults && (
        <>
          <SocialFilter
            onCapture={onCapture}
            onReload={resetStep}
            filterImage={filterImage}
            marcoImage={marcoImage}
          />
          {userImage && (
            <section className={`${showQR ? 'active' : ''}`}>
              <figure className='transition-all duration-1000'>
                <QRCode value={userImage} size={420} />
                <figcaption className='relative'>
                  <p
                    className='absolute w-full text-4xl font-bold text-center'
                    style={{ top: -530 }}
                  >
                    ¡Descarga tu foto!
                  </p>
                  <button
                    className='absolute flex items-center justify-center -translate-x-1/2 rounded-full top-3 left-1/2'
                    onClick={handleShowResults}
                  >
                    <BigTick fill='#FFF' width={76} height={58} />
                  </button>
                </figcaption>
              </figure>
            </section>
          )}
        </>
      )}
      {showResults && (
        <Result step={step} title='Finalizado' onClick={resetStep} />
      )}
      <style jsx>{`
        section {
          backdrop-filter: blur(46px);
          background: ${colors.social.primary}40;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }

        figure {
          background: #fff;
          border-radius: 30px;
          display: inline-block;
          padding: 50px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 100%);
        }

        .active figure {
          transform: translate(-50%, -750px);
        }

        button {
          background: ${colors.social.primary};
          width: 149px;
          height: 147px;
          margin: 0 auto;
        }
      `}</style>
    </>
  )
}
