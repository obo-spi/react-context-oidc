import React from 'react'
import { AuthConsumer } from 'react-context-oidc'
import { Link } from 'react-router-dom'

const headerStyle = {
  display: 'flex',
  backgroundColor: '#26c6da',
  justifyContent: 'space-between',
  padding: 10
}

const linkStyle = {
  color: 'white',
  textDecoration: 'underline'
}

export default () => (
  <header>
    <AuthConsumer>
      {(props) => (
        <div style={headerStyle}>
          <h3>
            <Link style={linkStyle} to="/">
              HOME
            </Link>
          </h3>

          {props.oidcUser ? (
            <ul>
              <Link style={linkStyle} to="/dashboard">
                Dashboard
              </Link>
              <button onClick={props.logout}>logout</button>
            </ul>
          ) : (
            <button onClick={props.login}>login</button>
          )}
        </div>
      )}
    </AuthConsumer>
  </header>
)
