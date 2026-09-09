import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Process from './pages/Process';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import OnboardingStep1 from './pages/OnboardingStep1';
import OnboardingStep2 from './pages/OnboardingStep2';
import OnboardingStep3 from './pages/OnboardingStep3';
import OnboardingStep4 from './pages/OnboardingStep4';
import OnboardingSuccess from './pages/OnboardingSuccess';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
            <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
            <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
            <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
            <Route path="/onboarding/success" element={<OnboardingSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}
