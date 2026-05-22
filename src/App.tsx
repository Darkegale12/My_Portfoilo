import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import GitHubGrid from './components/GitHubGrid';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlurScrollSection from './components/blurScroll';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BlurScrollSection>
          <Skills />
        </BlurScrollSection>
        <BlurScrollSection>
          <Projects />
        </BlurScrollSection>
        <BlurScrollSection>
          <Experience />
        </BlurScrollSection>
        <BlurScrollSection>
          <GitHubGrid />
        </BlurScrollSection>
        <BlurScrollSection>
          <Certifications />
        </BlurScrollSection>
        <BlurScrollSection>
          <Contact />
        </BlurScrollSection>
      </main>
      <BlurScrollSection>
        <Footer />
      </BlurScrollSection>
    </>
  );
}

export default App;
