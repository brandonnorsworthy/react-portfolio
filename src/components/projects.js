import React from 'react';
const projects = require('../assets/json/projects.json');

function importAll(images) {
    return images.keys().map(images);
}
const images = importAll(require.context('../assets/projects/', false, /\.(png|jpe?g|svg)$/));

function findImage(name) {
    for (let index = 0; index < images.length; index++) {
        if(images[index].default.match(/\/{1}[a-z-]+\./g)[0] === `/${name}.`){
            return index
        }
    }
    return 0
}

function Projects() {
    return (
        <section className="projects" id="projects">
            <div>
                <h1>Projects</h1>
            </div>
            <div className="projects-container">
                {projects.map(project => (
                    <div className="project" key={project.name} >
                        <h1>{project.name}</h1>
                        <img src={images[findImage(project.name)].default} alt="project demo screenshot"></img>
                        <p>{project.description}</p>
                        {project.deployment ? <a href={project.deployment} target="_blank" rel="noreferrer">Deployed</a> : <></>}
                        < a href={project.repository} target="_blank" rel="noreferrer" > Code</a>
                    </div>
                ))
                }
            </div >
        </section >
    )
}

export default Projects
