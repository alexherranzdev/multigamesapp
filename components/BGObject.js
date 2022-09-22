import { colors } from 'styles/theme'

export default function BGObject({
  status,
  hide = false,
  step,
  position = 'left',
  ...props
}) {
  return (
    <>
      <div
        className={`bg-object ${position} ${status ? 'active' : ''} ${
          hide ? 'hide' : ''
        }`}
        {...props}
      ></div>

      <style jsx>{`
        div {
          background: ${colors[step].primary};
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          transition: all 0.5s ease;
          z-index: 0;
        }

        .active {
          border-radius: 50%;
          width: 669px;
          height: 669px;
          left: -148px;
          bottom: -135px;
        }

        .hide {
          border-radius: 50%;
          width: 669px;
          height: 669px;
          left: -669px;
          bottom: -669px;
        }

        .right.active {
          transform: translateX(100%);
        }
      `}</style>
    </>
  )
}
