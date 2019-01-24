import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Quarterback from './quarterback';
import Runningback from './runningback';
import WideReceiver from './wideReceiver';

class Predict extends Component {

  state = {
    position: null,
  };

  onClick = (e) => {
   this.setState({ position: e.target.value });
  }

  render() {
    return (
      <div className="container content">
        <div className="row justify-content-around">
          <button type="button" className="btn btn-outline-primary btn-sm" value="qb" onClick={(e) => this.onClick(e)}>Quarterback</button>
          <button type="button" className="btn btn-outline-primary btn-sm" value="rb" onClick={(e) => this.onClick(e)}>Running Back</button>
          <button type="button" className="btn btn-outline-primary btn-sm" value="wr" onClick={(e) => this.onClick(e)}>Wide Receiver</button>
        </div>
        {this.state.position === 'qb' ? <Quarterback /> : null}
        {this.state.position === 'rb' ? <Runningback /> : null}
        {this.state.position === 'wr' ? <WideReceiver /> : null}
      </div>
      
    );
  }
}

export default withRouter(Predict);