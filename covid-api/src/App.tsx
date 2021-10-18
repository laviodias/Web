import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import logo from './assets/Logo.svg'
import Form from './components/Form/Form'
import Result from './components/Result/Result'

const link = () => {
  const country = localStorage.getItem('country')
  const status = localStorage.getItem('status')
  return `/results?country=${country}&status=${status}`
}

const handleReturn = () => {
  localStorage.clear()
  window.location.reload()
}

function App() {
  return (
    <Router>
      <Switch>
        <section className="body">
          <img onClick={handleReturn} src={logo} id="logo" alt="Logo" />
          <div className="container">
            <section>
              {localStorage.getItem('country') === null ? (
                <Redirect to="/index" />
              ) : (
                <Redirect to={link()} />
              )}
              <Route path="/results">
                <Result />
              </Route>
              <Route path="/index">
                <Form />
              </Route>
            </section>
          </div>
        </section>
      </Switch>
    </Router>
  )
}

export default App
