import createReducer from '../services/createReducer'
import {
  SIGN_IN_RECEIVE
} from '../actions/userActions'

const initialState = {
  id: null,
  email: null,
  token: null
}
export default createReducer(initialState, {
  [SIGN_IN_RECEIVE]: (state, { user }) => ({
    ...user
  })
})
