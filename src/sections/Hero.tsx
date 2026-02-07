import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Code2, Database, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

const floatingBadges = [
  { icon: Code2, label: 'Python', color: 'from-yellow-500 to-yellow-600', position: 'top-0 -left-4' },
  { icon: Server, label: 'Django', color: 'from-green-500 to-green-600', position: 'top-1/4 -right-8' },
  { icon: Database, label: 'PostgreSQL', color: 'from-blue-500 to-blue-600', position: 'bottom-1/4 -left-8' },
];

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Greeting */}
            <div
              className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for work
              </span>
            </div>

            {/* Name */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block gradient-text animate-shimmer bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto] mt-2">
                Adil Anwar
              </span>
            </h1>

            {/* Role */}
            <div
              className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-card border border-border shadow-sm mb-6">
                <Code2 className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">Backend Developer</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-lg font-semibold text-secondary">Python Expert</span>
              </div>
            </div>

            {/* Description */}
            <p
              className={`text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '600ms' }}
            >
              I'm an experienced software engineer specializing in building scalable
              backend architectures, cloud-native solutions, and AI-driven applications
              that solve real-world problems.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '800ms' }}
            >
              <Button
                size="lg"
                className="gradient-bg text-white hover:opacity-90 transition-all duration-300 hover:-translate-y-1 glow-primary group"
                onClick={() => scrollToSection('#portfolio')}
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1"
                onClick={() => scrollToSection('#contact')}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div
              className={`flex gap-4 justify-center lg:justify-start transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '1000ms' }}
            >
              {[
                { icon: Github, href: 'https://github.com/adilcr01', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/anwar-adil/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:adilalpha2@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{
                    animation: isLoaded ? `scale-in 0.5s ease-out ${1200 + index * 100}ms forwards` : 'none',
                    opacity: 0,
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div
            className={`relative order-1 lg:order-2 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative max-w-sm mx-auto lg:max-w-md">
              {/* Rotating Gradient Ring */}
              <div className="absolute inset-0 -m-4">
                <div className="absolute inset-0 rounded-full gradient-bg-full opacity-30 animate-spin-slow"
                  style={{
                    background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
                    filter: 'blur(8px)',
                  }}
                />
              </div>

              {/* Second Ring */}
              <div
                className="absolute inset-0 -m-8 rounded-full border-2 border-dashed border-primary/20 animate-spin-reverse"
              />

              {/* Image Container */}
              <div className="relative rounded-full overflow-hidden shadow-2xl aspect-square">
                <img
                  src="/hero-profile.jpg"
                  alt="Adil Anwar"
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>

              {/* Floating Badges */}
              {floatingBadges.map((badge, index) => (
                <div
                  key={badge.label}
                  className={`absolute ${badge.position} hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl glass shadow-lg transition-all duration-500 hover:scale-110`}
                  style={{
                    animation: `float ${6 + index}s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                    <badge.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}

              {/* Stats Badge */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-4 shadow-xl"
                style={{ animation: 'float 7s ease-in-out infinite reverse' }}
              >
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold gradient-text">4+</p>
                    <p className="text-xs text-muted-foreground">Years</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-bold gradient-text">30+</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ transitionDelay: '1400ms' }}
      >
        <button
          onClick={() => scrollToSection('#skills')}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll to skills section"
        >
          <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
