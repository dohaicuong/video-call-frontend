import React from 'react'
import { TextField, Button, Grid, Container, Typography, Divider, Paper, LinearProgress } from '@material-ui/core'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { HomeRoomCreateMutation } from './__generated__/HomeRoomCreateMutation.graphql'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const { enqueueSnackbar } = useSnackbar()

  const history = useHistory()
  const [createRoomMutation, onSubmitting] = useMutation<HomeRoomCreateMutation>(graphql`
    mutation HomeRoomCreateMutation($input: RoomCreateInput!) {
      roomCreate(input: $input) {
        id
      }
    }
  `)
  
  const [title, setTitle] = React.useState('')
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title)

    createRoomMutation({
      variables: { input: { title }},
      onCompleted: res => {
        if(!res.roomCreate?.id) {
          return enqueueSnackbar('Something went wrong, please try again')
        }
        
        history.push(`/room/${res.roomCreate.id}?type=host`)
      }
    })
  }

  return (
    <Container className='Home' maxWidth='sm' style={{ marginTop: 40 }}>
      <Paper>
        {onSubmitting && <LinearProgress style={{ borderRadius: '4px 4px 0 0' }} />}
        <Typography variant='h5' style={{ padding: 16 }}>
          Create video call room
        </Typography>
        <Divider style={{ marginTop: 8 }} />
        <form onSubmit={onSubmit} style={{ padding: 32 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                name='title'
                label='Title'
                required
                fullWidth
                value={title} onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='primary' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
export default Home