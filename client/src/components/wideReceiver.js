import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class WideReceiver extends Component {

  state = {
    "input": {
       height: 72.8,
       weight: 200.6,
       forty: 4.49,
       twentyss: 4.19,
       threecone: 6.90,
       vertical: 35.84,
       broad: 120.87,
       bench: 15.21
    }, 
    "result": null,
    "url": "http://localhost:7000/api/predict/wr",
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

  loadReggieBrown = () => {

    this.resetInputFont();
    var stats = {
      height: 74,
      weight: 196,
      forty: 4.45,
      twentyss: 3.94,
      threecone: 6.99,
      vertical: 41.5,
      broad: 128,
      bench: 15.21
    };
    var message = "Round 2, #35 overall by Eagles";
    this.setState({ input: stats, presetPlayer: true, message: message });
  }

  loadKevinNorwood = () => {

    this.resetInputFont();
    var stats = {
      height: 74,
      weight: 198,
      forty: 4.48,
      twentyss: 4.32,
      threecone: 6.68,
      vertical: 33.0,
      broad: 121,
      bench: 8
    };
    var message = "Round 4, #123 overall by Seahawks";
    this.setState({ input: stats, presetPlayer: true, message: message });
  }

  loadAntonioBrown = () => {

    this.resetInputFont();
    var stats = {
      height: 70,
      weight: 186,
      forty: 4.56,
      twentyss: 4.18,
      threecone: 6.98,
      vertical: 33.5,
      broad: 105,
      bench: 13
    };
    var message = "Round 6, #195 overall by Steelers";
    this.setState({ input: stats, presetPlayer: true, message: message });
  }

  render() {
    return (
      <div className="container content">
         <h6 className="text-center">Load existing player or create your own!</h6>
         <div className="row button-wrapper">
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.loadReggieBrown} data-toggle="tooltip"  title="Round 2, Overall Pick 35 by Eagles">Reggie Brown</button>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.loadKevinNorwood} data-toggle="tooltip"  title="Round 4, Overall Pick 123 by Seahawks">Kevin Norwood</button>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.loadAntonioBrown} data-toggle="tooltip"  title="Round 6, Overall Pick 195 by Steelers">Antonio Brown</button>
         </div> 
         <img className="mx-auto d-block" src="https://images-na.ssl-images-amazon.com/images/I/51GMVJ1zwEL._SX425_.jpg"  alt="wide receiver"></img>
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
            <div className="input-group input-group-sm mb-3">
               <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Bench Press (reps)</span>
               </div>
               <input 
                  id="bench" type="number" step="any" className="form-control" 
                  value={this.state.input.bench}
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

export default withRouter(WideReceiver);