import { useInView } from '@/hooks/useInView';
import { Briefcase, Calendar, MapPin, ExternalLink, GraduationCap } from 'lucide-react';

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
    link: '#',
  },
  {
    role: 'Trainee Data Science',
    company: 'Lepton Software',
    location: 'Gurugram, Haryana',
    period: 'June 2023 - Dec 2023',
    description: [
      'Built a FastAPI system tracking fuel prices from Live Mint into PostgreSQL for trend analysis with automated daily updates via Cron Jobs',
      'Created a Google Maps Scraper App integrating Places API to generate map URLs and scrape ratings, reviews, addresses, phone numbers, and coordinates',
      'Engineered an India Polling Data Extraction App using Tkinter for GUI and PyInstaller for .exe conversion',
      'Developed an OCR Tool for extracting voter details from PDFs in multiple Indian languages with over 90% accuracy',
      'Worked on Geospatial Data Analysis using GeoPandas, Shapely, and Fiona',
    ],
    link: '#',
  },
  {
    role: 'Data Science',
    company: 'iNeuron',
    location: 'Remote',
    period: 'Jan 2022 - May 2023',
    description: [
      'Developed multiple Supervised & Unsupervised Machine Learning, Deep Learning Projects and Dashboards',
      'Identified valuable data sources and automated collection and pre-processed structured and unstructured data',
      'Presented information using data visualization techniques and deployed multiple AI/ML solutions',
      'Utilized GitHub, Python, NumPy, Pandas, Matplotlib, Seaborn, and Scikit-Learn',
    ],
    link: '#',
  },
  {
    role: 'Integrated B. Tech + M. Tech',
    company: 'Gautam Buddha University',
    location: 'Greater Noida, UP',
    period: '2015-2020',
    description: [
      'Major in Mechanical Engineering/ Design Engineering',
      'CGPA: 7.43/10',
      'Coursework included Advanced Mathematics, Design Optimization, and Engineering Mechanics',
    ],
    link: '#',
  },
];

export function Resume() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30 dark:bg-muted/10" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Experience
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            A results-oriented software engineer with 4+ years of experience building
            scalable backend architectures, cloud-native solutions, and AI-driven applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transition-all duration-1000 ${isInView ? 'scale-y-100' : 'scale-y-0'
              }`}
            style={{ transformOrigin: 'top', transitionDelay: '300ms' }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.company}
                experience={exp}
                index={index}
                isInView={isInView}
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
  isInView: boolean;
  isLeft: boolean;
}

function ExperienceCard({ experience, index, isInView, isLeft }: ExperienceCardProps) {
  return (
    <div
      className={`relative grid md:grid-cols-2 gap-8 items-start transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        animation: isInView
          ? `slide-up 0.7s ease-out ${400 + index * 200}ms forwards`
          : 'none',
      }}
    >
      {/* Timeline Node */}
      <div
        className={`absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full gradient-bg border-4 border-background z-10 transition-all duration-500 ${isInView ? 'scale-100' : 'scale-0'
          }`}
        style={{
          transitionDelay: `${500 + index * 200}ms`,
          boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
        }}
      >
        <div className="absolute inset-0 rounded-full gradient-bg animate-ping opacity-30" />
      </div>

      {/* Content */}
      <div
        className={`pl-12 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'
          }`}
      >
        <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                {experience.role.includes('B. Tech') ? (
                  <GraduationCap className="h-6 w-6 text-white" />
                ) : (
                  <Briefcase className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{experience.role}</h3>
                <p className="text-primary font-medium">{experience.company}</p>
              </div>
            </div>
            {/* <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="View company"
            >
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a> */}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
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
          <ul className="space-y-2">
            {experience.description.slice(0, 4).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
