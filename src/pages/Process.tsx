import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Search, 
  Layout as LayoutIcon, 
  Palette, 
  Rocket, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Zap, 
  ArrowRight,
  Sparkles,
  Check,
  Box
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Process() {
  const { openBooking } = useApp();
  
  // Interactive Step 2 wireframe mode
  const [wireframeMode, setWireframeMode] = useState<'blueprint' | 'hifi'>('hifi');

  // Interactive Step 3 design theme preview
  const [designTone, setDesignTone] = useState<'emerald' | 'violet' | 'cyan'>('emerald');

  // Interactive Step 4 benchmark test state
  const [benchmarkRunning, setBenchmarkRunning] = useState(false);
  const [benchmarkScore, setBenchmarkScore] = useState(99);

  // Interactive Step 5 launch checklist
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    seo: true,
    ssl: true,
    webgl: true,
    speed: true,
    backup: true,
  });

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const runBenchmark = () => {
    setBenchmarkRunning(true);
    setTimeout(() => {
      setBenchmarkRunning(false);
      setBenchmarkScore(100);
    }, 900);
  };

  const steps = [
    {
      num: '01',
      title: 'DESCUBRIMIENTO & ESTRATEGIA',
      subtitle: 'Auditoría de tu negocio y objetivos de venta.',
      desc: 'Analizamos tus clientes ideales, tu competencia y qué hace único a tu servicio o producto. Diseñamos con un objetivo claro: conseguir prospectos y ventas.',
      tags: ['Análisis de Competencia', 'Estrategia de Ventas', 'Estructura de Contenido', 'Público Objetivo'],
      icon: <Search className="text-primary" size={24} />,
      color: 'text-primary'
    },
    {
      num: '02',
      title: 'ESTRUCTURA & WIREFRAMES',
      subtitle: 'Definiendo la jerarquía y los puntos de contacto.',
      desc: 'Estructuramos la página para guiar al visitante hacia la acción: botones de WhatsApp claros, formularios sencillos y llamadas a la acción en puntos estratégicos.',
      tags: ['Embudo de Ventas', 'Prototipos Visuales', 'Jerarquía de Información', 'Facilidad de Navegación'],
      icon: <LayoutIcon className="text-primary" size={24} />,
      color: 'text-white'
    },
    {
      num: '03',
      title: 'DISEÑO VISUAL DE IMPACTO',
      subtitle: 'Tu marca con un aspecto profesional y moderno.',
      desc: 'Combinamos tipografía elegante, colores corporativos, imágenes nítidas y efectos visuales modernos para que tu negocio transmita confianza desde el primer segundo.',
      tags: ['Identidad Visual', 'Diseño Responsivo Móvil', 'Confianza de Marca', 'Fotografías & Iconos'],
      icon: <Palette className="text-primary" size={24} />,
      color: 'text-white'
    },
    {
      num: '04',
      title: 'DESARROLLO & VELOCIDAD MÁXIMA',
      subtitle: 'Programación rápida, segura y adaptada a teléfonos.',
      desc: 'Construimos tu web con tecnologías modernas para que cargue en menos de 1 segundo en cualquier teléfono, con pasarelas de pago y seguridad SSL.',
      tags: ['Carga Ultrarrápida', 'Integración WhatsApp', 'Pasarela de Pagos / Bizum', 'Panel Fácil de Editar'],
      icon: <Terminal className="text-primary" size={24} />,
      color: 'text-white'
    },
    {
      num: '05',
      title: 'LANZAMIENTO & POSICIONAMIENTO',
      subtitle: 'Tu web en línea lista para recibir clientes.',
      desc: 'Conectamos tu dominio, configuramos Google Analytics y Google Search Console, y te entregamos una guía para gestionar tu web fácilmente.',
      tags: ['Dominio & SSL', 'Google Maps / SEO Local', 'Capacitación Básica', 'Soporte Continuo'],
      icon: <Rocket className="text-primary" size={24} />,
      color: 'text-white'
    }
  ];

  return (
    <div className="relative">
      {/* Header */}
      <section className="relative min-h-[45vh] sm:min-h-[55vh] flex flex-col items-center justify-center px-4 sm:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-4 sm:mb-6 max-w-full truncate">
          <Sparkles size={14} className="shrink-0" />
          <span className="truncate">MÉTODO DE TRABAJO // AGILWEB™ FRAMEWORK</span>
        </div>

        <h1 className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-7xl lg:text-9xl font-black leading-[1.08] sm:leading-[0.95] lg:leading-[0.88] tracking-tight uppercase mb-4 sm:mb-6 font-display break-words">
          EL PROCESO PROBADO<br className="hidden sm:inline" />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">
            PARA TU PÁGINA WEB.
          </span>
        </h1>

        <p className="text-gray-300 text-sm sm:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
          Un camino claro de 5 pasos diseñado para crear una presencia digital profesional y rentable para tu negocio, sin complicaciones ni pérdidas de tiempo.
        </p>
      </section>

      {/* Steps List */}
      <div className="relative px-4 sm:px-8 max-w-7xl mx-auto space-y-32 pb-32">
        {/* Step 01 */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
          data-cursor="Fase 01"
        >
          <div>
            <span className="text-7xl sm:text-8xl font-black block mb-2 opacity-20 text-primary font-mono">
              01
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-primary mb-3 uppercase font-display">
              {steps[0].title}
            </h2>
            <h3 className="text-xl text-white font-bold mb-4">{steps[0].subtitle}</h3>
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6">
              {steps[0].desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {steps[0].tags.map(tag => (
                <span key={tag} className="px-3.5 py-1.5 glass-panel rounded-full text-xs font-mono font-bold uppercase text-primary border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Card Step 1 */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-white/50">Discovery Matrix</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-mono">Status: Aprobado</span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-white/80">1. Mapeo de Competidores Clave</span>
                <CheckCircle2 size={16} className="text-primary" />
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-white/80">2. Definición de Arquetipos de Conversión</span>
                <CheckCircle2 size={16} className="text-primary" />
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-white/80">3. Embudo 3D & Objetivos de Retorno (KPIs)</span>
                <CheckCircle2 size={16} className="text-primary" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary font-mono">
              Entregable: Documento Maestro de Arquitectura y Especificaciones de Negocio.
            </div>
          </div>
        </motion.section>

        {/* Step 02 - Wireframing & 3D Prototyping */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
          data-cursor="Fase 02"
        >
          <div className="lg:order-2">
            <span className="text-7xl sm:text-8xl font-black block mb-2 opacity-20 text-white font-mono">
              02
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 uppercase font-display">
              {steps[1].title}
            </h2>
            <h3 className="text-xl text-primary font-bold mb-4">{steps[1].subtitle}</h3>
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6">
              {steps[1].desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {steps[1].tags.map(tag => (
                <span key={tag} className="px-3.5 py-1.5 glass-panel rounded-full text-xs font-mono font-bold uppercase text-white/80 border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Wireframe Previewer */}
          <div className="lg:order-1 glass-panel p-6 sm:p-8 rounded-3xl border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-white/50">Wireframe Live Preview</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setWireframeMode('blueprint')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition-all ${
                    wireframeMode === 'blueprint' ? 'bg-primary text-[#070709] font-black' : 'bg-white/5 text-white/60'
                  }`}
                >
                  Blueprint Lo-Fi
                </button>
                <button
                  onClick={() => setWireframeMode('hifi')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition-all ${
                    wireframeMode === 'hifi' ? 'bg-primary text-[#070709] font-black' : 'bg-white/5 text-white/60'
                  }`}
                >
                  3D Hi-Fi Interactive
                </button>
              </div>
            </div>

            {wireframeMode === 'blueprint' ? (
              <div className="p-6 rounded-2xl border-2 border-dashed border-white/20 bg-black/40 space-y-4 font-mono text-xs text-white/40">
                <div className="h-6 w-1/3 bg-white/10 rounded" />
                <div className="h-20 w-full bg-white/5 rounded border border-white/10 flex items-center justify-center">
                  [ 3D WEBGL HERO CANVAS & VALUE PROPOSITION ]
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[10px]">[ Object 3D ]</div>
                  <div className="h-16 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[10px]">[ Metrics ]</div>
                  <div className="h-16 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[10px]">[ CTA Engine ]</div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-20 bg-primary rounded-full" />
                  <div className="px-3 py-1 bg-primary text-[#070709] rounded-full font-black text-[10px]">AGENDAR 3D</div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-white uppercase font-display">Plataforma 3D Agilweb</h4>
                  <p className="text-white/60 font-light text-[11px]">Microinteracciones fluidas a 60 FPS y shaders reactivos.</p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-primary font-bold block">+140%</span>
                    <span className="text-[9px] text-white/50">Conversión</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-primary font-bold block">0.3s</span>
                    <span className="text-[9px] text-white/50">Carga</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-primary font-bold block">100%</span>
                    <span className="text-[9px] text-white/50">Garantía</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* Step 03 - Visual Design & Shaders */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
          data-cursor="Fase 03"
        >
          <div>
            <span className="text-7xl sm:text-8xl font-black block mb-2 opacity-20 text-primary font-mono">
              03
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 uppercase font-display">
              {steps[2].title}
            </h2>
            <h3 className="text-xl text-primary font-bold mb-4">{steps[2].subtitle}</h3>
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6">
              {steps[2].desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {steps[2].tags.map(tag => (
                <span key={tag} className="px-3.5 py-1.5 glass-panel rounded-full text-xs font-mono font-bold uppercase text-primary border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Design System Token Switcher */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-white/50">Design System Palette</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setDesignTone('emerald')}
                  className={`size-6 rounded-full border-2 transition-transform ${designTone === 'emerald' ? 'scale-125 border-white' : 'border-transparent'} bg-[#13ec5b]`}
                  data-cursor="Verde"
                />
                <button
                  onClick={() => setDesignTone('violet')}
                  className={`size-6 rounded-full border-2 transition-transform ${designTone === 'violet' ? 'scale-125 border-white' : 'border-transparent'} bg-[#8b5cf6]`}
                  data-cursor="Violeta"
                />
                <button
                  onClick={() => setDesignTone('cyan')}
                  className={`size-6 rounded-full border-2 transition-transform ${designTone === 'cyan' ? 'scale-125 border-white' : 'border-transparent'} bg-[#38bdf8]`}
                  data-cursor="Cian"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className={`p-6 rounded-2xl border transition-colors ${
                designTone === 'emerald' ? 'bg-[#13ec5b]/10 border-[#13ec5b]/30' :
                designTone === 'violet' ? 'bg-[#8b5cf6]/10 border-[#8b5cf6]/30' :
                'bg-[#38bdf8]/10 border-[#38bdf8]/30'
              }`}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                  Active Brand Token
                </span>
                <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2 font-display">
                  Syne + JetBrains Mono Grid
                </h4>
                <p className="text-xs text-white/70 font-light">
                  Tipografía de alto impacto con espaciado matemático, shaders 3D en WebGL y jerarquía visual estricta.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono text-white/60">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">Base #070709</div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">Surface #111116</div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">Text #FFFFFF</div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">Glow 25px</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Step 04 - Development & WebGL Optimization */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
          data-cursor="Fase 04"
        >
          <div className="lg:order-2">
            <span className="text-7xl sm:text-8xl font-black block mb-2 opacity-20 text-white font-mono">
              04
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 uppercase font-display">
              {steps[3].title}
            </h2>
            <h3 className="text-xl text-primary font-bold mb-4">{steps[3].subtitle}</h3>
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6">
              {steps[3].desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {steps[3].tags.map(tag => (
                <span key={tag} className="px-3.5 py-1.5 glass-panel rounded-full text-xs font-mono font-bold uppercase text-white/80 border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Code & Performance Benchmark */}
          <div className="lg:order-1 glass-panel p-6 sm:p-8 rounded-3xl border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-white/50">Agilweb Performance Engine</span>
              <button
                onClick={runBenchmark}
                disabled={benchmarkRunning}
                className="px-3 py-1 bg-primary text-[#070709] rounded-lg text-xs font-mono font-bold uppercase tracking-wider shadow-glow hover:bg-white transition-all disabled:opacity-50"
                data-cursor="Test"
              >
                {benchmarkRunning ? 'Analizando...' : 'Ejecutar Benchmark'}
              </button>
            </div>

            <div className="font-mono text-xs bg-black/60 p-4 rounded-xl border border-white/10 leading-relaxed text-gray-300 overflow-x-auto">
              <div className="text-primary">const <span className="text-white">agilwebArchitecture</span> = {'{'}</div>
              <div className="pl-4 text-white/60">engine: <span className="text-primary">'Three.js + React 19 + Lenis'</span>,</div>
              <div className="pl-4 text-white/60">webglFrameRate: <span className="text-primary">'60-120 FPS'</span>,</div>
              <div className="pl-4 text-white/60">firstContentfulPaint: <span className="text-primary">'0.25s'</span>,</div>
              <div className="pl-4 text-white/60">lighthouseScore: <span className="text-primary font-bold">{benchmarkScore}/100</span>,</div>
              <div className="text-primary">{'}'};</div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xl font-black text-primary">0.25s</span>
                <span className="text-[10px] text-white/50 block uppercase">LCP Speed</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xl font-black text-primary">100%</span>
                <span className="text-[10px] text-white/50 block uppercase">SEO Score</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xl font-black text-primary">60 FPS</span>
                <span className="text-[10px] text-white/50 block uppercase">WebGL Smooth</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Step 05 - Launch & Production Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
          data-cursor="Fase 05"
        >
          <div>
            <span className="text-7xl sm:text-8xl font-black block mb-2 opacity-20 text-primary font-mono">
              05
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-primary mb-3 uppercase font-display">
              {steps[4].title}
            </h2>
            <h3 className="text-xl text-white font-bold mb-4">{steps[4].subtitle}</h3>
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6">
              {steps[4].desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {steps[4].tags.map(tag => (
                <span key={tag} className="px-3.5 py-1.5 glass-panel rounded-full text-xs font-mono font-bold uppercase text-primary border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Pre-flight Checklist */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-white/50">Pre-Flight Launch Checklist</span>
              <span className="text-[10px] font-mono text-primary">5/5 Verificados</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              {[
                { key: 'seo', label: 'Estructura SEO, Sitemap XML & Robots.txt' },
                { key: 'ssl', label: 'Certificado SSL & Headers de Seguridad HSTS' },
                { key: 'webgl', label: 'Optimización de Memoria WebGL & Shaders' },
                { key: 'speed', label: 'Compresión WebP/AVIF y CDN Cache Global' },
                { key: 'backup', label: 'Sistema de Backups Diarios Automatizado' },
              ].map(item => (
                <div
                  key={item.key}
                  onClick={() => toggleCheck(item.key)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    checklist[item.key]
                      ? 'bg-primary/10 border-primary/30 text-white'
                      : 'bg-white/5 border-white/10 text-white/50'
                  }`}
                  data-cursor="Check"
                >
                  <span className="font-medium">{item.label}</span>
                  <div className={`size-5 rounded-md border flex items-center justify-center ${
                    checklist[item.key] ? 'bg-primary border-primary text-[#070709]' : 'border-white/20'
                  }`}>
                    {checklist[item.key] && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary font-mono text-center">
              🚀 Tu proyecto listo para producción a escala global.
            </div>
          </div>
        </motion.section>
      </div>

      {/* Process CTA Banner */}
      <section className="px-4 sm:px-8 py-24 border-t border-white/10 text-center bg-white/[0.01]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            ¿Listo para iniciar la fase 01?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Planifiquemos el descubrimiento de tu proyecto y recibamos tu brief técnico hoy mismo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              to="/onboarding/step1"
              className="px-8 py-4 bg-primary text-[#070709] font-black rounded-xl text-xs font-mono uppercase tracking-widest shadow-glow hover:bg-white transition-all transform hover:scale-105"
              data-cursor="Comenzar"
            >
              INICIAR ONBOARDING (5 MIN)
            </Link>
            <button
              onClick={() => openBooking('Consulta sobre metodología de trabajo de 5 pasos')}
              className="px-8 py-4 border border-white/20 text-white hover:border-primary hover:text-primary font-mono font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
              data-cursor="Agendar"
            >
              AGENDAR SESIÓN ESTRATÉGICA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
