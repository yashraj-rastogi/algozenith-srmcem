import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Domains } from './components/Domains';
import { Events } from './components/Events';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { JoinForm } from './components/JoinForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="algozenith-app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Domains />
        <Events />
        <Roadmap />
        <Team />
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
