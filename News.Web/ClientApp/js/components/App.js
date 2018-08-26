import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Home, Login, AddNews, PrivateRoute } from '../containers'

export default () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/addnews" component={AddNews} />
      <PrivateRoute path="/updatenews/:id" component={AddNews} />
    </div>
  </BrowserRouter>
)
