import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import userSelectors from '../selectors/userSelectors'

const RedirectNotLoggedIn = ({ component: Component, userLoggedIn, ...props }) => {
  return userLoggedIn
    ? <Component {...props} />
    : <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location }
      }}
    />
}

const mapStateToProps = state => ({
  userLoggedIn: userSelectors.userLoggedIn(state)
})

const ConnectedRedirectNotLoggedIn = connect(mapStateToProps)(RedirectNotLoggedIn)

export default class PrivateRoute extends Component {
  renderRoute = (props) => {
    const { component } = this.props

    return <ConnectedRedirectNotLoggedIn
      component={component}
      {...props}
    />
  }

  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route
        {...props}
        render={this.renderRoute}
      />
    )
  }
}
