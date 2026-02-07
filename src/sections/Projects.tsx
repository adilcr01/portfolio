import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard. Built with scalability and performance in mind.',
    image: '/project-1.jpg',
    tech: ['React', 'Django', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team workspaces, and progress tracking. Features drag-and-drop kanban boards.',
    image: '/project-2.jpg',
    tech: ['React', 'FastAPI', 'MongoDB', 'WebSockets'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'AI Content Generator',
    description: 'AI-powered content generation platform using OpenAI API for blog posts, social media, and marketing copy. Includes prompt templates and history.',
    image: '/project-3.jpg',
    tech: ['Python', 'OpenAI', 'React', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
];

export function Projects() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            My Work
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            Here are some of my recent projects that showcase my skills and expertise
            in building modern, scalable applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '800ms' }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-2 hover:bg-primary/5 transition-all duration-300 group"
          >
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isVisible: boolean;
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        animation: isVisible
          ? `slide-up 0.8s var(--ease-expo-out) ${200 + index * 150}ms forwards`
          : 'none',
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full gradient-bg text-white text-xs font-medium">
            Featured
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full gradient-bg text-white hover:scale-110 transition-transform duration-300 shadow-lg"
            aria-label="View live demo"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full gradient-bg text-white hover:scale-110 transition-transform duration-300 shadow-lg"
            aria-label="View source code"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
