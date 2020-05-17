import React from 'react'

const routes = [
  { exact: true, path: '/', component: React.lazy(() => import('pages/Home')) },
  { exact: true, path: '/room/:roomId', component: React.lazy(() => import('pages/Room')) },
]
export default routes