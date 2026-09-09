import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Sparkles, Layers, ShoppingCart, ArrowRight, ArrowLeft, X, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AgilwebLogo from '../components/AgilwebLogo';

export default function OnboardingStep1() {
  const { projectState, updateProjectState } = useApp();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string>(projectState.projectType || 'web');

  const options = [
    { 
      id: 'web', 
      icon: <Globe size={24} />, 
      title: 'Página Web de Ventas', 
      desc: 'Diseño enfocado en captar clientes, posicionar en Google y recibir mensajes directos por WhatsApp.' 
    },
    { 
      id: 'ecommerce', 
      icon: <ShoppingCart size={24} />, 
      title: 'Tienda Online E-commerce', 
      desc: 'Vende tus productos las 24 horas con pagos con tarjeta, Bizum y gestión de pedidos fácil.' 
    },
    { 
      id: 'services', 
      icon: <Layers size={24} />, 
      title: 'Web de Servicios & Citas', 
      desc: 'Ideal para clínicas, consultorías, despachos o estudios con agenda y reservas online.' 
    },
    { 
      id: 'redesign', 
      icon: <Sparkles size={24} />, 
      title: 'Rediseño & Crecimiento', 
      desc: 'Moderniza tu página web actual, mejora su velocidad y multiplica tus conversiones.' 
    },
  ];

  const handleNext = () => {
    const matched = options.find(o => o.id === selected);
    updateProjectState({
      projectType: selected,
      projectTypeTitle: matched ? matched.title : 'Página Web de Ventas'
    });
    navigate('/onboarding/step2');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header progress */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <div className="h-1 bg-white/5 w-full">
          <div className="h-full bg-primary shadow-glow transition-all duration-700 w-1/4" />
        </div>
        <div className="px-8 py-3 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-primary">
          <span>PASO 01 / 04 — EL OBJETIVO</span>
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-20">
        <div className="w-full max-w-6xl">
          <div className="mb-14 text-center lg:text-left">
            <span className="text-primary font-mono font-bold tracking-[0.4em] uppercase text-xs mb-3 block">// COMENCEMOS</span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.85] text-white font-display">
              ¿QUÉ ESTAMOS<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/60">CONSTRUYENDO?</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base mt-4 max-w-xl font-light leading-relaxed">
              Elige el núcleo principal de tu plataforma digital para personalizar los entregables técnicos y 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt.id)}
                  className={`glass-panel group flex flex-col items-start p-8 rounded-3xl text-left h-[300px] transition-all duration-300 relative ${
                    isSelected 
                      ? 'border-2 border-primary bg-primary/10 shadow-glow' 
                      : 'hover:bg-primary/5 hover:border-primary/30'
                  }`}
                  data-cursor={isSelected ? 'Seleccionado' : 'Elegir'}
                >
                  <div className="w-full flex items-center justify-between mb-auto">
                    <div className={`size-12 rounded-2xl flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-primary text-[#070709] shadow-glow' 
                        : 'bg-white/5 border border-white/10 text-white group-hover:bg-primary group-hover:text-[#070709]'
                    }`}>
                      {opt.icon}
                    </div>

                    <div className={`size-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'bg-primary border-primary text-[#070709]' : 'border-white/20 bg-white/5'
                    }`}>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-display">{opt.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed font-light">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 p-6 lg:p-12 flex justify-between items-center z-50 backdrop-blur-md">
        <Link to="/" className="text-white/40 hover:text-white font-mono font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} />
          VOLVER AL INICIO
        </Link>
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
