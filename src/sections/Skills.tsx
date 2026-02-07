import { useInView } from '@/hooks/useInView';
import {
  Code2,
  Database,
  Cloud,
  Terminal
} from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Programming & Frameworks',
    skills: ['Python', 'HTML-CSS', 'JavaScript', 'Django', 'Flask', 'React', 'Tailwind'],
    color: 'from-orange-500 to-red-500',
    delay: 0,
  },
  {
    icon: Database,
    title: 'Databases & APIs',
    skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Firebase', 'RESTful APIs', 'OpenAI', 'Claude AI', 'Celery', 'Twilio', 'Stripe', 'PayPal'],
    color: 'from-blue-500 to-indigo-500',
    delay: 150,
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Azure', 'GCP', 'Git', 'GitHub', 'GitHub Actions', 'Celery Beat', 'Docker', 'Kubernetes'],
    color: 'from-purple-500 to-pink-500',
    delay: 300,
  },
  {
    icon: Terminal,
    title: 'Tools & Libraries',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Selenium', 'BeautifulSoup', 'DRF', 'Requests', 'Jupyter', 'VSCode', 'Google Colab', 'Cursor', 'Antigravity'],
    color: 'from-emerald-500 to-green-500',
    delay: 450,
  },
];

export function Skills() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Expertise
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            Technologies and tools I work with to build scalable,
            efficient, and modern applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  category: typeof skillCategories[0];
  isInView: boolean;
  index: number;
}

function SkillCard({ category, isInView }: SkillCardProps) {
  const Icon = category.icon;

  return (
    <div
      className={`group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${isInView ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        animation: isInView
          ? `slide-up 0.6s ease-out ${category.delay}ms forwards`
          : 'none',
      }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="relative text-xl font-bold mb-4">{category.title}</h3>

      {/* Skills */}
      <div className="relative flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"
            style={{
              animation: isInView
                ? `scale-in 0.4s ease-out ${category.delay + 200 + skillIndex * 50}ms forwards`
                : 'none',
              opacity: 0,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
