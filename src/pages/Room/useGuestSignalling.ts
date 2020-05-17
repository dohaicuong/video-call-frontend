import React from 'react'

const useGuestSignalling = ({ peerConnection, signallingData }: { peerConnection: RTCPeerConnection | null, signallingData: any }) => {
  const [signallingDone, setSignallingDone] = React.useState(false)
  const [answer, setAnswer] = React.useState<RTCSessionDescriptionInit | null>(null)
  const [iceCandidates, setIceCandidates] = React.useState<(RTCIceCandidate | null)[]>([])
  React.useEffect(() => {
    const start = async () => {
      if(peerConnection && signallingData) {
        peerConnection.addEventListener('icecandidate', e => {
          if(e.candidate) setIceCandidates(pre => ([...pre, e.candidate]))
        })
        peerConnection.addEventListener('icegatheringstatechange', () => {
          if(peerConnection.iceGatheringState === 'complete') {
            setSignallingDone(true)
          }
        })

        const { offer, iceCandidates } = signallingData
  
        peerConnection.setRemoteDescription(offer)
        const answer = await peerConnection.createAnswer()
        setAnswer(answer)
        peerConnection.setLocalDescription(answer)

        for(const candidate of iceCandidates) {
          await peerConnection.addIceCandidate(candidate)
        }
      }
    }
    start()
  }, [peerConnection, signallingData])

  return { signallingDone, answer, iceCandidates }
}
export default useGuestSignalling