import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Sajal Tech Solution Private Limited',
    location: 'Panna, Madhya Pradesh',
    period: 'Feb 2024 - Present',
    description: [
      'Designed and deployed scalable Django-based backend architectures using Celery, Celery Beat, Twilio, AWS EC2, WebSockets, Django Channels, and Daphne',
      'Engineered RESTful APIs to fetch and process live data from platforms such as YouTube and Instagram',
      'Integrated secure authentication mechanisms including Google OAuth, Facebook OAuth, 2FA, OTP validation, and email verification',
      'Optimized relational databases (PostgreSQL, MySQL) to improve query performance and scalability',
      'Established CI/CD pipelines using GitHub Actions to automate deployments',
      'Integrated AI capabilities using OpenAI and Anthropic Claude APIs for chatbots and content generation',
    ],
    highlights: ['Django', 'AWS', 'AI Integration', 'WebSockets'],
  },
  {
    role: 'Python Developer',
    company: 'Lepton Software',
    location: 'Gurugram, Haryana',
    period: 'June 2023 - Dec 2023',
    description: [
      'Delivered a FastAPI-powered data pipeline to track fuel prices from LiveMint with automated ingestion',
      'Created a Google Maps data extraction tool using Places API to collect ratings, reviews, and coordinates',
      'Engineered a desktop polling data extraction application using Tkinter and PyInstaller',
      'Built an OCR solution to extract multilingual voter information from PDFs with over 90% accuracy',
      'Performed geospatial data analysis using GeoPandas, Shapely, and Fiona',
    ],
    highlights: ['FastAPI', 'Data Pipeline', 'OCR', 'Geospatial'],
  },
  {
    role: 'Data Analyst',
    company: 'iNeuron',
    location: 'Remote',
    period: 'Jan 2022 - June 2023',
    description: [
      'Analyzed large datasets to identify trends and patterns, improving accuracy of analytical insights',
      'Presented insights using data visualization techniques and deployed multiple AI/ML solutions',
      'Identified and streamlined data collection pipelines for structured and unstructured datasets',
    ],
    highlights: ['Data Analysis', 'ML', 'Visualization'],
  },
];

export function Experience() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            My Journey
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transition-all duration-1000 ${
              isVisible ? 'scale-y-100' : 'scale-y-0'
            }`}
            style={{ transformOrigin: 'top', transitionDelay: '200ms' }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.company}
                experience={exp}
                index={index}
                isVisible={isVisible}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
  isVisible: boolean;
  isLeft: boolean;
}

function ExperienceCard({ experience, index, isVisible, isLeft }: ExperienceCardProps) {
  return (
    <div
      className={`relative grid md:grid-cols-2 gap-8 items-start transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        animation: isVisible
          ? `slide-up 0.7s var(--ease-expo-out) ${300 + index * 200}ms forwards`
          : 'none',
      }}
    >
      {/* Timeline Node */}
      <div
        className={`absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full gradient-bg border-4 border-background z-10 transition-all duration-500 ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}
        style={{ 
          transitionDelay: `${400 + index * 200}ms`,
          boxShadow: '0 0 20px hsl(var(--purple) / 0.5)',
        }}
      >
        <div className="absolute inset-0 rounded-full gradient-bg animate-ping opacity-30" />
      </div>

      {/* Content */}
      <div
        className={`pl-12 md:pl-0 ${
          isLeft ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'
        }`}
      >
        <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

          {/* Header */}
          <div className={`flex items-start gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div className={isLeft ? 'md:text-right' : ''}>
              <h3 className="text-xl font-bold">{experience.role}</h3>
              <p className="text-primary font-medium">{experience.company}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {experience.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {experience.location}
            </span>
          </div>

          {/* Description */}
          <ul className="space-y-2 mb-4">
            {experience.description.slice(0, 3).map((item, i) => (
              <li
                key={i}
                className={`flex items-start gap-2 text-sm text-muted-foreground ${
                  isLeft ? 'md:flex-row-reverse md:text-right' : ''
                }`}
              >
                <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Highlights */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {experience.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
