import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import MysticalOverlay from './components/MysticalOverlay';
import ObsidianCursor from './components/ObsidianCursor';

// Import CSS files
import './styles/theme.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/responsive.css';

function App() {
  return (
    <div className="app">
      <ObsidianCursor />
      <MysticalOverlay />
      
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}

export default App;