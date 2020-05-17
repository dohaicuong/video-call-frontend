import React from 'react'
import { TextField, Button, Paper, Container, Grid, LinearProgress, Typography, Divider } from '@material-ui/core'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { JoinRoomFormMutation } from './__generated__/JoinRoomFormMutation.graphql'
import { useSnackbar } from 'notistack'

export type JoinRoomFormProps = {
  title?: string
  
  isLoading?: boolean
  disabled?: boolean

  roomId: string
  submit: any
  onJoined: (sessionId: string, signallingData: { offer: string, iceCandidates: RTCIceCandidate[] }) => void
}
const JoinRoomForm: React.FC<JoinRoomFormProps> = ({ title, disabled, submit, roomId, onJoined }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [name, setName] = React.useState('')

  const [joinRoomMutation, isJoinning] = useMutation<JoinRoomFormMutation>(graphql`
    mutation JoinRoomFormMutation($input: RoomJoinInput!) {
      roomJoin(input: $input) {
        sdpOffer
        iceCandidates
        session { id }
      }
    }
  `)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const signallingData = submit()
    const signallingInput = signallingData && signallingData.offer
      ? {
        sdpOffer: signallingData.offer, 
        iceCandidates: signallingData.iceCandidates
      }
      : {}

    joinRoomMutation({
      variables: { input: {
        roomId,
        sessionName: name,
        ...signallingInput
      }},
      onCompleted: (res, errors) => {
        if(errors) return errors.forEach(error => {
          enqueueSnackbar(error.message, { variant: 'error' })
        })
        
        if(res.roomJoin?.session?.id) {
          const sessionId = res.roomJoin.session.id
          const offer = res.roomJoin.sdpOffer as string
          const iceCandidates = res.roomJoin.iceCandidates as RTCIceCandidate[]

          onJoined(sessionId, { offer, iceCandidates })
        }
      },
      onError: error => {
        console.log(`[NETWORK-ERROR]: ${error}`)
      }
    })
  }
  
  return (
    <Container maxWidth='sm' style={{ position: 'relative', zIndex: 4 }}>
      <form onSubmit={onSubmit}>
        <Paper>
          {isJoinning && <LinearProgress />}
          {title && (
            <div style={{ padding: 16 }}>
              <Typography variant='h5'>
                {title}
              </Typography>
              <Divider style={{ marginTop: 8 }} />
            </div>
          )}
          <Grid container spacing={4} style={{ padding: 24 }}>
            <Grid item xs={12}>
              <TextField name='name' label='Your name' value={name} onChange={e => setName(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' color='primary' type='submit' disabled={disabled}>
                Go
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Container>
  )
}
export default JoinRoomForm