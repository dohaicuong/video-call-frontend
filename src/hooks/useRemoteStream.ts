import React from 'react'

const useRemoteStream = (peerConnection: RTCPeerConnection | null) => {
  const [remoteStream, setRemoteStream] = React.useState<MediaStream | null>(null)
  React.useEffect(() => {
    const remoteStreamHandler = (e: RTCTrackEvent) => {
      setRemoteStream(e.streams[0])
    }
    if(peerConnection) {
      peerConnection.addEventListener('track', remoteStreamHandler)

      return () => {
        peerConnection.removeEventListener('track', remoteStreamHandler)
      }
    }
  }, [peerConnection])

  return remoteStream
}
export default useRemoteStream