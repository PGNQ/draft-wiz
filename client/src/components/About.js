import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <div className="container content">
        <h2>The Project</h2><hr/>
        <p>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p><hr/>

        <h2>The Models</h2><hr/>
        <p>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p><hr/>

        <h2>The Developer</h2><hr/>
        <p>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p><hr/>
      </div>
    );
  }
}

export default withRouter(About);