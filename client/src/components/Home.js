import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoIosStats } from 'react-icons/io';
import { GiArcheryTarget } from 'react-icons/gi';
import { FaInfoCircle } from 'react-icons/fa';

class Home extends Component {
  render() {
    return (
      <div className="container content">
        <h6 className='text-center'>Draft Wiz uses Machine Learning techniques to allow users to predict the draft position of a person based on their NFL combine results.  It uses a model trained on all of the players at the combine since 1999 to give an idea of where a future player will be drafted.</h6><hr />

        <h2><GiArcheryTarget /> Predict</h2>
        <p>Create a college football player and enter the draft! Our neural network will predict your draft position based on your combine performance.</p><hr/>

        <h2><IoIosStats /> Explore</h2>
        <p>NFL combine performances from 1999 to 2015 were used to train our predictive model. Take a closer look at the data through our handy console.</p><hr/>

        <h2><FaInfoCircle /> About</h2>
        <p>Learn more about this project, the models and technologies used, and the developer.</p><hr/>
      </div>
    );
  }
}

export default withRouter(Home);