import { ThemeProvider } from './components/theme-provider';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { StackSection } from './components/StackSection';
import { ProjectSection } from './components/ProjectSection';
import { MovieSection } from './components/MovieSection';
import { SongSection } from './components/SongSection';
import { GameSection } from './components/GameSection';
import { ComicSection } from './components/ComicSection';
import { ContributorSection } from './components/ContributorSection';
import { FooterSection } from './components/FooterSection';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dami-theme">
      <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0 selection:bg-blue-500/30">
        
        {/* Dekorasi Background Glow */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]"></div>
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-500/10 blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-pink-500/10 blur-[120px]"></div>
        </div>

        <Navigation />
        
        <main>
          <HeroSection />
          <AboutSection />
          <StackSection />
          <ContributorSection />
          <ProjectSection />
          <MovieSection />
          <SongSection />
          <GameSection />
          <ComicSection />
        </main>

        <FooterSection />
      </div>
      <Analytics />
    </ThemeProvider>
  )
}

export default App
