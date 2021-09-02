import React from 'react'

function Header() {
    return (
        <header>
            <div className="j-s">
                <span>Brandon Norsworthy</span>
            </div>
            <div id="extra-content">
                <a href="https://github.com/brandonnorsworthy/react-portfolio" target="_blank" rel="noreferrer" >GitHub</a>
                <a href="https://www.linkedin.com/in/brandonnorsworthy/" target="_blank" rel="noreferrer" >LinkedIn</a>
                <a href="/brandon_norsworthy_resume.pdf" target="_blank" rel="noreferrer" >Resume</a>
            </div>
            <div className="j-e">
                <a href="#landing">Home</a>
                <a href="#projects">Projects</a>
                <a href="#about">About</a>
            </div>
        </header>
    )
}

export default Header
