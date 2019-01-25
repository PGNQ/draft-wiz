import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class WideReceiver extends Component {

  state = {
    baseUrl: "http://localhost:7000/api/predict/wr",
  };

  render() {
    console.log(this.state);
    return (
      <div className="container content">
         <img className="mx-auto d-block" src="https://images-na.ssl-images-amazon.com/images/I/51GMVJ1zwEL._SX425_.jpg"  alt="wide receiver"></img>
         <div className="container input-container">
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Height (in)</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              placeholder='Ave: 73'/>
          </div>
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Weight (lbs)</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              placeholder='Ave: 200'/>
          </div>  
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">40-yard dash (sec)</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              placeholder='Ave: 4.5'/>
          </div>  
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">20-yard shuttle (sec)</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  
              placeholder='Ave: 4.2'/>
          </div>  
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">3 cone drill (sec)</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              placeholder='Ave: 6.9'/>
          </div>  
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Vertical jump (in)</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              placeholder='Ave: 36'/>
          </div>  
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Broad jump (in)</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              placeholder='Ave: 121'/>
          </div>   
          <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Bench press (reps)</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
              placeholder='Ave: 15'/>
          </div>   
          <div className='row justify-content-center'>
            <button type="button" className="btn btn-success">Predict!</button> 
          </div>  
         </div>
      </div>
    );
  }
}

export default withRouter(WideReceiver);