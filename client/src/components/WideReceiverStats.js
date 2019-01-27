import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { wrData } from '../data/History/wrHistory';

const wrChartData = {
  labels: wrData.epoch,
  xAxisID: "Epoch",
  datasets: [
    {
      label: 'Training MAE',
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: wrData.history.mae
    },
    {
      label: 'Validation MAE',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,122,19,1)',
      borderColor: 'rgba(75,122,19,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,122,19,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,122,19,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: wrData.history.val_mae
    }
  ],
};

const options = {
  animation: {
    duration: 0
  },
  scales:{
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Epochs (Iterations of Training)'
      },
      ticks: {
        maxTicksLimit: 15
      },
    }],
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Mean Absolute Error (Pick Total)'
      }
    }],
  }
};

class WideReceiverStats extends Component {

  render() {
    return (
      <div className="container content">

       <h2>Wide Receiver</h2>
       <p>Number of layers: 3</p>
       <p>Features trained: 8</p>
       <p>Number of nodes in the hidden layer: 6</p>
       <div id="wrChart" className="chart-container">
         <Line data={wrChartData} options={options}/>
       </div>
       
      </div>
    );
  }
}

export default WideReceiverStats;