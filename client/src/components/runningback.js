import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import rbLogo from '../data/runningback.png';

class Runningback extends Component {

  state = {
    "input": {
       height: 70.8,
       weight: 214.4,
       forty: 4.53,
       twentyss: 4.23,
       threecone: 6.99,
       vertical: 35.10,
       broad: 118.87,
       bench: 20.43
    }, 
    "result": null,
    "url": "http://localhost:7000/api/predict/rb",
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
    $('.player').removeClass('active');
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

  loadKeanuNeal = () => {

    this.resetInputFont();
    var stats = {
       height: 72,
       weight: 211,
       forty: 4.62,
       twentyss: 4.38,
       threecone: 7.09,
       vertical: 38.0,
       broad: 132,
       bench: 17
    };
    var message = "Round 1, #17 overall by Falcons";
    this.setState({ input: stats, presetPlayer: true, message: message });
    $('.player').removeClass('active');
    $(`#keanu`).addClass('active');
 }

 loadNoahHerron = () => {

    this.resetInputFont();
    var stats = {
      height: 71,
      weight: 224,
      forty: 4.60,
      twentyss: 3.97,
      threecone: 6.95,
      vertical: 31.0,
      broad: 108,
      bench: 17
    };
    var message = "Round 7, #244 overall by Steelers";
    this.setState({ input: stats, presetPlayer: true, message: message });
    $('.player').removeClass('active');
    $(`#noah`).addClass('active');
 }

 loadKenyanDrake = () => {

    this.resetInputFont();
    var stats = {
       height: 73,
       weight: 210,
       forty: 4.45,
       twentyss: 4.21,
       threecone: 7.04,
       vertical: 34.5,
       broad: 123,
       bench: 10
    };
    var message = "Round 3, #73 overall by Dolphins";
    this.setState({ input: stats, presetPlayer: true, message: message });
    $('.player').removeClass('active');
    $(`#kenyan`).addClass('active');
 }

  render() {
    return (
      <div className="container content"> 
         <h6 className="text-center">Load existing player or create your own!</h6>
         <div className="row button-wrapper">
            <button id="keanu" value="keanu" type="button" className="btn btn-outline-primary btn-sm player" onClick={this.loadKeanuNeal} data-toggle="tooltip"  title="Round 1, Overall Pick 17 by Falcons">Keanu Neal</button>
            <button id="noah" value="noah" type="button" className="btn btn-outline-primary btn-sm player" onClick={this.loadNoahHerron} data-toggle="tooltip"  title="Round 7, Overall Pick 244 by Steelers">Noah Herron</button>
            <button id="kenyan" value="kenyan" type="button" className="btn btn-outline-primary btn-sm player" onClick={this.loadKenyanDrake} data-toggle="tooltip"  title="Round 3, Overall Pick 73 by Dolphins">Kenyan Drake</button>
         </div>     
         <img className="mx-auto d-block" src={rbLogo} alt="runningback"></img>
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

export default withRouter(Runningback);