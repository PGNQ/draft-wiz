import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Predict from './Predict';
import Explore from './Explore';
import About from './About';

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/predict" component={Predict} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/about" component={About} />
         </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
