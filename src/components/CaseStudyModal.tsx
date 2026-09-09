import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, CheckCircle, Clock, Layers, Quote, ArrowRight, Box } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function CaseStudyModal() {
  const { activeCaseStudy, closeCaseStudy, openBooking } = useApp();
  const navigate = useNavigate();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCaseStudy();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeCaseStudy]);

  if (!activeCaseStudy) return null;

  const handleStartSimilar = () => {
    closeCaseStudy();
    navigate('/onboarding/step1');
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[130] flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        data-lenis-prevent="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCaseStudy}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-5xl h-[88vh] sm:h-[90vh] max-h-[92vh] glass-panel border border-white/15 bg-[#0d0d12]/95 rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col my-auto"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex-shrink-0 z-30 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10 bg-[#0d0d12]/95 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[11px] font-mono font-bold uppercase tracking-wider rounded-full">
                {activeCaseStudy.category}
              </span>
              <span className="text-white/40 text-xs font-mono hidden sm:inline">
                {activeCaseStudy.client}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={closeCaseStudy}
                className="p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
                data-cursor="Cerrar"
                title="Cerrar (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div 
            className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-10 space-y-10 focus:outline-none"
            data-lenis-prevent="true"
          >
            {/* Title and Hero Banner */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4 font-display">
                {activeCaseStudy.title}
              </h2>
              <div className="flex flex-wrap gap-4 items-center text-sm text-white/60 mb-6 font-mono">
                <span className="flex items-center gap-1.5 text-primary font-bold">
                  <TrendingUp size={16} /> {activeCaseStudy.metric} {activeCaseStudy.metricLabel}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} /> Duración: {activeCaseStudy.duration}
                </span>
              </div>

              {/* Main image with high quality presentation */}
              <div className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-white/15 group shadow-2xl">
                <img
                  src={activeCaseStudy.image}
                  alt={activeCaseStudy.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs text-white/80 font-mono">
                    Diseño & Desarrollo por Agilweb
                  </div>
                  {activeCaseStudy.tag && (
                    <div className="bg-primary text-[#070709] font-mono font-black text-xs px-4 py-2 rounded-full shadow-glow">
                      {activeCaseStudy.tag}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/10">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" />
                  El Desafío
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">Fricción en Conversión y Escala</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  {activeCaseStudy.challenge}
                </p>
              </div>

              <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/10">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent" />
                  Nuestra Solución
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">Diseño Web Orientado a Conversión</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  {activeCaseStudy.solution}
                </p>
              </div>
            </div>

            {/* Key Results */}
            <div className="glass-panel p-8 rounded-2xl border-primary/20 bg-primary/5">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2 font-display">
                <TrendingUp className="text-primary" size={22} />
                Métricas Clave Obtenidas
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {activeCaseStudy.results.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-primary/20 text-primary mt-0.5">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-sm font-medium text-white/90 leading-snug font-mono">
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                <Layers size={14} />
                Stack Tecnológico Implementado
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {activeCaseStudy.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/90 text-xs font-mono hover:border-primary/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative">
              <Quote className="text-primary/20 absolute top-6 right-6" size={48} />
              <p className="text-base sm:text-lg italic text-white/90 font-light mb-6 relative z-10 leading-relaxed">
                "{activeCaseStudy.testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={activeCaseStudy.testimonial.avatar}
                  alt={activeCaseStudy.testimonial.author}
                  referrerPolicy="no-referrer"
                  className="size-12 rounded-full object-cover border border-primary/40"
                />
                <div>
                  <div className="text-sm font-bold text-white font-display">{activeCaseStudy.testimonial.author}</div>
                  <div className="text-xs text-white/50 font-mono">{activeCaseStudy.testimonial.role}</div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="text-lg font-bold text-white font-display">¿Listo para lograr métricas similares?</h4>
                <p className="text-xs text-white/50">Hagamos despegar las ventas de tu negocio hoy mismo.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto font-mono">
                <button
                  onClick={() => {
                    closeCaseStudy();
                    openBooking(`Interesado en resultados similares a ${activeCaseStudy.title}`);
                  }}
                  className="w-full sm:w-auto px-6 py-3 border border-white/20 hover:border-primary hover:text-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                  data-cursor="Agendar"
                >
                  Agendar Sesión
                </button>
                <button
                  onClick={handleStartSimilar}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-[#070709] text-xs font-black uppercase tracking-wider rounded-xl shadow-glow hover:bg-white transition-all transform hover:scale-102"
                  data-cursor="Comenzar"
                >
                  Iniciar Proyecto
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
