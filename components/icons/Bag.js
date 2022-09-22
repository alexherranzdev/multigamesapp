export default function Bag({ fill, ...props }) {
  return (
    <svg
      width={236}
      height={219}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill={fill}
        d='M192.781 39.899h-40.7a48 48 0 0 0-94.6 0h-40.7a16 16 0 0 0-16 16v128a15.998 15.998 0 0 0 16 16h176a16 16 0 0 0 16-16v-128a15.998 15.998 0 0 0-16-16Zm-88-24a32.102 32.102 0 0 1 31 24h-62a32.1 32.1 0 0 1 31-24Zm88 168h-176v-128h40v24a8 8 0 0 0 16 0v-24h64v24a8 8 0 0 0 16 0v-24h40v128Z'
      />
    </svg>
  )
}
