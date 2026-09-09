export interface ProjectState {
  projectType: string;
  projectTypeTitle: string;
  budget: number;
  budgetString: string;
  timeline: string;
  timelineTitle: string;
  features: string[];
  projectDescription: string;
  companyName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredCallDate: string;
  preferredCallTime: string;
  selectedPlan?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'Startups' | 'SaaS' | 'E-commerce' | 'Creativo' | 'Servicios' | 'Salud & Belleza' | 'Gastronomía & Local';
  metric: string;
  metricLabel: string;
  tag?: string;
  image: string;
  gallery: string[];
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  duration: string;
  url?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Proceso' | 'Precios' | 'Tecnología' | 'Conversión' | 'Google & SEO';
}
