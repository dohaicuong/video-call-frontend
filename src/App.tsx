import React from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import { useLazyLoadQuery, useFragment } from 'react-relay/hooks'

import { AppQuery } from './__generated__/AppQuery.graphql'
import { AppSessionFragment_session$key } from './__generated__/AppSessionFragment_session.graphql'

const App = () => {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($id: ID!) {
        room(id: $id) {
          id
          title
          sessions {
            id
            ...AppSessionFragment_session
          }
        }
      }
    `,
    { id: 'cka4rlken0000ogxa6saod52t' }
  )

  return (
    <div className='App'>
      Room: {data.room?.title}
      <ul>
        {data.room?.sessions?.map(session => (
          <li key={session.id}>
            <Session session={session} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App

export type SessionProps = {
  session: AppSessionFragment_session$key
}
const Session: React.FC<SessionProps> = (props) => {
  const data = useFragment(
    graphql`
      fragment AppSessionFragment_session on Session {
        id
        name
      }
    `,
    props.session
  )

  return (
    <>Session: {data.name}</>
  )
}