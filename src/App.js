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
        <footer>
          <a href="https://github.com/brandonnorsworthy/react-portfolio" target="_blank" rel="noreferrer" >Made with 🧠 Power by Brandon Norsworthy</a>
        </footer>
      </main>
    </div>
  );
}

export default App;
