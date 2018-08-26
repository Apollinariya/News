export const ADD_NEWS_REQUEST = 'ADD_NEWS_REQUEST'
export const ADD_NEWS_RECEIVE = 'ADD_NEWS_RECEIVE'

export const UPDATE_NEWS_REQUEST = 'UPDATE_NEWS_REQUEST'
export const UPDATE_NEWS_RECEIVE = 'UPDATE_NEWS_RECEIVE'

export const DELETE_NEWS_REQUEST = 'DELETE_NEWS_REQUEST'
export const DELETE_NEWS_RECEIVE = 'DELETE_NEWS_RECEIVE'

export const GET_ALL_NEWS_REQUEST = 'GET_ALL_NEWS_REQUEST'
export const GET_ALL_NEWS_RECEIVE = 'GET_ALL_NEWS_RECEIVE'

const getAllNewsRequest = () => ({
  type: GET_ALL_NEWS_REQUEST
})

const getAllNewsReceive = news => ({
  type: GET_ALL_NEWS_RECEIVE,
  news
})

export const getAllNews = () => async (dispatch) => {
  dispatch(getAllNewsRequest())

  const response = await fetch('/api/News/GetAllNews', {
    method: 'GET'
  })
  const news = await response.json()

  dispatch(getAllNewsReceive(news))
}


const addNewsRequest = () => ({
  type: ADD_NEWS_REQUEST
})

const addNewsReceive = feed => ({
  type: ADD_NEWS_RECEIVE,
  feed
})

export const addNews = text => async (dispatch, getState) => {
  dispatch(addNewsRequest())

  const user = getState().user
  const response = await fetch('/api/News/AddNews', {
    body: JSON.stringify({ text }),
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + user.token,
    },
    method: 'POST'
  })
  const id = await response.json()
  const feed = {
    id,
    text,
    user
  }

  dispatch(addNewsReceive(feed))
}


const updateNewsRequest = () => ({
  type: UPDATE_NEWS_REQUEST
})

const updateNewsReceive = (id, text) => ({
  type: UPDATE_NEWS_RECEIVE,
  id,
  text
})

export const updateNews = (text, newsId) => async (dispatch, getState) => {
  dispatch(updateNewsRequest())

  const user = getState().user
  const response = await fetch('/api/News/UpdateNews', {
    body: JSON.stringify({ text, newsId }),
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + user.token,
    },
    method: 'POST'
  })

  dispatch(updateNewsReceive(newsId, text))
}


const deleteNewsRequest = () => ({
  type: DELETE_NEWS_REQUEST
})

const deleteNewsReceive = id => ({
  type: DELETE_NEWS_RECEIVE,
  id
})

export const deleteNews = (newsId) => async (dispatch, getState) => {
  dispatch(deleteNewsRequest())

  const user = getState().user
  const response = await fetch('/api/News/DeleteNews', {
    body: JSON.stringify({ newsId }),
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + user.token,
    },
    method: 'POST'
  })

  dispatch(deleteNewsReceive(newsId))
}