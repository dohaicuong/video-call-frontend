import { HostCallSignallingSubscription } from './__generated__/HostCallSignallingSubscription.graphql'

import { ICE_SERVERS } from 'configs'

import React from 'react'

import { useParams } from 'react-router-dom'
import { useRelayEnvironment } from 'react-relay/hooks'
import { requestSubscription } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

import JoinRoomForm from './JoinRoomForm'
import VideoView from './VideoView'
import useLocalStream from 'hooks/useLocalStream'
import usePeerConnection from 'hooks/usePeerConnection'
import useRemoteStream from 'hooks/useRemoteStream'
import useHostSignalling from './useHostSignalling'

const HostCall = () => {
  const { roomId } = useParams()

  const localStream = useLocalStream({ video: true, audio: false })
  const peerConnection = usePeerConnection(localStream, { iceServers: ICE_SERVERS })
  const remoteStream = useRemoteStream(peerConnection)
  const { isSignallingDone, offer, iceCandidates } = useHostSignalling(peerConnection)
  const signallingData = useSignallingSubscribe(roomId)

  React.useEffect(() => {
    const start = async () => {
      if(signallingData && peerConnection) {
        const { sdpAnswer, iceCandidates } = signallingData
        peerConnection.setRemoteDescription(sdpAnswer)
        for(const candidate of iceCandidates) {
          await peerConnection.addIceCandidate(candidate)
        }
      }
    }
    start()
  }, [signallingData, peerConnection])

  const submit = () => {
    return { offer, iceCandidates }
  }

  const [sessionId, setSessionId] = React.useState<string | null>(null)
  const onJoined = (sessionId: string) => {
    setSessionId(sessionId)
  }

  return (
    <>
      {!sessionId && <JoinRoomForm disabled={!isSignallingDone} submit={submit} roomId={roomId} onJoined={onJoined} />}
      <VideoView peerConnection={peerConnection} localStream={localStream} remoteStream={remoteStream} />
    </>
  )
}
export default HostCall

const useSignallingSubscribe = (roomId: string) => {
  const environment = useRelayEnvironment()
  const [signallingData, setSignallingData] = React.useState<any>(null)
  React.useEffect(() => {
    const { dispose } = requestSubscription<HostCallSignallingSubscription>(environment, {
      subscription: graphql`
        subscription HostCallSignallingSubscription($roomId: ID!) {
          signalling(roomId: $roomId) {
            sdpAnswer
            iceCandidates
          }
        }
      `,
      variables: { roomId },
      onNext: res => {
        if(res?.signalling) setSignallingData(res.signalling)
      },
      onCompleted: () => {
        console.log('done')
      }
    })

    return dispose
  }, [environment, roomId])

  return signallingData
}