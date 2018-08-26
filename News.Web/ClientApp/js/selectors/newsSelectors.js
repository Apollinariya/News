import { createSelector } from 'reselect'

const getNews = state => state.news.news

const getNewsText = createSelector(
  getNews,
  (_, id) => id,
  (news, id) => {
    const feed = news.find(x => x.id == id)
    return feed ? feed.text : ''
  }
)

export default {
  getNewsText
}
