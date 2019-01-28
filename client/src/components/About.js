import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { GoMarkGithub } from 'react-icons/go';
import { FaLinkedin } from 'react-icons/fa';

class About extends Component {
  render() {
    return (
      <div className="container content">
        <h2>The Project</h2>
        <p>"Draft Wiz" is a capstone individual project for a 3-month Software Engineering Fellowship in Durham, NC called <a href="https://www.projectshift.io" target="_blank" rel="noopener noreferrer">Project Shift</a>. The project was completed during the last week of the program. The following technologies were utilized: </p>
        <ul className="technology-list">
          <li>React</li>
          <li>jQuery</li>
          <li>Chart.js</li>
          <li>Bootstrap</li>
          <li>TensorFlow.js</li>
          <li>Node.js</li>
          <li>Express</li>
        </ul><hr/>

        <h2>The Developer</h2>
        <p>Hi! My name is <strong>Justin Poucher</strong>. After graduating with a degree in Physics from Mercer University in Macon, GA, I've had a variety of work experiences--from working in the military, to healthcare.<br /><br />I've recently found my passion in software development, and I am looking forward to joining a software team where I can continue to grow and pursue my passion of coding.<br/><br/>Find out more <a href='https://www.linkedin.com/in/justin-poucher-239240b2/' target='_blank' rel="noopener noreferrer">about me</a> <FaLinkedin />, and  <a href='https://github.com/PGNQ/draft-wiz' target='_blank' rel="noopener noreferrer">this project</a> <GoMarkGithub />.</p><hr/>
      </div>
    );
  }
}

export default withRouter(About);