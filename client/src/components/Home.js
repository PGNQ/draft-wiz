import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="container content">
        <h2>Predict</h2>
        <p>Create a college football player and enter the draft! Our neural network will predict your draft position based on your combine performance.</p><hr/>

        <h2>Explore</h2>
        <p>NFL combine performances from 1999 to 2015 were used to train our predictive model. Take a closer look at the data through our handy console.</p><hr/>

        <h2>About</h2>
        <p>Learn more about this project, the models and technologies used, and the developer.</p><hr/>
      </div>
    );
  }
}

export default withRouter(Home);