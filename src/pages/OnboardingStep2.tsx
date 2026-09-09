import { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, Calendar, Target, MoreHorizontal, ArrowRight, ArrowLeft, X, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AgilwebLogo from '../components/AgilwebLogo';

export default function OnboardingStep2() {
  const { projectState, updateProjectState } = useApp();
  const navigate = useNavigate();

  const [budget, setBudget] = useState(projectState.budget || 1200);
  const [budgetLabel, setBudgetLabel] = useState('Flexible');
  const [timeline, setTimeline] = useState<string>(projectState.timeline || 'standard');

  const timelines = [
    { id: 'asap', icon: <Rocket size={20} />, title: 'Lanzamiento Exprés', desc: '1 a 2 semanas (Para empezar ya)' },
    { id: 'standard', icon: <Calendar size={20} />, title: 'Plan Estándar', desc: '2 a 3 Semanas (Recomendado)' },
    { id: 'strategic', icon: <Target size={20} />, title: 'E-commerce / Completo', desc: '3 a 4 Semanas (Todo incluido)' },
    { id: 'undefined', icon: <MoreHorizontal size={20} />, title: 'A Consultar', desc: 'Te asesoramos en la llamada' },
  ];

  const getBudgetString = (val: number) => {
    if (val < 600) return '< 600€';
    if (val >= 3000) return '3.000€+';
    return `${val}€ - ${val + 400}€`;
  };

  const handleNext = () => {
    const matchedTimeline = timelines.find(t => t.id === timeline);
    updateProjectState({
      budget,
      budgetString: getBudgetString(budget),
      timeline,
      timelineTitle: matchedTimeline ? `${matchedTimeline.title} (${matchedTimeline.desc})` : 'Estándar'
    });
    navigate('/onboarding/step3');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <div className="h-1 bg-white/5 w-full">
          <div className="h-full bg-primary shadow-glow transition-all duration-700 w-2/4" />
        </div>
        <div className="px-8 py-3 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-primary">
          <span>PASO 02 / 04 — INVERSIÓN Y PLAZOS</span>
          <span className="text-white/30">AGILWEB™ ONBOARDING</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-6 lg:px-12 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3">
          <AgilwebLogo size={32} />
          <span className="font-display font-black text-xl text-white tracking-tight">AGILWEB<span className="text-primary">.</span></span>
        </Link>
        <Link to="/" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors">
          <span className="text-xs font-mono font-bold uppercase tracking-widest hidden sm:inline">CERRAR</span>
          <div className="size-10 flex items-center justify-center rounded-full border border-white/10 group-hover:border-white/30 transition-all">
            <X size={18} />
          </div>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 lg:py-16">
        <div className="w-full max-w-6xl space-y-16">
          {/* Budget Section */}
          <div className="space-y-6">
            <div>
              <span className="text-primary font-mono font-bold tracking-[0.4em] uppercase text-xs mb-2 block">// PRESUPUESTO</span>
              <h2 className="font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.85] text-white font-display">
                ¿Cuál es tu rango<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/60">de inversión?</span>
              </h2>
            </div>
            
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">INVERSIÓN ESTIMADA</span>
                <div className="text-4xl sm:text-5xl font-black text-primary font-display">
                  {getBudgetString(budget)}
                </div>
              </div>
              
              <div className="py-4">
                <input
                  type="range"
                  min="490"
                  max="3500"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-3 text-xs font-mono text-white/40 uppercase tracking-widest">
                  <span>490€ (Landing Ágil)</span>
                  <span>1.290€ (Web Integral)</span>
                  <span>2.490€+ (Tienda Online)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2 font-mono">
                {['Presupuesto Ajustado', 'Flexible', 'Inversión para Crecimiento Rápido'].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setBudgetLabel(label)}
                    className={`px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      budgetLabel === label
                        ? 'border-primary text-[#070709] bg-primary font-black shadow-glow'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="space-y-6">
            <div>
              <span className="text-primary font-mono font-bold tracking-[0.4em] uppercase text-xs mb-2 block">// CALENDARIO</span>
              <h2 className="font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.85] text-white font-display">
                ¿Cuándo<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/60">Lanzamos?</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {timelines.map((t) => {
                const isSelected = timeline === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTimeline(t.id)}
                    className={`glass-panel group flex flex-col items-start p-6 rounded-3xl text-left min-h-[170px] relative overflow-hidden transition-all duration-300 ${
                      isSelected ? 'border-2 border-primary bg-primary/10 shadow-glow' : 'border-white/10 hover:border-primary/40'
                    }`}
                    data-cursor={isSelected ? 'Seleccionado' : 'Elegir'}
                  >
                    <div className="w-full flex items-center justify-between mb-auto">
                      <div className={`p-2.5 rounded-xl border transition-colors ${
                        isSelected ? 'bg-primary text-[#070709] border-primary' : 'bg-white/5 border-white/10 text-white/50 group-hover:text-primary'
                      }`}>
                        {t.icon}
                      </div>

                      <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? 'bg-primary border-primary text-[#070709]' : 'border-white/20 bg-white/5'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base font-bold text-white uppercase tracking-tight font-display">{t.title}</h3>
                      <p className="text-white/50 text-xs mt-1 font-light leading-relaxed">{t.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 p-6 lg:p-12 flex justify-between items-center z-50 backdrop-blur-md">
        <button
          onClick={() => navigate('/onboarding/step1')}
          className="text-white/40 hover:text-white font-mono font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          ANTERIOR
        </button>
        <button
          onClick={handleNext}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-mono font-black uppercase tracking-wider text-sm bg-primary text-[#070709] shadow-glow hover:bg-white transition-all transform hover:scale-102"
          data-cursor="Siguiente"
        >
          SIGUIENTE PASO
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
