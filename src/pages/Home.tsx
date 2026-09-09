import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ShoppingCart, 
  CheckCircle2, 
  Calendar,
  Star,
  Layers,
  Sparkles,
  Cpu,
  Boxes,
  Compass,
  Code2,
  Terminal,
  Activity,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CASE_STUDIES } from '../data/mockData';
import ThreeHeroCanvas from '../components/ThreeHeroCanvas';
import ThreeFloatingCard from '../components/ThreeFloatingCard';

export default function Home() {
  const { openBooking, openCaseStudy } = useApp();

  // ROI Calculator state
  const [monthlyVisitors, setMonthlyVisitors] = useState(28000);
  const [currentConversion, setCurrentConversion] = useState(1.4);
  const [averageOrderValue, setAverageOrderValue] = useState(140);

  // Target audience switch
  const [activeAudience, setActiveAudience] = useState<'saas' | 'ecommerce' | 'deeptech'>('saas');

  // Calculations
  const currentMonthlyRevenue = (monthlyVisitors * (currentConversion / 100)) * averageOrderValue;
  const projectedConversion = currentConversion * 2.2; // +120% improvement
  const projectedMonthlyRevenue = (monthlyVisitors * (projectedConversion / 100)) * averageOrderValue;
  const monthlyGain = projectedMonthlyRevenue - currentMonthlyRevenue;
  const annualGain = monthlyGain * 12;

  const featuredCases = CASE_STUDIES.slice(0, 3);

  return (
    <div className="flex flex-col relative">
      {/* Hero Section with Interactive 3D WebGL Background */}
      <section className="relative min-h-[92vh] sm:min-h-[95vh] flex flex-col items-center justify-center px-3 sm:px-8 py-16 sm:py-20 overflow-hidden w-full">
        {/* Interactive Three.js Background Canvas */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-auto">
          <ThreeHeroCanvas />
        </div>

        {/* Radial Vignette & Grid Lines */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-[1]" />
        
        {/* Hero Content Layer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 max-w-6xl w-full text-center pointer-events-none mt-4 sm:mt-8 px-2 sm:px-4"
        >
          {/* Studio Tech Status Badge */}
          <div 
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-[10px] min-[380px]:text-xs font-mono text-primary backdrop-blur-xl pointer-events-auto cursor-pointer hover:border-primary hover:bg-primary/20 transition-all shadow-glow-sm max-w-full"
            data-cursor="Disponibilidad"
            onClick={() => openBooking('Consulta sobre reservas para Q1/Q2 2026')}
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-ping shrink-0" />
            <span className="font-bold tracking-wider truncate">AGILWEB™ STUDIO // Q1-Q2 SLOTS DISPONIBLES</span>
          </div>
          
          {/* Main Headline (Haoqi Typographic Brutalism - Responsive Mobile Scaling) */}
          <h1 
            className="text-white text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[1.08] sm:leading-[0.95] md:leading-[0.88] tracking-tight sm:tracking-[-0.05em] uppercase font-display select-none max-w-full break-words"
            data-cursor="Páginas Web"
          >
            PÁGINAS WEB QUE.<br className="hidden sm:inline" />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent drop-shadow-[0_0_35px_rgba(19,236,91,0.3)] inline-block mt-0.5 sm:mt-0">
              CONVIERTEN Y VENDEN.
            </span>
          </h1>

          {/* Subtext with Glassmorphism Context Container */}
          <div className="w-full max-w-2xl mt-1 sm:mt-3 px-4 sm:px-8 py-3.5 sm:py-5 rounded-2xl bg-[#070709]/80 backdrop-blur-md sm:backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] relative overflow-hidden group pointer-events-auto mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-70 pointer-events-none" />
            <p className="text-gray-100 text-sm sm:text-lg font-light leading-relaxed select-none relative z-10">
              Diseñamos y desarrollamos páginas web estratégicas para microempresas y emprendimientos. Creamos experiencias digitales rápidas, atractivas y optimizadas para captar clientes en automático.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-2 sm:mt-4 pointer-events-auto w-full max-w-md sm:max-w-none px-2">
            <Link
              to="/onboarding/step1"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-[#070709] font-black rounded-xl hover:bg-white transition-all transform hover:scale-105 shadow-glow text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-mono"
              data-cursor="Iniciar"
            >
              <span>COTIZAR MI PÁGINA WEB</span>
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => openBooking()}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border border-white/20 text-white font-bold rounded-xl hover:border-primary hover:text-primary transition-all backdrop-blur-md bg-black/40 text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-mono"
              data-cursor="Agendar"
            >
              <Calendar size={16} className="text-primary shrink-0" />
              <span>RESERVAR ASESORÍA GRATUITA</span>
            </button>
          </div>

          {/* Live Telemetry / Social Proof Badges with High-Contrast Glassmorphic Container */}
          <div className="mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#070709]/85 backdrop-blur-md sm:backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] relative overflow-hidden group pointer-events-auto mx-auto max-w-2xl w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-70 pointer-events-none" />
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-[11px] sm:text-xs font-mono relative z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white shadow-sm">
                <Star className="text-primary fill-primary shrink-0" size={14} />
                <span className="font-bold tracking-wide">4.9/5 SATISFACCIÓN</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white shadow-sm">
                <Zap className="text-primary shrink-0" size={14} />
                <span className="font-bold tracking-wide">&lt;0.5s EN MÓVILES</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white shadow-sm">
                <ShieldCheck className="text-primary shrink-0" size={14} />
                <span className="font-bold tracking-wide">100% PROPIEDAD</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 pointer-events-none font-mono text-[9px] sm:text-[10px] tracking-widest uppercase">
          <span>DESLIZA PARA EXPLORAR</span>
          <ArrowRight className="rotate-90 text-primary animate-bounce" size={14} />
        </div>
      </section>

      {/* Featured 3D Projects Showcase */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-primary font-mono font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
              // CASOS DE ESTUDIO DESTACADOS
            </span>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight font-display break-words">
              Resultados en Producción.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs font-mono hover:underline group"
            data-cursor="Explorar"
          >
            <span>VER TODOS LOS PROYECTOS ({CASE_STUDIES.length})</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCases.map((project) => (
            <ThreeFloatingCard
              key={project.id}
              onClick={() => openCaseStudy(project.id)}
              dataCursor="Ver 3D"
              className="cursor-pointer"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Metric Badge */}
                <div className="absolute top-4 right-4 bg-primary text-[#070709] text-xs font-black px-3 py-1.5 rounded-full shadow-glow font-mono">
                  {project.metric}
                </div>

                {/* Category tag */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] text-white/90 uppercase font-mono">
                  {project.tag}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors font-display">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-2 font-light leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                  <span className="text-white/40">{project.duration}</span>
                  <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explorar Caso <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </ThreeFloatingCard>
          ))}
        </div>
      </section>

      {/* Interactive Financial Simulator / ROI Calculator */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 border-y border-white/10 bg-white/[0.015] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-primary font-mono font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
              // IMPACTO FINANCIERO
            </span>
            <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display break-words">
              Calcula el Retorno de Inversión
            </h2>
            <p className="text-gray-400 text-xs sm:text-base mt-2 font-light max-w-xl mx-auto">
              Simula el incremento real de facturación al elevar la conversión y velocidad de tu plataforma con ingeniería Agilweb.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-white/10 space-y-5 sm:space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-bold font-mono uppercase tracking-wider mb-2">
                  <span className="text-white/60">Tráfico Mensual:</span>
                  <span className="text-primary text-sm sm:text-base font-bold">{monthlyVisitors.toLocaleString()} visitas</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={monthlyVisitors}
                  onChange={e => setMonthlyVisitors(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold font-mono uppercase tracking-wider mb-2">
                  <span className="text-white/60">Tasa de Conversión Actual:</span>
                  <span className="text-primary text-sm sm:text-base font-bold">{currentConversion.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={currentConversion}
                  onChange={e => setCurrentConversion(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold font-mono uppercase tracking-wider mb-2">
                  <span className="text-white/60">Valor Medio de Pedido / Contrato (AOV):</span>
                  <span className="text-primary text-sm sm:text-base font-bold">{averageOrderValue}€</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1500"
                  step="20"
                  value={averageOrderValue}
                  onChange={e => setAverageOrderValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 font-light flex items-center gap-3">
                <TrendingUp size={20} className="text-primary shrink-0" />
                <span>Modelado con una mejora media demostrada de +120% en conversión en clientes de Agilweb.</span>
              </div>
            </div>

            {/* Live Projected Revenue Card */}
            <div className="lg:col-span-6 glass-panel p-5 sm:p-10 rounded-2xl sm:rounded-3xl border-primary/40 bg-primary/5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 size-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              
              <span className="text-[10px] sm:text-[11px] uppercase font-mono font-bold tracking-widest text-primary block mb-2">
                GANANCIA ADICIONAL PROYECTADA
              </span>

              <div className="text-3xl min-[400px]:text-4xl sm:text-6xl font-black text-white tracking-tighter mb-2 font-display break-words">
                +{Math.round(monthlyGain).toLocaleString()}€
                <span className="text-sm sm:text-base font-normal text-white/50 block sm:inline sm:ml-2 font-mono">/ mes</span>
              </div>

              <div className="text-base sm:text-xl font-bold text-primary font-mono mb-6">
                +{Math.round(annualGain).toLocaleString()}€ / año en nueva facturación
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs font-mono mb-6">
                <div>
                  <span className="text-white/40 block">Tasa Actual:</span>
                  <span className="text-white font-bold">{currentConversion.toFixed(1)}% ({Math.round(currentMonthlyRevenue).toLocaleString()}€)</span>
                </div>
                <div>
                  <span className="text-white/40 block">Tasa Agilweb:</span>
                  <span className="text-primary font-bold">{projectedConversion.toFixed(1)}% ({Math.round(projectedMonthlyRevenue).toLocaleString()}€)</span>
                </div>
              </div>

              <button
                onClick={() => openBooking(`Calculé una ganancia potencial de +${Math.round(monthlyGain).toLocaleString()}€/mes con ${monthlyVisitors} visitas.`)}
                className="w-full py-3.5 sm:py-4 px-3 bg-primary text-[#070709] font-black text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest rounded-xl shadow-glow hover:bg-white transition-all transform hover:scale-102 font-mono text-center"
                data-cursor="Desbloquear"
              >
                DESBLOQUEAR ESTE CRECIMIENTO AHORA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Target Solutions Architecture */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-primary font-mono font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
            // ESPECIALIZACIÓN VERTICAL
          </span>
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display break-words">
            Arquitectura a Medida de tu Negocio
          </h2>
        </div>

        {/* Tab switcher - Fixed mobile overflow clipping */}
        <div className="flex w-full overflow-x-auto justify-start sm:justify-center gap-2 mb-8 pb-3 px-2 no-scrollbar">
          {[
            { id: 'saas', label: 'Negocios Locales & Servicios' },
            { id: 'ecommerce', label: 'Tiendas Online & E-commerce' },
            { id: 'deeptech', label: 'Emprendimientos & Startups' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAudience(tab.id as any)}
              className={`shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                activeAudience === tab.id
                  ? 'bg-primary text-[#070709] border-primary shadow-glow font-black'
                  : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30'
              }`}
              data-cursor="Seleccionar"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Detail View */}
        <div className="glass-panel p-5 sm:p-12 rounded-2xl sm:rounded-3xl border-white/15 max-w-4xl mx-auto">
          {activeAudience === 'saas' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">
                <Zap size={14} className="shrink-0" />
                <span>SOLUCIÓN PARA NEGOCIOS Y PROFESIONALES</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white font-display leading-snug break-words">
                Consigue más llamadas, citas y consultas directas a tu WhatsApp.
              </h3>
              <p className="text-gray-300 text-xs sm:text-base leading-relaxed font-light">
                Si tienes una clínica, taller, academia, despacho o negocio local, tu web debe ser una máquina de generar confianza. Diseñamos con llamadas a la acción claras, testimonios convincentes y formulario de contacto optimizado.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>Botón WhatsApp 1 Clic</span>
                </div>
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>Posicionamiento Local SEO</span>
                </div>
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>Carga Móvil Instantánea</span>
                </div>
              </div>
            </div>
          )}

          {activeAudience === 'ecommerce' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-secondary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">
                <ShoppingCart size={14} className="shrink-0" />
                <span>SOLUCIÓN PARA TIENDAS ONLINE Y MARCAS</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white font-display leading-snug break-words">
                Vende tus productos 24/7 con pagos seguros y catálogo organizado.
              </h3>
              <p className="text-gray-300 text-xs sm:text-base leading-relaxed font-light">
                Estructuramos tu tienda online con pasarelas de pago confiables (Tarjetas, Bizum, PayPal), carrito de compra sin fricciones y un panel intuitivo para que actualices tus productos y precios fácilmente.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-secondary shrink-0" />
                  <span>Cobros Tarjeta & Bizum</span>
                </div>
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-secondary shrink-0" />
                  <span>Panel Autoadministrable</span>
                </div>
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-secondary shrink-0" />
                  <span>Alertas por Email y WhatsApp</span>
                </div>
              </div>
            </div>
          )}

          {activeAudience === 'deeptech' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-accent text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">
                <TrendingUp size={14} className="shrink-0" />
                <span>SOLUCIÓN PARA EMPRENDIMIENTOS Y STARTUPS</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white font-display leading-snug break-words">
                Transmite máxima solidez para validar tu oferta y ganar clientes rápido.
              </h3>
              <p className="text-gray-300 text-xs sm:text-base leading-relaxed font-light">
                Lanza una página web de impacto que comunique tu propuesta de valor de forma clara, capture prospectos calificados y posicione tu marca un paso por delante de tus competidores directos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-accent shrink-0" />
                  <span>Captación de Prospectos</span>
                </div>
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-accent shrink-0" />
                  <span>Diseño Diferencial</span>
                </div>
                <div className="text-white/80 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-accent shrink-0" />
                  <span>Entrega en Tiempo Récord</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Heroic CTA */}
      <section className="py-16 sm:py-28 px-4 sm:px-8 text-center relative overflow-hidden z-10 border-t border-white/10">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 sm:space-y-8 px-2">
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest max-w-full truncate">
            // INICIA TU TRANSFORMACIÓN DIGITAL
          </span>

          <h2 className="text-2xl min-[400px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[1.08] sm:leading-[0.9] tracking-tight font-display break-words">
            DISEÑEMOS TU PRÓXIMO<br className="hidden sm:inline" />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">
              ESTÁNDAR DE INDUSTRIA.
            </span>
          </h2>

          <p className="text-sm sm:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Trabajamos con un número selecto de clientes por trimestre para garantizar máxima dedicación e innovación técnica. Conversemos sobre tus objetivos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 w-full max-w-md sm:max-w-none mx-auto">
            <Link
              to="/onboarding/step1"
              className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 bg-primary text-[#070709] font-black text-xs uppercase tracking-widest rounded-xl shadow-glow hover:bg-white transition-all flex items-center justify-center gap-2 font-mono"
              data-cursor="Comenzar"
            >
              <span>INICIAR ONBOARDING</span>
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => openBooking('Sesión estratégica desde sección final Agilweb')}
              className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 border border-white/20 hover:border-primary text-white hover:text-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all backdrop-blur-md bg-white/5 font-mono text-center"
              data-cursor="Agendar"
            >
              RESERVAR SESIÓN ESTRATÉGICA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
