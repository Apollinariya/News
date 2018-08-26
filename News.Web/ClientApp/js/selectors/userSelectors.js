import { createSelector } from 'reselect'

const getUser = state => state.user

const userLoggedIn = createSelector(
  getUser,
  user => user.token !== null
)

const isOwner = createSelector(
  getUser,
  (_, userId) => userId,
  (user, userId) => user.id === userId
)

export default {
  userLoggedIn,
  isOwner
}
