import React from 'react'
import useQuerystring from 'hooks/useQuerystring'

const HostCall = React.lazy(() => import('./HostCall'))
const GuestCall = React.lazy(() => import('./GuestCall'))

const Room = () => {
  const { type } = useQuerystring()

  return (
    <div className='Room'>
      <React.Suspense fallback='Loading...'>
        {type === 'host' ? <HostCall /> : <GuestCall />}
      </React.Suspense>
    </div>
  )
}
export default Room