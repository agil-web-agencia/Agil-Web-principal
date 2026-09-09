import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  ChevronDown, 
  ArrowRight, 
  Search,
  Cpu,
  Layers,
  Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FAQS } from '../data/mockData';
import ThreeFloatingCard from '../components/ThreeFloatingCard';

export default function Pricing() {
  const { openBooking, updateProjectState } = useApp();
  const navigate = useNavigate();

  // Billing interval
  const [billingType, setBillingType] = useState<'project' | 'retainer'>('project');

  // Custom Quote Estimator State
  const [customPages, setCustomPages] = useState<number>(4);
  const [customFeatures, setCustomFeatures] = useState<{ [key: string]: boolean }>({
    branding: false,
    whatsapp: true,
    cms: true,
    ecommerce: false,
    seo: true,
    payments: false,
  });

  // Calculate dynamic custom price
  const calculateCustomEstimate = () => {
    let base = 390 + (customPages * 60);
    if (customFeatures.branding) base += 190;
    if (customFeatures.whatsapp) base += 50;
    if (customFeatures.cms) base += 140;
    if (customFeatures.ecommerce) base += 380;
    if (customFeatures.seo) base += 110;
    if (customFeatures.payments) base += 120;

    const weeks = Math.max(1, Math.ceil(base / 500));
    return { price: base, weeks };
  };

  const customEstimate = calculateCustomEstimate();

  const handleApplyCustomQuote = () => {
    const selectedKeys = Object.entries(customFeatures)
      .filter(([_, v]) => v)
      .map(([k]) => k.toUpperCase());

    updateProjectState({
      budget: Math.round(customEstimate.price),
      budgetString: `${customEstimate.price}€`,
      timeline: 'standard',
      timelineTitle: `${customEstimate.weeks} Semanas`,
      features: ['Configuración Web Personalizada', ...selectedKeys]
    });

    navigate('/onboarding/step1');
  };

  const handleSelectPlan = (planName: string, budgetNum: number, budgetLabel: string) => {
    updateProjectState({
      selectedPlan: planName,
      budget: budgetNum,
      budgetString: budgetLabel
    });
    navigate('/onboarding/step1');
  };

  // FAQ Search and active index
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqCategory, setFaqCategory] = useState<string>('Todos');

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCat = faqCategory === 'Todos' || faq.category === faqCategory;
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative">
      {/* Header */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] flex flex-col items-center justify-center px-4 sm:px-8 pt-24 sm:pt-28 pb-10 sm:pb-12 text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-4 sm:mb-6 max-w-full truncate">
          <Sparkles size={14} className="shrink-0" />
          <span className="truncate">INVERSIÓN TRANSPARENTE // AGILWEB™ STUDIO</span>
        </div>

        <h1 className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-7xl lg:text-9xl font-black leading-[1.08] sm:leading-[0.95] lg:leading-[0.88] tracking-tight uppercase mb-4 sm:mb-6 font-display break-words">
          PLANES CLAROS Y<br className="hidden sm:inline" />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">
            SIN LETRA PEQUEÑA.
          </span>
        </h1>

        <p className="text-gray-300 text-sm sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Sin costes ocultos ni cuotas obligatorias. Páginas web diseñadas para generar clientes y hacer crecer tu negocio desde el día uno.
        </p>

        {/* Billing Switcher */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:inline-flex sm:flex-row w-full sm:w-auto p-1.5 rounded-2xl glass-panel border-white/15 bg-white/5 font-mono max-w-md sm:max-w-none gap-1 sm:gap-0">
          <button
            onClick={() => setBillingType('project')}
            className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all justify-center flex items-center ${
              billingType === 'project'
                ? 'bg-primary text-[#070709] font-black shadow-glow'
                : 'text-white/60 hover:text-white'
            }`}
            data-cursor="Proyecto"
          >
            Pago Único (Propiedad 100%)
          </button>
          <button
            onClick={() => setBillingType('retainer')}
            className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              billingType === 'retainer'
                ? 'bg-primary text-[#070709] font-black shadow-glow'
                : 'text-white/60 hover:text-white'
            }`}
            data-cursor="Mantenimiento"
          >
            Con Mantenimiento Mensual
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[9px] font-mono">INCLUIDO</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards with 3D Float */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: LANZAMIENTO */}
          <ThreeFloatingCard className="h-full">
            <div className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-white/50 mb-2">ESENCIAL EMPRENDEDOR</div>
                <h2 className="text-3xl font-black text-white uppercase mb-2 font-display">LANZAMIENTO</h2>
                <p className="text-white/60 text-xs font-light leading-relaxed mb-6">
                  Ideal para profesionales y emprendimientos que necesitan presencia digital rápida y captar clientes por WhatsApp.
                </p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-white font-display">
                    {billingType === 'project' ? '490€' : '290€ + 39€'}
                  </span>
                  <span className="text-white/40 text-xs font-mono">
                    {billingType === 'project' ? 'pago único' : '/ mes'}
                  </span>
                </div>

                <div className="h-px bg-white/10 mb-8" />

                <div className="space-y-3 text-xs font-mono text-white/80">
                  {[
                    'Página de aterrizaje optimizada (1-3 secciones)',
                    'Botón directo a WhatsApp & llamada rápida',
                    'Diseño 100% responsivo para móviles',
                    'Configuración de Google Maps y SEO básico',
                    'Entrega rápida en 7 a 10 días',
                    '30 días de garantía y soporte'
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan('LANZAMIENTO', 490, '490€')}
                className="mt-10 w-full py-4 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:border-primary hover:text-primary transition-all bg-white/5"
                data-cursor="Elegir"
              >
                Elegir Plan Lanzamiento
              </button>
            </div>
          </ThreeFloatingCard>

          {/* Card 2: CRECIMIENTO (Highlighted) */}
          <ThreeFloatingCard glowColor="rgba(19, 236, 91, 0.5)" className="h-full border-2 border-primary bg-primary/10 shadow-glow relative">
            <div className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-[#070709] font-black text-[10px] font-mono uppercase tracking-widest px-4 py-1.5 rounded-full shadow-glow">
                MÁS POPULAR • NEGOCIOS
              </div>

              <div>
                <div className="text-xs font-mono font-bold uppercase text-primary mb-2">SISTEMA COMPLETO</div>
                <h2 className="text-3xl font-black text-white uppercase mb-2 font-display">CRECIMIENTO</h2>
                <p className="text-white/70 text-xs font-light leading-relaxed mb-6">
                  Para negocios y servicios que quieren posicionarse en Google, mostrar catálogo y generar prospectos en automático.
                </p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-white font-display">
                    {billingType === 'project' ? '890€' : '490€ + 59€'}
                  </span>
                  <span className="text-white/40 text-xs font-mono">
                    {billingType === 'project' ? 'pago único' : '/ mes'}
                  </span>
                </div>

                <div className="h-px bg-primary/20 mb-8" />

                <div className="space-y-3 text-xs font-mono text-white/90">
                  {[
                    'Sitio web multi-página completo (hasta 6 secciones)',
                    'Panel autoadministrable fácil para editar textos/fotos',
                    'Integración de citas online / formulario de contacto',
                    'Optimización SEO local para búsquedas en Google',
                    'Efectos visuales modernos y carga ultrarrápida',
                    'Dominio, hosting y certificado SSL por 1 año',
                    'Entrega en 14 a 18 días',
                    'Soporte prioritario y guía en video'
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan('CRECIMIENTO', 890, '890€')}
                className="mt-10 w-full py-4 bg-primary text-[#070709] font-mono font-black text-xs uppercase tracking-widest rounded-xl shadow-glow hover:bg-white transition-all transform hover:scale-102"
                data-cursor="Elegir"
              >
                Elegir Plan Crecimiento
              </button>
            </div>
          </ThreeFloatingCard>

          {/* Card 3: TIENDA ONLINE / E-COMMERCE */}
          <ThreeFloatingCard className="h-full">
            <div className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-white/50 mb-2">VENTAS DIGITALES 24/7</div>
                <h2 className="text-3xl font-black text-white uppercase mb-2 font-display">TIENDA ONLINE</h2>
                <p className="text-white/60 text-xs font-light leading-relaxed mb-6">
                  Para emprendimientos que venden productos físicos o digitales y necesitan pasarelas de pago y control de stock.
                </p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-white font-display">
                    {billingType === 'project' ? '1.490€' : '790€ + 79€'}
                  </span>
                  <span className="text-white/40 text-xs font-mono">
                    {billingType === 'project' ? 'pago único' : '/ mes'}
                  </span>
                </div>

                <div className="h-px bg-white/10 mb-8" />

                <div className="space-y-3 text-xs font-mono text-white/80">
                  {[
                    'Tienda online completa con catálogo ilimitado',
                    'Pasarela de cobros segura (Tarjetas, Bizum, PayPal)',
                    'Gestión de stock, pedidos y avisos por email',
                    'Carrito de compras optimizado para móviles',
                    'Cálculo de envíos automático',
                    'Capacitación 1 a 1 para administrar tu tienda',
                    'Entrega en 3 semanas con soporte continuo'
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan('TIENDA ONLINE', 1490, '1.490€')}
                className="mt-10 w-full py-4 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:border-primary hover:text-primary transition-all bg-white/5"
                data-cursor="Cotizar"
              >
                Elegir Tienda Online
              </button>
            </div>
          </ThreeFloatingCard>
        </div>
      </section>

      {/* Interactive Custom Quote Builder */}
      <section className="px-4 sm:px-8 py-20 border-y border-white/10 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-primary font-mono font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
              // CONFIGURADOR DINÁMICO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
              Calcula tu Presupuesto a Medida
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 font-light">
              Elige el número de secciones y funcionalidades que necesita tu negocio para ver el precio exacto y tiempo estimado.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Features check controls */}
            <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border-white/10 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <span className="text-white/70">Número de Vistas / Páginas:</span>
                  <span className="text-primary text-base font-bold">{customPages} páginas</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={customPages}
                  onChange={e => setCustomPages(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/50 block mb-3">
                  Módulos Opcionales:
                </span>
                <div className="grid sm:grid-cols-2 gap-3 font-mono">
                  {[
                    { key: 'branding', label: 'Diseño de Logo & Identidad (+190€)' },
                    { key: 'whatsapp', label: 'Botón WhatsApp & Chat (+50€)' },
                    { key: 'cms', label: 'Panel Autoadministrable (+140€)' },
                    { key: 'ecommerce', label: 'Catálogo / Carrito de Compras (+380€)' },
                    { key: 'seo', label: 'Posicionamiento Google SEO Local (+110€)' },
                    { key: 'payments', label: 'Pasarela Bizum / Tarjeta (+120€)' },
                  ].map(feat => (
                    <button
                      key={feat.key}
                      type="button"
                      onClick={() => setCustomFeatures({ ...customFeatures, [feat.key]: !customFeatures[feat.key] })}
                      className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                        customFeatures[feat.key]
                          ? 'border-primary bg-primary/10 text-white font-bold'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25'
                      }`}
                      data-cursor="Toggle"
                    >
                      <span className="leading-snug">{feat.label}</span>
                      <div className={`size-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                        customFeatures[feat.key] ? 'bg-primary border-primary text-[#070709]' : 'border-white/20'
                      }`}>
                        {customFeatures[feat.key] && <Check size={10} strokeWidth={3} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Quote Output Card */}
            <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border-primary/40 bg-primary/5 space-y-6">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary block">
                PRESUPUESTO ESTIMADO
              </span>

              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
                {customEstimate.price.toLocaleString()}€
                <span className="text-xs font-normal text-white/40 block mt-1 font-mono">Precio cerrado con todo incluido</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-2">
                <div className="flex justify-between text-white/70">
                  <span>Tiempo de Entrega:</span>
                  <span className="font-bold text-white">{customEstimate.weeks} {customEstimate.weeks === 1 ? 'Semana' : 'Semanas'}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Módulos Activos:</span>
                  <span className="font-bold text-primary">
                    {Object.values(customFeatures).filter(Boolean).length} Módulos
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Garantía:</span>
                  <span className="font-bold text-white">100% Código de tu propiedad</span>
                </div>
              </div>

              <button
                onClick={handleApplyCustomQuote}
                className="w-full py-4 bg-primary text-[#070709] font-mono font-black text-xs uppercase tracking-widest rounded-xl shadow-glow hover:bg-white transition-all transform hover:scale-102 flex items-center justify-center gap-2"
                data-cursor="Contratar"
              >
                APLICAR ESTA CONFIGURACIÓN
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="px-4 sm:px-8 py-24 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-mono font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
            // PREGUNTAS FRECUENTES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            Respuestas Claras.
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            type="text"
            placeholder="Buscar por pregunta o palabra clave..."
            value={faqSearch}
            onChange={e => setFaqSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary transition-colors font-mono"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 font-mono">
          {['Todos', 'General', 'Proceso', 'Precios', 'Tecnología'].map(cat => (
            <button
              key={cat}
              onClick={() => setFaqCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                faqCategory === cat ? 'bg-primary text-[#070709] font-black shadow-glow' : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-primary/40 bg-primary/[0.03]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 text-white font-bold text-base sm:text-lg font-display"
                  data-cursor={isOpen ? 'Cerrar' : 'Leer'}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
