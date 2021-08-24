import React from 'react';
const projects = require('../assets/json/projects.json');

function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('../assets/projects/', false, /\.(png|jpe?g|svg)$/));

function Projects() {
    // console.log('images', images)

    return (
        <section className="projects" id="projects">
            <div>
                <h1>Projects</h1>
            </div>
            <div className="projects-container">
                {projects.map(project => (
                    <div className="project">
                        <h1>{project.name}</h1>
                        <img src={images[0].default} alt="project demo screenshot"></img>
                        <p>{project.description}</p>
                        {project.deployment ? <a href={project.deployment} target="_blank" rel="noreferrer">Deployed</a> : <></>}
                        <a href={project.repository} target="_blank" rel="noreferrer">Code</a>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects
