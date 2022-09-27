import Correct from './icons/Correct'
import { colors } from 'styles/theme'

export default function Result({ step, title, ...props }) {
  return (
    <>
      <div
        className={`result transition duration-700 justify-center`}
        {...props}
      >
        <div className='result__content'>
          <header className='flex justify-center transition-all'>
            <a href=''>
              <img src='./images/logo-foroasesores.png' alt='Foroasesores' />
            </a>
            <a href=''>
              <img src='./images/logo-wolterskluwer.png' alt='Wolters Kluwer' />
            </a>
          </header>
          <div className='pt-48 transition-all content'>
            <Correct
              fill={colors.white}
              width={597}
              height={597}
              circle={true}
            />
            <p className='font-bold leading-tight text-center mt-36 text-7xl'>
              ¡Muchas gracias por tu participación!
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .result {
          display: flex;
          height: 100%;
          padding-top: 164px;
          padding-bottom: 284px;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .result__content {
          display: flex;
          flex-direction: column;
          height: 100%;
          z-index: 1;
        }

        .content {
          align-items: center;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          margin: 0 auto;
          max-width: 90%;
        }

        footer {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
