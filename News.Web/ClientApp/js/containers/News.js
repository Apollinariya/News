import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../styles/styles.css'
import userSelectors from '../selectors/userSelectors'
import { deleteNews } from '../actions/newsActions';

class News extends PureComponent {
  componentDidMount() {
  }

  deleteNews = event => {
    const { item: { id } } = this.props;
    this.props.deleteNews(id);
  }

  render() {
    const { item: { id, text, user: { email } }, isOwner } = this.props;

    return (
      <div className="news-container">
        <div className="news-header">
          <div className="news-user-name">
            {email}
          </div>
          <div hidden={!isOwner}>
            <button type="button" className="btn btn-light"><Link to={`/updatenews/${id}`} >Upd</Link></button>
            <button type="button" className="btn btn-light" onClick={this.deleteNews}>Del</button>
          </div>
        </div>
        <hr/>
        <div className="news-text">
          {text}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isOwner: userSelectors.isOwner(state, props.item.user.id)
})

const mapDispatchToProps = dispatch => ({
  deleteNews: id => dispatch(deleteNews(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
