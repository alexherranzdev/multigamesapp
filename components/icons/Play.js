export default function Play({ fill, ...props }) {
  return (
    <svg
      width={97}
      height={97}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M24.25 16.168v64.667M80.833 48.5 24.25 80.835M80.833 48.5 24.25 16.168'
        stroke={fill}
        strokeWidth={6}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
