import './App.css';
import Header from './components/header'
import Hero from './components/hero'
import Projects from './components/projects'
import About from './components/about'


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
      </main>
    </div>
  );
}

export default App;
