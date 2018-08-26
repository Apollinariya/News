import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Home, Login, About, PrivateRoute } from '../containers'

export default () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/about" component={About} />
    </div>
  </BrowserRouter>
)
