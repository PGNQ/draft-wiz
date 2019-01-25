import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class Quarterback extends Component {

  state = {
      "input": {
         height: 75.2,
         weight: 224.0,
         forty: 4.81,
         twentyss: 4.30,
         threecone: 7.13,
         vertical: 31.66,
         broad: 110.67
      }, 
      "result": null,
      "url": "http://localhost:7000/api/predict/qb",
      "presetPlayer": false,
      "message": ''
   };

   resetInputFont = () => {
      // User changed inputs sytling is reset
      $(":input").css({
         "color": "black",
         "font-weight": "normal"
      })
      // Prevents the results of a previous prediction from staying on the screen
      this.setState({ result: null });
   }

   onInputChange = (target) => {
      var input = {...this.state.input}
      input[target.id] = parseFloat(target.value) || '';
      this.setState({ input });
      target.style.color = 'darkblue';
      target.style['font-weight'] = 'bold';
      this.setState({ presetPlayer: false });
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
              this.setState({ result: response });
            })
            .catch(() => console.log('Server error has occurred.'));
      } else {
         alert('Please fill out all input boxes.')
      }
   }

   loadTomBrady = () => {

      this.resetInputFont();
      var stats = {
         height: 76,
         weight: 211,
         forty: 5.24,
         twentyss: 4.38,
         threecone: 7.20,
         vertical: 24.5,
         broad: 99
      };
      var message = "Round 6, #199 overall by Patriots";
      this.setState({ input: stats, presetPlayer: true, message: message });
   }

   loadDrewBrees = () => {

      this.resetInputFont();
      var stats = {
         height: 74,
         weight: 213,
         forty: 4.83,
         twentyss: 4.21,
         threecone: 7.09,
         vertical: 32,
         broad: 105
      };
      var message = "Round 2, #32 overall by Chargers";
      this.setState({ input: stats, presetPlayer: true, message: message });
   }

   loadCamNewton = () => {

      this.resetInputFont();
      var stats = {
         height: 77,
         weight: 248,
         forty: 4.6,
         twentyss: 4.18,
         threecone: 6.92,
         vertical: 35,
         broad: 126
      };
      var message = "Round 1, #1 overall by Panthers";
      this.setState({ input: stats, presetPlayer: true, message: message });
   }

  render() {
    return (
      <div className="container content">
         <h6 className="text-center">Load existing player or create your own!</h6>
         <div className="row justify-content-around button-wrapper">
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.loadTomBrady} data-toggle="tooltip"  title="Round 6, Overall Pick 199 by Patriots">Tom Brady</button>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.loadDrewBrees} data-toggle="tooltip"  title="Round 2, Overall Pick 32 by Chargers">Drew Brees</button>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.loadCamNewton} data-toggle="tooltip"  title="Round 1, Overall Pick 1 by Panthers">Cam Newton</button>
         </div>
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
            {
               this.state.presetPlayer ? (
               <p className='results'>Actual: {this.state.message}</p>) : null
            }
            {
               this.state.result ? (
               <p className='results'>Predicted: Round {this.state.result.round}, #{Math.round(this.state.result.pick)} overall</p>) : null
            }
         </div> 
      </div>
    );
  }
}

export default withRouter(Quarterback);