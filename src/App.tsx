import './index.css';
import Navbar from './components/Navbar';
import LaptopScroll from './components/LaptopScroll';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import About from './components/About';

import Certifications from './components/Certifications';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlurScrollSection from './components/blurScroll';
import ClickSpark from './components/clickclick';

function App() {
  return (
    <ClickSpark
      sparkColor="#6366f1"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      <Navbar />
      <main>
        <LaptopScroll />
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
          <About />
        </BlurScrollSection>

        <BlurScrollSection>
          <Certifications />
        </BlurScrollSection>
        <BlurScrollSection>
          <Gallery />
        </BlurScrollSection>
        <BlurScrollSection>
          <Contact />
        </BlurScrollSection>
      </main>
      <BlurScrollSection>
        <Footer />
      </BlurScrollSection>
    </ClickSpark>
  );
}

export default App;

