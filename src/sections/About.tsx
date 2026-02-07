import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { Code2, Users, Briefcase, Award } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: 3, suffix: '+', label: 'Years Experience' },
  { icon: Code2, value: 50, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 20, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 100, suffix: '%', label: 'Commitment' },
];

export function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Stats Cards */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  isVisible={isVisible}
                  delay={index * 120}
                />
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            {/* Section Label */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                About Me
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Passionate About Creating{' '}
              <span className="gradient-text">Impactful Solutions</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                With over 3 years of experience in software development, I specialize in 
                building robust backend systems and intuitive user interfaces. My journey 
                in tech has been driven by a passion for solving complex problems and 
                creating digital experiences that make a real difference.
              </p>
              <p
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                I believe in writing clean, maintainable code and staying up-to-date with 
                the latest technologies. Whether it's architecting scalable systems with 
                Django and FastAPI or crafting pixel-perfect interfaces with React, I bring 
                dedication and creativity to every project.
              </p>
            </div>

            {/* Key Highlights */}
            <div
              className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {['Python Expert', 'Django Specialist', 'API Design', 'Cloud Native'].map(
                (tag, i) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors cursor-default"
                    style={{
                      animation: isVisible
                        ? `scale-in 0.4s var(--ease-elastic) ${700 + i * 80}ms forwards`
                        : 'none',
                      opacity: 0,
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}

function StatCard({ icon: Icon, value, suffix, label, isVisible, delay }: StatCardProps) {
  const { count, ref } = useCountUp(value, 2000, false);

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        animation: isVisible ? `flip-in 0.7s var(--ease-expo-out) ${delay}ms forwards` : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl gradient-bg opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Value */}
      <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
        {isVisible ? count : 0}
        {suffix}
      </div>

      {/* Label */}
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
