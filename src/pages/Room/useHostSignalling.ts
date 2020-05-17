import React from 'react'

const useSignalling = (peerConnection: RTCPeerConnection | null) => {
  const [offer, setOffer] = React.useState<RTCSessionDescriptionInit | null>(null)
  const [iceCandidates, setIceCandidates] = React.useState<(RTCIceCandidate | null)[]>([])
  const [isSignallingDone, setIsSignallingDone] = React.useState(false)
  React.useEffect(() => {
    const start = async () => {
      if(peerConnection) {
        peerConnection.addEventListener('icecandidate', e => {
          if(e.candidate) {
            setIceCandidates(pre => {
              return [...pre, e.candidate]
            })
          }
        })
        peerConnection.addEventListener('icegatheringstatechange', () => {
          if(peerConnection.iceGatheringState === 'complete') {
            setIsSignallingDone(true)
          }
        })
        const offer = await peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        })
        peerConnection.setLocalDescription(offer)
        setOffer(offer)
      }
    }
    start()
  }, [peerConnection])

  return { isSignallingDone, offer, iceCandidates }
}
export default useSignalling