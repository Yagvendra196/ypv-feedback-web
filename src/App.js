import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import rootDataSwitcher from './components/hoc/rootContext/rootDataSwitcher'
import Text from './Pages/Text/Text'
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

        <Router>
          <Switch>
          <Route exact={true} path="/Text" component={Text} />
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
