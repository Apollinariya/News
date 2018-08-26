import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import News from './News'
import { getAllNews } from '../actions/newsActions';

class Home extends PureComponent {
  componentDidMount() {
    this.props.getAllNews();
  }

  render() {
    const news = this.props.news.news.map(x => <News item={x} key={x.id} />)

    return (
      <div className="container">
        <div style={{ marginBottom: '5px' }}>
          <button type="button" className="btn btn-light"><Link to="/addnews">Add</Link></button>
        </div>
        {news}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.news
})

const mapDispatchToProps = dispatch => ({
  getAllNews: () => dispatch(getAllNews())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
