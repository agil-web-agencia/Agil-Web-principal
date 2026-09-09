import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, TrendingUp, Cpu, Award } from 'lucide-react';
import { CASE_STUDIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import ThreeFloatingCard from '../components/ThreeFloatingCard';

export default function Portfolio() {
  const { openCaseStudy, openBooking } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const categories = ['Todos', 'Startups', 'SaaS', 'E-commerce', 'Creativo'];

  const filteredProjects = selectedCategory === 'Todos'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(p => p.category === selectedCategory);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, CASE_STUDIES.length));
  };

  return (
    <div className="relative">
      {/* Hero Header */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-4 sm:mb-6 max-w-full">
          <Sparkles size={14} className="shrink-0" />
          <span className="truncate">PORTAFOLIO AGILWEB™ // 3D & SISTEMAS</span>
        </div>

        <h1 className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-7xl lg:text-9xl font-black text-white uppercase tracking-tight mb-4 sm:mb-6 leading-[1.08] sm:leading-[0.95] lg:leading-[0.88] font-display break-words">
          PROYECTOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent">SELECCIONADOS.</span>
        </h1>

        <div className="h-1 w-20 sm:w-28 bg-primary mb-6 sm:mb-8 shadow-glow" />

        <p className="text-sm sm:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">
          Una colección curada de plataformas interactivas 3D, WebGL y sistemas de diseño concebidos para dominar el mercado digital.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="px-4 sm:px-8 pb-10 sticky top-[76px] z-40 bg-[#070709]/80 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const count = cat === 'Todos' ? CASE_STUDIES.length : CASE_STUDIES.filter(p => p.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(6);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-primary text-[#070709] border-primary font-black shadow-glow'
                      : 'border-white/10 text-white/60 hover:border-primary/50 hover:text-white bg-white/5'
                  }`}
                  data-cursor={cat}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isSelected ? 'bg-[#070709]/30 text-[#070709] font-bold' : 'bg-white/10 text-white/50'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-white/50 font-mono flex items-center gap-2">
            <Cpu size={14} className="text-primary" />
            <span>Mostrando {displayedProjects.length} de {filteredProjects.length} proyectos</span>
          </div>
        </div>
      </section>

      {/* Project Grid with 3D Tilt Cards */}
      <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence>
            {displayedProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ThreeFloatingCard
                  onClick={() => openCaseStudy(project.id)}
                  dataCursor="Ver 3D"
                  className="cursor-pointer h-full"
                >
                  <div className="relative aspect-[16/11] overflow-hidden rounded-t-3xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
                      <span className="px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 rounded-xl text-white/90 text-xs font-mono uppercase tracking-wider">
                        {project.category}
                      </span>

                      <div className="flex flex-col items-end gap-2">
                        {project.metric && (
                          <div className="bg-primary text-[#070709] text-xs font-black px-3.5 py-1.5 rounded-full shadow-glow flex items-center gap-1.5 font-mono">
                            <TrendingUp size={13} />
                            {project.metric} {project.metricLabel}
                          </div>
                        )}
                        {project.tag && (
                          <div className="text-white text-[11px] font-mono px-3 py-1 rounded-full backdrop-blur-md border border-white/20 bg-white/10">
                            {project.tag}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content Bar */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-primary font-mono text-xs tracking-widest uppercase mb-1 block">
                        {project.client}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 group-hover:text-primary transition-colors font-display">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map(tech => (
                          <span key={tech} className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <span className="flex items-center gap-1 text-primary text-xs font-mono font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        Explorar Caso <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </ThreeFloatingCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-10 py-4 border border-white/20 text-white rounded-xl hover:border-primary hover:text-primary transition-all duration-300 font-mono font-bold uppercase tracking-widest text-xs hover:shadow-glow bg-white/5"
              data-cursor="Cargar"
            >
              CARGAR MÁS PROYECTOS ({filteredProjects.length - visibleCount} RESTANTES)
            </button>
          </div>
        )}
      </section>

      {/* Bottom Conversion Banner */}
      <section className="px-4 sm:px-8 py-24 border-t border-white/10 text-center bg-white/[0.01]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            ¿Tienes en mente un proyecto desafiante?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Diseñamos arquitecturas 3D y sistemas a medida que superan expectativas estéticas y de conversión.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              to="/onboarding/step1"
              className="px-8 py-4 bg-primary text-[#070709] font-black rounded-xl text-xs font-mono uppercase tracking-widest shadow-glow hover:bg-white transition-all transform hover:scale-105"
              data-cursor="Comenzar"
            >
              INICIAR MI PROYECTO
            </Link>
            <button
              onClick={() => openBooking('Consulta sobre portafolio de proyectos')}
              className="px-8 py-4 border border-white/20 text-white hover:border-primary hover:text-primary font-mono font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
              data-cursor="Agendar"
            >
              AGENDAR REUNIÓN ESTRATÉGICA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
