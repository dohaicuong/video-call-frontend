export const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' }
]

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://af67e483.ngrok.io/'
export const SUBSCRIPTION_ENDPOINT = process.env.REACT_APP_SUBSCRIPTION_ENDPOINT || 'wss://af67e483.ngrok.io/graphql'