import React from 'react'

const usePeerConnection = (
  localStream?: MediaStream | null,
  configuration: RTCConfiguration = {}
) => {
  const {
    bundlePolicy, iceCandidatePoolSize,
    iceTransportPolicy, peerIdentity,
    rtcpMuxPolicy,
    certificates,
    iceServers
  } = configuration

  const certificatesString = certificates ? JSON.stringify(certificates) : ''
  const iceServersString = iceServers ? JSON.stringify(iceServers) : ''

  const [peerConnection, setPeerConnection] = React.useState<RTCPeerConnection | null>(null)
  React.useEffect(() => {
    const start = async () => {
      const pc = new RTCPeerConnection({
        bundlePolicy, iceCandidatePoolSize, iceTransportPolicy, peerIdentity, rtcpMuxPolicy,
        
        certificates,
        iceServers,
      })
      setPeerConnection(pc)

      if(localStream) localStream.getTracks().forEach(track => pc.addTrack(track, localStream))

      return pc
    }
    const promise = start()

    return () => {
      promise.then(pc => {
        pc.close()
      })
    }
  // eslint-disable-next-line
  }, [setPeerConnection, localStream, bundlePolicy, iceCandidatePoolSize, iceTransportPolicy, peerIdentity, rtcpMuxPolicy, certificatesString, iceServersString])

  return peerConnection
}
export default usePeerConnection