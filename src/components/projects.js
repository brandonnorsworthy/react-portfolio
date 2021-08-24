import React, { useState } from 'react'
const data = require('../assets/json/projects.json');


function Projects() {
    console.log('data',data)

    function createProjectCards() {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            console.log(`Name: ${obj}`);
        }
    }

    return (
        <section className="projects" id="projects">
            <div>
                <h1>onther section</h1>
            </div>
            <div>
                {createProjectCards()}
            </div>
        </section>
    )
}

export default Projects
