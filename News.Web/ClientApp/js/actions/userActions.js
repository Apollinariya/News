export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_RECEIVE = 'SIGN_IN_RECEIVE'

const signInRequest = googleToken => ({
  type: SIGN_IN_REQUEST,
  googleToken
})

const signInReceive = user => ({
  type: SIGN_IN_RECEIVE,
  user
})

export const signIn = googleToken => async (dispatch) => {
  dispatch(signInRequest(googleToken))

  const response = await fetch('api/Auth/SignIn', {
    body: JSON.stringify({ googleToken }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
  const user = await response.json()

  dispatch(signInReceive(user))
}
