import React from 'react'

const useLocalStream = (constraints: MediaStreamConstraints = { video: true, audio: true }) => {
  const [localStream, setLocalStream] = React.useState<MediaStream | null>(null)
  const start = (constraints: MediaStreamConstraints) => {
    return navigator.mediaDevices.getUserMedia(constraints)
  }

  const { video, audio, peerIdentity } = constraints
  React.useEffect(() => {
    const promise = start({ video, audio, peerIdentity })
      .then(stream => {
        setLocalStream(stream)
        return stream
      })

    return () => {
      promise.then(stream => stream.getTracks().forEach(track => track.stop()))
    }
  }, [video, audio, peerIdentity])

  return localStream
}
export default useLocalStream