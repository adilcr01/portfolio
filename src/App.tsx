import { useTheme } from '@/hooks/useTheme';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Skills } from '@/sections/Skills';
import { Resume } from '@/sections/Resume';
import { Portfolio } from '@/sections/Portfolio';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { ChatWidget } from '@/components/ChatWidget';

import { Toaster } from 'sonner';

function App() {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <Skills />
        <Resume />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
      <Toaster position="bottom-right" theme={isDark ? 'dark' : 'light'} />
    </div>
  );
}

export default App;
