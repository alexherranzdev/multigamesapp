import { colors } from 'styles/theme'
import Tick from './icons/Tick'

export default function NextButton({ ...props }) {
  const { title, disabled, visible, step, onClick } = props

  return (
    <>
      <button
        className={`flex items-center justify-center transition-all duration-700 ${
          !visible ? '!opacity-0' : ''
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        {title || 'Siguiente'}
        <Tick stroke={colors[step].primary} className='ml-3' />
      </button>
      <style jsx>{`
        button {
          text-transform: uppercase;
          font-size: 24px;
          background: ${colors[step].active};
          color: ${colors[step].primary};
          border-radius: 20px;
          padding: 5px 25px;
          margin-top: 44px;
          margin-left: auto;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
