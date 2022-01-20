import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import rootDataSwitcher from './components/hoc/rootContext/rootDataSwitcher'
import { routes } from './routes'
class App extends React.Component {

  render() {
    const { theme, setUpMode } = this.props
    const data = {
      theme: theme,
      setUpMode: setUpMode
    }

    return (
      <div className="App center" data-theme={theme}>

        <Router basename={'/'}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                render={props => {
                  let modifiedProps = {
                    ...props,
                    getValue: data
                  }
                  return <route.component {...modifiedProps} />
                }}
              />
            ))}
          </Switch>
        </Router>
      </div>
    )
  }
}

// PropTypes Validation
App.propTypes = {
  theme: PropTypes.string,
  setUpMode: PropTypes.string
}

export default rootDataSwitcher(App)
