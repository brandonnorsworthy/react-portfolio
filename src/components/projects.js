import React from 'react';
var projects = require('../assets/json/projects.json');

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../assets/projects/', false, /\.(png|jpe?g|svg)$/));

function Projects() {
    console.log('images', images)

    function createProjectCards() {
        for (var i = 0; i < projects.length; i++) {
            var obj = projects[i];
            console.log(`Name: ${obj} ${'../assets/projects/' + obj.name + '.png'}`);
            return (
                <div className="project">
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
                {projects.map(project => (
                    <div className="project">
                        <h1>{project.name}</h1>
                        <p>{project.description}</p>
                        <img src={images[0].default} alt="project demo screenshot"></img>
                        <a href={project.deployment} target="_blank" rel="noreferrer">Deployment</a>
                        <a href={project.repository} target="_blank" rel="noreferrer">Repository</a>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects
