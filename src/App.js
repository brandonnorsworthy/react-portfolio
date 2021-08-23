import './App.css';
import Header from './components/header'
import Hero from './components/hero'
import Projects from './components/projects'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <section className="projects" id="projects">
          <h1>projects</h1>
        </section>
        <Projects />
      </main>
    </div>
  );
}

export default App;
