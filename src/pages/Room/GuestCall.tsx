import { GuestCallAnswerMutation } from './__generated__/GuestCallAnswerMutation.graphql'

import { ICE_SERVERS } from 'configs'

import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'

import JoinRoomForm from './JoinRoomForm'
import VideoView from './VideoView'

import useLocalStream from 'hooks/useLocalStream'
import usePeerConnection from 'hooks/usePeerConnection'
import useRemoteStream from 'hooks/useRemoteStream'
import useGuestSignalling from './useGuestSignalling'

const GuestCall = () => {
  const { roomId } = useParams()

  const localStream = useLocalStream({ video: true, audio: false })
  const peerConnection = usePeerConnection(localStream, { iceServers: ICE_SERVERS })
  const remoteStream = useRemoteStream(peerConnection)

  const submit = () => ({})
  const [sessionId, setSessionId] = React.useState<string | null>(null)
  const [signallingData, setSignallingData] = React.useState<any>(null)
  const onJoined = (sessionId: string, signallingData: any) => {
    setSessionId(sessionId)
    setSignallingData(signallingData)
  }
  
  const { signallingDone, answer, iceCandidates } = useGuestSignalling({ peerConnection, signallingData })
  const [answerMutation] = useMutation<GuestCallAnswerMutation>(graphql`
    mutation GuestCallAnswerMutation($input: AnswerSignallingInput!) { answerSignalling(input: $input) }
  `)
  React.useEffect(() => {
    if(roomId && sessionId && signallingDone && answer && iceCandidates) {
      answerMutation({
        variables: { input: { roomId, sessionId, sdpAnswer: answer, iceCandidates }},
        onCompleted: res => console.log(res)
      })
    }
  }, [roomId, sessionId, signallingDone, answer, iceCandidates, answerMutation])

  return (
    <>
      {!sessionId && <JoinRoomForm submit={submit} roomId={roomId} onJoined={onJoined} />}
      <VideoView peerConnection={peerConnection} localStream={localStream} remoteStream={remoteStream} />
    </>
  )
}
export default GuestCall