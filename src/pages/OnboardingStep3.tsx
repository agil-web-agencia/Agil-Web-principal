import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CreditCard, 
  Cpu, 
  Database, 
  Globe2, 
  Search, 
  BarChart3, 
  Sparkles,
  ArrowRight, 
  ArrowLeft, 
  X, 
  Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AgilwebLogo from '../components/AgilwebLogo';

export default function OnboardingStep3() {
  const { projectState, updateProjectState } = useApp();
  const navigate = useNavigate();

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    projectState.features.length ? projectState.features : ['Botón Directo a WhatsApp', 'Diseño Móvil Ultrarrápido', 'Posicionamiento Google SEO']
  );
  const [description, setDescription] = useState(projectState.projectDescription || '');

  const featureOptions = [
    { id: 'whatsapp', title: 'Botón Directo a WhatsApp', desc: 'Atrae consultas instantáneas de clientes potenciales a tu móvil.', icon: <Sparkles size={20} /> },
    { id: 'mobile', title: 'Diseño Móvil Ultrarrápido', desc: 'Carga instantánea en teléfonos y 100% responsive.', icon: <Cpu size={20} /> },
    { id: 'seo', title: 'Posicionamiento Google SEO', desc: 'Optimización local para aparecer cuando busquen tu negocio.', icon: <Search size={20} /> },
    { id: 'payments', title: 'Pasarela de Pagos & Bizum', desc: 'Cobra con tarjeta de crédito, Bizum o PayPal sin complicaciones.', icon: <CreditCard size={20} /> },
    { id: 'cms', title: 'Panel Autoadministrable', desc: 'Edita textos, precios y fotos en minutos sin saber programar.', icon: <Database size={20} /> },
    { id: 'forms', title: 'Formulario de Cotizaciones', desc: 'Recibe solicitudes de presupuesto directo a tu correo electrónico.', icon: <ShieldCheck size={20} /> },
    { id: 'booking', title: 'Sistema de Citas y Agenda', desc: 'Permite a tus clientes reservar horas y servicios online.', icon: <Globe2 size={20} /> },
    { id: 'analytics', title: 'Estadísticas & Métricas', desc: 'Conoce cuántas personas visitan tu web y de dónde vienen.', icon: <BarChart3 size={20} /> },
  ];

  const toggleFeature = (title: string) => {
    if (selectedFeatures.includes(title)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== title));
    } else {
      setSelectedFeatures([...selectedFeatures, title]);
    }
  };

  const handleNext = () => {
    updateProjectState({
      features: selectedFeatures,
      projectDescription: description
    });
    navigate('/onboarding/step4');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <div className="h-1 bg-white/5 w-full">
          <div className="h-full bg-primary shadow-glow transition-all duration-700 w-3/4" />
        </div>
        <div className="px-8 py-3 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-primary">
          <span>PASO 03 / 04 — ARQUITECTURA & CARACTERÍSTICAS</span>
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
        <div className="w-full max-w-6xl space-y-12">
          <div>
            <span className="text-primary font-mono font-bold tracking-[0.4em] uppercase text-xs mb-2 block">// FUNCIONALIDADES CLAVE</span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.9] text-white font-display">
              ¿QUÉ ELEMENTOS<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/60">IMPULSAN TU NEGOCIO?</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base mt-4 max-w-2xl font-light leading-relaxed">
              Selecciona las herramientas que necesitas para captar prospectos, procesar pagos o posicionar tu marca en internet.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureOptions.map((feat) => {
              const isSelected = selectedFeatures.includes(feat.title);
              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => toggleFeature(feat.title)}
                  className={`glass-panel p-6 rounded-3xl text-left flex flex-col justify-between transition-all duration-300 relative group min-h-[160px] ${
                    isSelected
                      ? 'border-2 border-primary bg-primary/10 shadow-glow'
                      : 'border-white/10 hover:border-white/25 hover:bg-white/5'
                  }`}
                  data-cursor={isSelected ? 'Quitar' : 'Añadir'}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isSelected ? 'bg-primary text-[#070709] border-primary' : 'bg-white/5 border-white/10 text-white group-hover:text-primary'
                    }`}>
                      {feat.icon}
                    </div>
                    <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'bg-primary border-primary text-[#070709]' : 'border-white/20 bg-white/5'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5 font-display">{feat.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed font-light">{feat.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Optional Project Brief / Description */}
          <div className="glass-panel p-8 rounded-3xl border-white/10">
            <label className="block text-xs font-mono font-bold uppercase tracking-widest text-white/70 mb-3">
              Cuéntanos brevemente sobre tu empresa o visión del proyecto (Opcional)
            </label>
            <textarea
              rows={3}
              placeholder="Ej. Somos una clínica dental / taller / tienda y queremos una página web clara para captar más clientes en nuestra ciudad y recibir citas por WhatsApp..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-5 py-4 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors resize-none font-light"
            />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 p-6 lg:p-12 flex justify-between items-center z-50 backdrop-blur-md">
        <button
          onClick={() => navigate('/onboarding/step2')}
          className="text-white/40 hover:text-white font-mono font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          ANTERIOR
        </button>
        <button
          onClick={handleNext}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-mono font-black uppercase tracking-wider text-sm bg-primary text-[#070709] shadow-glow hover:bg-white transition-all transform hover:scale-102"
          data-cursor="Continuar"
        >
          SIGUIENTE PASO
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
