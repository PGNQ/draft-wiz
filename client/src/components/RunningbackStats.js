import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import { rbData } from '../data/History/rbHistory';
import { rbStatsNormalized } from '../data/Stats/rbStatsNormalized.js';

const rbLossChart = {
  labels: rbData.epoch,
  xAxisID: "Epoch",
  datasets: [
    {
      label: 'Training MAE',
      fill: false,
      backgroundColor: 'rgb(44, 165, 236)',
      borderColor: 'rgb(44, 165, 236)',
      pointBorderColor: 'rgb(44, 165, 236)',
      pointBackgroundColor: 'rgb(44, 165, 236)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: rbData.history.mae
    },
    {
      label: 'Validation MAE',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgb(255, 196, 35)',
      borderColor: 'rgb(255, 196, 35)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgb(255, 196, 35)',
      pointBackgroundColor: 'rgb(255, 196, 35)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgb(255, 196, 35)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: rbData.history.val_mae
    }
  ],
};

const lossOptions = {
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
  },
  tooltips: {
    callbacks: {
        label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            return label;
        }
    }
  }
};

const rbStatsChart = {
  labels: ['Scatter'],
  datasets: [
    {
      label: '0-Height, 1-Weight, 2-Forty, 3-TwentySS, 4-ThreeCone, 5-Vertical, 6-Broad, 7-Bench',
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: rbStatsNormalized,
    }
  ]
};

class RunningbackStats extends Component {

  render() {
    return (
      <div className="container content">

       <h2>Runningback Model</h2>
       <p>Number of layers: 3</p>
       <p>Features trained: 8</p>
       <p>Number of nodes in the hidden layer: 9</p>
       <div id="rbLossChart" className="chart-container">
         <Line data={rbLossChart} options={lossOptions}/>
       </div>

       <h2>Runningback Data</h2>
       <p>Training sample size: 222</p>
       <p>Validation sample size: 10</p>
       <p>Normalization used: Min-Max (0 to 1)</p>

       <div id="rbStatsChart" className="chart-container">
          <Scatter data={rbStatsChart} options={{legend:{position: "bottom"}}}/>
       </div>
       
      </div>
    );
  }
}

export default RunningbackStats;