import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProjectState, CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Onboarding State
  projectState: ProjectState;
  updateProjectState: (updates: Partial<ProjectState>) => void;
  resetProjectState: () => void;
  submitProject: () => Promise<string>;
  
  // Booking Modal
  isBookingOpen: boolean;
  openBooking: (prefillNote?: string) => void;
  closeBooking: () => void;
  
  // Case Study Modal
  activeCaseStudy: CaseStudy | null;
  openCaseStudy: (caseStudyId: string) => void;
  closeCaseStudy: () => void;
  
  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const defaultProjectState: ProjectState = {
  projectType: 'web',
  projectTypeTitle: 'Nuevo Sitio Web',
  budget: 20,
  budgetString: '20k€ - 25k€',
  timeline: 'standard',
  timelineTitle: 'Estándar (2-3 Meses)',
  features: ['UX Estratégico', 'Diseño Responsive', 'Optimización SEO'],
  projectDescription: '',
  companyName: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  preferredCallDate: '',
  preferredCallTime: '10:00 AM',
  selectedPlan: 'CRECIMIENTO'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Project state stored in localStorage
  const [projectState, setProjectState] = useState<ProjectState>(() => {
    try {
      const saved = localStorage.getItem('nexoweb_project_draft');
      return saved ? JSON.parse(saved) : defaultProjectState;
    } catch {
      return defaultProjectState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexoweb_project_draft', JSON.stringify(projectState));
    } catch (e) {
      console.error('Could not save to localStorage', e);
    }
  }, [projectState]);

  const updateProjectState = (updates: Partial<ProjectState>) => {
    setProjectState(prev => ({ ...prev, ...updates }));
  };

  const resetProjectState = () => {
    setProjectState(defaultProjectState);
    localStorage.removeItem('nexoweb_project_draft');
  };

  const submitProject = async (): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const projectId = 'NEXO-' + Math.floor(100000 + Math.random() * 900000);
    
    // Save to submitted projects
    try {
      const existing = JSON.parse(localStorage.getItem('nexoweb_submitted_projects') || '[]');
      existing.unshift({
        id: projectId,
        timestamp: new Date().toISOString(),
        ...projectState
      });
      localStorage.setItem('nexoweb_submitted_projects', JSON.stringify(existing));
    } catch (e) {
      console.error('Error saving submission', e);
    }

    showToast(`¡Proyecto ${projectId} registrado con éxito! Te hemos enviado un correo de confirmación.`, 'success');
    return projectId;
  };

  // Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = (prefillNote?: string) => {
    if (prefillNote) {
      updateProjectState({ projectDescription: prefillNote });
    }
    setIsBookingOpen(true);
  };
  const closeBooking = () => setIsBookingOpen(false);

  // Case Study Modal
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const openCaseStudy = (caseStudyId: string) => {
    const found = CASE_STUDIES.find(c => c.id === caseStudyId);
    if (found) setActiveCaseStudy(found);
  };
  const closeCaseStudy = () => setActiveCaseStudy(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };
  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        projectState,
        updateProjectState,
        resetProjectState,
        submitProject,
        isBookingOpen,
        openBooking,
        closeBooking,
        activeCaseStudy,
        openCaseStudy,
        closeCaseStudy,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
