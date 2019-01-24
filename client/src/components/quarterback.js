import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Quarterback extends Component {

  state = {
      height: null,
      weight: null,
      forty: null,
      twentyss: null,
      threecone: null,
      vertical: null,
      broad: null,
   };

  render() {
      const url = "http://localhost:7000/api/predict/qb";
    console.log(this.state);
    return (
      <div className="container content">
         <img className="mx-auto d-block" src="https://i.pinimg.com/originals/bb/a7/2f/bba72fb432a4f2050539818b0152bead.jpg"  alt="quarterback"></img>  
         <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
               <span className="input-group-text" id="inputGroup-sizing-sm">Height (in)</span>
            </div>
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
            placeholder='Ave: 75'/>
         </div>
         <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
               <span className="input-group-text" id="inputGroup-sizing-sm">Weight (lbs)</span>
            </div>
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
            placeholder='Ave: 224'/>
         </div>  
         <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
               <span className="input-group-text" id="inputGroup-sizing-sm">40-yard dash (sec)</span>
            </div>
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
             placeholder='Ave: 4.8'/>
         </div>  
         <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
               <span className="input-group-text" id="inputGroup-sizing-sm">20-yard shuttle (sec)</span>
            </div>
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  
            placeholder='Ave: 4.3'/>
         </div>  
         <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
               <span className="input-group-text" id="inputGroup-sizing-sm">3 cone drill (sec)</span>
            </div>
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
             placeholder='Ave: 7.1'/>
         </div>  
         <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
               <span className="input-group-text" id="inputGroup-sizing-sm">Vertical jump (in)</span>
            </div>
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
             placeholder='Ave: 32'/>
         </div>  
         <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
               <span className="input-group-text" id="inputGroup-sizing-sm">Broad jump (in)</span>
            </div>
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
             placeholder='Ave: 110'/>
         </div>   
         <button type="button" className="btn btn-success">Predict!</button>   
      </div>
    );
  }
}

export default withRouter(Quarterback);