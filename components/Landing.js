import Touch from './icons/Touch'
import { colors } from 'styles/theme'

export default function Landing({
  step,
  title,
  subtitle,
  status = 0,
  ...props
}) {
  return (
    <>
      <div className={`landing ${status ? 'active' : ''}`} {...props}>
        <div className='landing__content'>
          <header className='flex justify-center transition-all'>
            <a href=''>
              <img src='./images/logo-foroasesores.png' alt='Foroasesores' />
            </a>
            <a href=''>
              <img src='./images/logo-wolterskluwer.png' alt='Wolters Kluwer' />
            </a>
          </header>
          <div className='transition-all content'>
            <h1 className='font-bold text-center text-9xl'>{title}</h1>
            {subtitle && (
              <h2 className='mt-8 font-bold text-center text-7xl'>
                {subtitle}
              </h2>
            )}
          </div>
          <footer className='transition-all'>
            <Touch
              stroke={status ? colors[step].primary : colors.white}
              className='animate-waving-hand'
            />
            <p className='mt-8 text-5xl'>Toca la pantalla para empezar</p>
          </footer>
        </div>
      </div>
      <style jsx>{`
        .landing {
          display: flex;
          height: 100%;
          padding: 164px 40px 284px 40px;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: ${colors.white};
        }

        .landing__content {
          display: flex;
          flex-direction: column;
          height: 100%;
          z-index: 1;
        }

        .landing.active {
          color: ${colors[step].primary};
        }

        .landing.active svg {
          fill: ${colors[step].primary};
        }

        .landing.active header {
          transform: translateY(-500%);
        }

        .landing.active .content,
        .landing.active footer {
          transform: translateY(500%);
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
