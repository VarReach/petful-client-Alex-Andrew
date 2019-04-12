import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './routes/HomePage';
import AdoptPage from './routes/AdoptPage';
import RegisterPage from './routes/RegisterPage';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <main className='App__main'>
          {/* <Switch> */}
              <Route
                exact
                path='/'
                component={HomePage}
              />
              <Route
                path='/register'
                component={RegisterPage}
              />
              {/* <Route
                path='/adopt'
                component={AdoptPage}
              />
              <Route
                component={NotFoundPage}
              /> */}
          {/* </Switch> */}
        </main>
      </div>
    )
  }
}

export default App;
