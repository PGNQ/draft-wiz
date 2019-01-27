import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import QuarterbackStats from './QuarterbackStats';
import RunningbackStats from './RunningbackStats';
import WideReceiverStats from './WideReceiverStats';

class Explore extends Component {

  state = {
    position: null,
  };

  onClick = (e) => {
   this.setState({ position: e.target.value });
  }

  render() {
    return (
      <div className="container content">
        <h6 className="text-center">Explore the Feedforward Regression neural network models used in this app. Select a position.</h6>
        <div className="row button-wrapper">
          <button type="button" className="btn btn-outline-primary btn-sm" value="qb" onClick={(e) => this.onClick(e)}>Quarterback</button>
          <button type="button" className="btn btn-outline-primary btn-sm" value="rb" onClick={(e) => this.onClick(e)}>Running Back</button>
          <button type="button" className="btn btn-outline-primary btn-sm" value="wr" onClick={(e) => this.onClick(e)}>Wide Receiver</button>
        </div>

        {this.state.position === 'qb' ? <QuarterbackStats /> : null}
        {this.state.position === 'rb' ? <RunningbackStats /> : null}
        {this.state.position === 'wr' ? <WideReceiverStats /> : null}
      </div>
    );
  }
}

export default withRouter(Explore);