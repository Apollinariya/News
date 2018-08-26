import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { signIn } from '../actions/userActions'
import userSelectors from '../selectors/userSelectors'

class Login extends PureComponent {
  responseGoogle = googleUser => {
    var googleToken = googleUser.getAuthResponse().id_token
    this.props.signIn(googleToken)
  }

  render() {
    const { userLoggedIn, location } = this.props
    const { from } = location.state || { from: { pathname: "/" } }

    if (userLoggedIn) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <h2>Login</h2>
        <GoogleLogin
          clientId="378512731014-rj2r7hofv2rohgves89ev6e3ph54dtk1.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userLoggedIn: userSelectors.userLoggedIn(state)
})

const mapDispatchToProps = dispatch => ({
  signIn: googleToken => dispatch(signIn(googleToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
