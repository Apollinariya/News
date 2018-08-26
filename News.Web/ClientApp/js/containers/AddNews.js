import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { addNews, updateNews } from '../actions/newsActions';
import { connect } from 'react-redux'
import newsSelectors from '../selectors/newsSelectors'

class AddNews extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      text: props.text
    }
  }

  handleChangeText = event => {
    const text = event.nativeEvent.target.value
    this.setState({ text })
  }

  addNews = event => {
    const { text } = this.state;
    const { id } = this.props.match.params;
    id ? this.props.updateNews(text, id) : this.props.addNews(text)
  }

  render() {
    const { text } = this.state

    return (
      <div className="add-news-container">
        <textarea value={text} onChange={this.handleChangeText} className="news-text" rows="3" />
        <div>
          <button type="button" className="btn btn-light" onClick={this.addNews}>Save</button>
          <button type="button" className="btn btn-light"><Link to="/">Cancel</Link></button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  text: newsSelectors.getNewsText(state, props.match.params.id)
})

const mapDispatchToProps = dispatch => ({
  addNews: text => dispatch(addNews(text)),
  updateNews: (text, newsId) => dispatch(updateNews(text, newsId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNews)

