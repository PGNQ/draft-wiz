import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Quarterback extends Component {

  state = {
      height: '',
      weight: '',
      forty: '',
      twentyss: '',
      threecone: '',
      vertical: '',
      broad: '',
   };

   onInputChange = (target) => {
      this.setState({[target.id]: parseFloat(target.value) || ''});
      console.log(target);
      target.style.color = 'darkblue';
      target.style['font-weight'] = 'bold';
   }

   handleSubmit = () => {
      var allNumbers = Object.values(this.state).reduce((isNumber, element) => {return isNumber && typeof element === 'number'}, true);
      if (allNumbers){
         console.log('API call')
      } else {
         alert('Please fill out all input boxes.')
      }
   }

  render() {
      const url = "http://localhost:7000/api/predict/qb";
    return (
      <div className="container content">
         <img className="mx-auto d-block" src="https://i.pinimg.com/originals/bb/a7/2f/bba72fb432a4f2050539818b0152bead.jpg"  alt="quarterback"></img> 
         <div className="container input-container">
            <p className="input-message">Please complete all fields with numbers</p>
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Height (in)</span>
               </div>
               <input 
                  id="height" type="number" step="any" className="form-control" 
                  value={this.state.height}
                  onChange={event => this.onInputChange(event.target)}
                  placeholder='Ave: 75'
               />
            </div>
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Weight (lbs)</span>
               </div>
               <input 
                  id="weight" type="number" step="any" className="form-control" 
                  value={this.state.weight}
                  onChange={event => this.onInputChange(event.target)}
                  placeholder='Ave: 224'
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">40-yard dash (sec)</span>
               </div>
               <input 
                  id="forty" type="number" step="any" className="form-control" 
                  value={this.state.forty}
                  onChange={event => this.onInputChange(event.target)}
                  placeholder='Ave: 4.8'
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">20-yard shuttle (sec)</span>
               </div>
               <input 
                  id="twentyss" type="number" step="any" className="form-control" 
                  value={this.state.twentyss}
                  onChange={event => this.onInputChange(event.target)}
                  placeholder='Ave: 4.3'
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">3 cone drill (sec)</span>
               </div>
               <input 
                  id="threecone" type="number" step="any" className="form-control" 
                  value={this.state.threecone}
                  onChange={event => this.onInputChange(event.target)}
                  placeholder='Ave: 7.1'
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Vertical jump (in)</span>
               </div>
               <input 
                  id="vertical" type="number" step="any" className="form-control" 
                  value={this.state.vertical}
                  onChange={event => this.onInputChange(event.target)}
                  placeholder='Ave: 32'
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Broad jump (in)</span>
               </div>
               <input 
                  id="broad" type="number" step="any" className="form-control" 
                  value={this.state.broad}
                  onChange={event => this.onInputChange(event.target)}
                  placeholder='Ave: 110'
               />
            </div>   
            <div className='row justify-content-center'>
               <button onClick={()=>this.handleSubmit()} type="button" className="btn btn-success">Predict!</button> 
            </div>  
         </div> 
      </div>
    );
  }
}

export default withRouter(Quarterback);