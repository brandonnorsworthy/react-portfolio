import './App.css';
import Header from './components/header'
import Hero from './components/hero'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        {/* <div className="spacer hero-background-curves">
        </div> */}

        <section className="projects" id="projects">
          <h1>projects</h1>
        </section>
        <section>
          <h1>onther section</h1>
        </section>
      </main>
    </div>
  );
}

export default App;
