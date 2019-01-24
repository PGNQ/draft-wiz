import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import $ from 'jquery';

class NavBar extends Component {

   onClick = (e) => {
      if(e.target.id === 'home'){
         this.props.history.push(`/`); 
      } else {
         this.props.history.push(`/${e.target.id}`);
      }
   }

   componentDidMount() {
      var pathname = this.props.location.pathname.substring(1);
      $('.nav-link').removeClass('active');
      $(`#${pathname}`).addClass('active');
   }

   render() {
   return (
      <Fragment>
         <div className="container title-main">
            <h1 className="mx-auto text-outline">Draft Wiz</h1>
         </div>
         <div className="container menu">
            <ul className="nav nav-tabs">
               <li className="nav-item">
                  <a className="nav-link active" id="home"  data-toggle="tab" 
                  onClick={(e) => this.onClick(e)}><FaHome /></a>
               </li>
               <li className="nav-item">
                  <a className="nav-link" id="predict"  data-toggle="tab"
                  onClick={(e) => this.onClick(e)}>Predict</a>
               </li>
               <li className="nav-item">
                  <a className="nav-link" id="explore" data-toggle="tab"
                  onClick={(e) => this.onClick(e)}>Explore</a>
               </li>
               <li className="nav-item">
                  <a className="nav-link" id="about"data-toggle="tab"
                  onClick={(e) => this.onClick(e)}>About</a>
               </li>
            </ul>
         </div>
      </Fragment>
   )}
};

export default withRouter(NavBar);