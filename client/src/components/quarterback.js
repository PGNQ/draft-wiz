import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Quarterback extends Component {

  state = {
      "input": {
         height: 75,
         weight: 224,
         forty: 4.8,
         twentyss: 4.3,
         threecone: 7.1,
         vertical: 32,
         broad: 110
      }, 
      "result": null,
      "url": "http://localhost:7000/api/predictQB"
   };

   onInputChange = (target) => {
      var input = {...this.state.input}
      input[target.id] = parseFloat(target.value) || '';
      this.setState({ input });
      target.style.color = 'darkblue';
      target.style['font-weight'] = 'bold';
   }

   handleSubmit = () => {
      // Checking to see all input fields have a number in them
      var allNumbers = Object.values(this.state.input).reduce((isNumber, element) => {return isNumber && typeof element === 'number'}, true);

      if (allNumbers){
         fetch(this.state.url, {
            method: 'POST',
            body: JSON.stringify(this.state.input),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(response => {
              console.log(response)
              this.setState({ result: response });
            })
            .catch(() => console.log('Server error has occurred.'));
      } else {
         alert('Please fill out all input boxes.')
      }
   }

  render() {
    return (
      <div className="container content">
         <img className="mx-auto d-block" src="https://i.pinimg.com/originals/bb/a7/2f/bba72fb432a4f2050539818b0152bead.jpg"  alt="quarterback"></img> 
         <div className="container input-container">
            <p className="input-message">Please complete all fields with numbers only.</p>
            <p className="input-message">Fields preloaded with average values from 1999-2015.</p>
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Height (in)</span>
               </div>
               <input 
                  id="height" type="number" step="any" className="form-control" 
                  value={this.state.input.height}
                  onChange={event => this.onInputChange(event.target)}  
               />
            </div>
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Weight (lbs)</span>
               </div>
               <input 
                  id="weight" type="number" step="any" className="form-control" 
                  value={this.state.input.weight}
                  onChange={event => this.onInputChange(event.target)}
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">40-yard dash (sec)</span>
               </div>
               <input 
                  id="forty" type="number" step="any" className="form-control" 
                  value={this.state.input.forty}
                  onChange={event => this.onInputChange(event.target)}
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">20-yard shuttle (sec)</span>
               </div>
               <input 
                  id="twentyss" type="number" step="any" className="form-control" 
                  value={this.state.input.twentyss}
                  onChange={event => this.onInputChange(event.target)}
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">3 cone drill (sec)</span>
               </div>
               <input 
                  id="threecone" type="number" step="any" className="form-control" 
                  value={this.state.input.threecone}
                  onChange={event => this.onInputChange(event.target)}
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Vertical jump (in)</span>
               </div>
               <input 
                  id="vertical" type="number" step="any" className="form-control" 
                  value={this.state.input.vertical}
                  onChange={event => this.onInputChange(event.target)}
               />
            </div>  
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Broad jump (in)</span>
               </div>
               <input 
                  id="broad" type="number" step="any" className="form-control" 
                  value={this.state.input.broad}
                  onChange={event => this.onInputChange(event.target)}
               />
            </div>   
            <div className='row justify-content-center'>
               <button onClick={()=>this.handleSubmit()} type="button" className="btn btn-success">Predict!</button> 
            </div>  
            {this.state.result ? (
               <p className='results'>Predict: round <strong>{this.state.result.round}</strong>, #{Math.round(this.state.result.pick)} overall</p>
            ) : null}
         </div> 
      </div>
    );
  }
}

export default withRouter(Quarterback);