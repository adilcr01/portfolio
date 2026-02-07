import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['All', 'AI / ML', 'Backend', 'Tools & Scrapers'];

const projects = [
  {
    title: 'Thyroid Risk Prediction',
    description: 'An ML application utilizing classification algorithms to predict thyroid disease risk with high accuracy. Deployed on Azure.',
    image: 'project-1.jpg',
    category: 'AI / ML',
    tech: ['Flask', 'Scikit-Learn', 'Azure'],
    liveUrl: import.meta.env.VITE_THYROID_PREDICTION_URL || '#',
    githubUrl: 'https://github.com/adilcr01/Thyroid-Disease-Prediction',
  },
  {
    title: 'Scalable E-Commerce Core',
    description: 'Designed a robust backend using Django & Celery to handle async tasks, real-time notifications, and high-load traffic.',
    image: 'project-2.jpg',
    category: 'Backend',
    tech: ['Django', 'Celery', 'Redis'],
    liveUrl: import.meta.env.VITE_GITHUB_PROFILE_URL || '#',
    githubUrl: 'https://github.com/adilcr01',
  },
  {
    title: 'Flight Price Prediction',
    description: 'Predictive analytics dashboard that forecasts flight prices based on historical data patterns and seasonal trends.',
    image: 'project-3.jpg',
    category: 'AI / ML',
    tech: ['Python', 'Pandas', 'Matplotlib'],
    liveUrl: import.meta.env.VITE_FLIGHT_PREDICTION_URL || '#',
    githubUrl: 'https://github.com/adilcr01/Flight-Price-Prediction',
  },
  {
    title: 'Google Maps Scraper',
    description: 'Automated tool utilizing Places API to extract business data, ratings, and reviews, exporting directly to PostgreSQL.',
    image: 'project-4.jpg',
    category: 'Tools & Scrapers',
    tech: ['Python', 'API', 'PostgreSQL'],
    liveUrl: import.meta.env.VITE_GITHUB_PROFILE_URL || '#',
    githubUrl: 'https://github.com/adilcr01',
  },
  {
    title: 'Live Chat Application',
    description: 'Real-time messaging platform built with Django Channels and WebSockets for instant communication and notifications.',
    image: 'project-5.jpg',
    category: 'Backend',
    tech: ['WebSockets', 'Django Channels'],
    liveUrl: import.meta.env.VITE_GITHUB_PROFILE_URL || '#',
    githubUrl: 'https://github.com/adilcr01',
  },
  {
    title: 'Agentic RAG Engine',
    description: 'A custom Retrieval-Augmented Generation system using Hugging Face Endpoints, FAISS vector search, and RapidOCR.',
    image: 'project-6.jpg',
    category: 'AI / ML',
    tech: ['Hugging Face', 'Gemma', 'FAISS', 'RapidOCR'],
    liveUrl: import.meta.env.VITE_RAG_ENGINE_URL || '#',
    githubUrl: 'https://github.com/adilcr01/RAG-Engine',
  },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
  });

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Portfolio
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            A showcase of my recent work in Artificial Intelligence, Backend Development,
            and Data Engineering.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '300ms' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? 'gradient-bg text-white shadow-lg'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View More */}
        <div
          className={`text-center mt-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '800ms' }}
        >
          <Button
            variant="default"
            size="lg"
            className="gradient-bg text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border-0"
            onClick={() => window.open('https://github.com/adilcr01', '_blank')}
          >
            View More on GitHub
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
  isInView: boolean;
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isInView ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        animation: isInView
          ? `slide-up 0.6s ease-out ${400 + index * 100}ms forwards`
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full gradient-bg text-white text-xs font-medium">
          {project.category}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl gradient-bg text-white hover:scale-110 transition-transform duration-300 shadow-lg"
            aria-label="View live demo"
          >
            <ExternalLink className="h-5 w-5" />
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
