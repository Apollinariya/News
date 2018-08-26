import { createSelector } from 'reselect'

const getUser = state => state.user

const userLoggedIn = createSelector(
  getUser,
  user => user.token !== null
)

export default {
  userLoggedIn
}
