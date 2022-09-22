export default function Podium({
  children,
  position,
  backgroundColor,
  height,
  pref,
  ...props
}) {
  return (
    <>
      <div
        className='flex flex-col items-center justify-center w-1/3 font-bold transition-all duration-500 h-fullcolor-white'
        style={{ backgroundColor, height }}
        ref={pref}
        {...props}
      >
        {children}
        <span className='mt-auto'>{position}</span>
      </div>
      <style jsx>{`
        div {
          border-top-left-radius: 33px;
          border-top-right-radius: 33px;
          font-size: 300px;
        }

        span {
          line-height: 215px;
        }
      `}</style>
    </>
  )
}
