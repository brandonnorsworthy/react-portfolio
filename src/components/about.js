import React from 'react'
import zipline from '../assets/pictures/zipline.png'
import linkedin from '../assets/icons/linkedin.png'
import github from '../assets/icons/github.png'

function About() {
    return (
        <section className="about" id="about">
            <div className="spacer">
                <svg id="visual" preserveAspectRatio="none" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <path d="M0 64L18.8 69C37.7 74 75.3 84 112.8 85.2C150.3 86.3 187.7 78.7 225.2 83.3C262.7 88 300.3 105 337.8 101.5C375.3 98 412.7 74 450.2 75.2C487.7 76.3 525.3 102.7 562.8 109.8C600.3 117 637.7 105 675.2 96.2C712.7 87.3 750.3 81.7 787.8 82.5C825.3 83.3 862.7 90.7 881.3 94.3L900 98L900 0L881.3 0C862.7 0 825.3 0 787.8 0C750.3 0 712.7 0 675.2 0C637.7 0 600.3 0 562.8 0C525.3 0 487.7 0 450.2 0C412.7 0 375.3 0 337.8 0C300.3 0 262.7 0 225.2 0C187.7 0 150.3 0 112.8 0C75.3 0 37.7 0 18.8 0L0 0Z" fill="#18939a"></path>
                </svg>
            </div>
            <div className="about-content">
                <div id="about-header">
                    <img id="profile" src={zipline} alt="me ziplining during lonestar leadership college retreat"></img>
                    <h1>Brandon Norsworthy</h1>
                </div>
                <p>Hello, I am Brandon. I am a Web Developer</p>
                <p>Being a Full Stack developer, everyday, I refine my skills from sketching out front-end design to building the database schema. Before going to the University of Texas, I studied Computer Science at the University of Houston, gaining a deeper level in understanding low level programming. During the time I spent at the University of Texas obtaining my Certificate for Full Stack Web Development, I worked on many projects even outside the required coursework, still maintaining the ability to stay on track.  I also developed skills in Front End and Backend using React, NodeJS, MySQL and MongoDB. I am motivated to continue learning anything and everything within the scope of this career path. </p>
                <p>I am familiar with these technologies/languages: </p>
                <p>HTML, CSS, JavaScript, jQuery, Jest, AJAX, MySQL, Node.js, MongoDB, React, Python, C++, Java</p>
                <div className="information">
                    <a href="https://www.linkedin.com/in/brandonnorsworthy/" target="_blank" rel="noreferrer">
                        <img src={linkedin} alt="linkedin icon"></img>
                    </a>
                    <a href="https://github.com/brandonnorsworthy" target="_blank" rel="noreferrer">
                        <img src={github} alt="github icon"></img>
                    </a>
                    <a href="mailto:brandonknorsworthy@gmail.com" target="_blank" rel="noreferrer">
                        brandonknorsworthy@gmail.com
                    </a>
                    <a href="/brandon_norsworthy_resume.pdf" target="_blank" rel="noreferrer">
                        resume
                    </a>
                </div>
            </div>
        </section>
    )   
}

export default About
