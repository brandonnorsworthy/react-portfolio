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
          <p>Made with 🧠 Power by <a href="https://github.com/brandonnorsworthy/react-portfolio" target="_blank" rel="noreferrer">Brandon Norsworthy</a></p>
        </footer>
      </main>
    </div>
  );
}

export default App;
