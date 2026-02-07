import { useInView } from '@/hooks/useInView';
import { Heart, ArrowUp } from 'lucide-react';


export function Footer() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={sectionRef}
      className="relative py-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p
            className={`text-sm text-muted-foreground transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transitionDelay: '600ms' }}
          >
            © {new Date().getFullYear()} Adil Anwar. All rights reserved.
          </p>

          {/* Made with love */}
          <p
            className={`text-sm text-muted-foreground flex items-center gap-1 transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transitionDelay: '700ms' }}
          >
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> and code
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full gradient-bg text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-background flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </footer>
  );
}
