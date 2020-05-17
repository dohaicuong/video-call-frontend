import React from 'react'
import { makeStyles, CircularProgress, Fab } from '@material-ui/core'
import CallEndIcon from '@material-ui/icons/CallEnd'
import { useHistory } from 'react-router-dom'

export type VideoViewProps = {
  localStream?: MediaStream | null
  remoteStream?: MediaStream | null
  peerConnection?: RTCPeerConnection | null
}
const VideoView: React.FC<VideoViewProps> = ({ localStream, remoteStream, peerConnection }) => {
  const classes = useStyles()
  const localVideoRef = React.useRef<HTMLVideoElement>(null)
  const remoteVideoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if(localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])
  React.useEffect(() => {
    if(remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    const handler = () => {
      if(peerConnection && peerConnection.iceConnectionState === 'connected') setIsLoading(false)
      if(peerConnection && peerConnection.iceConnectionState === 'disconnected') setIsLoading(true)
    }

    if(peerConnection) {
      peerConnection.addEventListener('iceconnectionstatechange', handler)

      return () => {
        peerConnection.removeEventListener('iceconnectionstatechange', handler)
      }
    }
  }, [peerConnection, setIsLoading])

  const history = useHistory()
  const handupBtnHandle = () => {
    history.push('/')
  }

  return (
    <div className={classes.root}>
      {isLoading && (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
      <video className={classes.localVideo} ref={localVideoRef} autoPlay playsInline />
      <video className={classes.remoteVideo} ref={remoteVideoRef} autoPlay playsInline />
      <div className={classes.actionBar}>
        <Fab color='secondary' onClick={handupBtnHandle}>
          <CallEndIcon />
        </Fab>
      </div>
    </div>
  )
}
export default VideoView

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loading: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideo: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    maxWidth: '15vmax'
  },
  remoteVideo: {
    background: theme.palette.grey['900'],
    height: '100%',
    width: '100%',
  },
  actionBar: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '3vmin',
    zIndex: 3,
    '& > button': {
      marginRight: '1rem'
    },
    '& > button:last-child': {
      marginRight: 0
    }
  },
}))