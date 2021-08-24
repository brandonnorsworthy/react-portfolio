import React, { useState } from 'react';
var data = require('../assets/json/projects.json');

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../assets/projects/', false, /\.(png|jpe?g|svg)$/));

function Projects() {
    console.log('images', images)

    function createProjectCards() {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            console.log(`Name: ${obj} ${'../assets/projects/' + obj.name + '.png'}`);
            return (
                <div class="project">
                    <h1>{obj.name}</h1>
                    <p>{obj.description}</p>
                    <img src={images[0].default} alt="project demo screenshot"></img>
                    <a href={obj.deployment} target="_blank" rel="noreferrer">Deployment</a>
                    <a href={obj.repository} target="_blank" rel="noreferrer">Repository</a>
                </div>
            );
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
