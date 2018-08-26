import createReducer from '../services/createReducer'
import {
  GET_ALL_NEWS_RECEIVE,
  ADD_NEWS_RECEIVE,
  UPDATE_NEWS_RECEIVE,  DELETE_NEWS_RECEIVE
} from '../actions/newsActions'

const initialState = {
  news: []
}
export default createReducer(initialState, {
  [GET_ALL_NEWS_RECEIVE]: (state, { news }) => ({
    ...state,
    news
  }),
  [ADD_NEWS_RECEIVE]: ({ news }, { feed }) => ({
    news: [
      ...news,
      feed
    ]
  }),
  [UPDATE_NEWS_RECEIVE]: ({ news }, { id, text }) => ({
    news: news.map(u => u.id === id ? { ...u, text } : u)
  }),
  [DELETE_NEWS_RECEIVE]: ({ news }, { id }) => ({
    news: news.filter(u => u.id !== id)
  })
})
