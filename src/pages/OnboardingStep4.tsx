import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft, 
  X, 
  FileCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AgilwebLogo from '../components/AgilwebLogo';

export default function OnboardingStep4() {
  const { projectState, updateProjectState, submitProject, showToast } = useApp();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState(projectState.clientName || '');
  const [clientEmail, setClientEmail] = useState(projectState.clientEmail || '');
  const [companyName, setCompanyName] = useState(projectState.companyName || '');
  const [clientPhone, setClientPhone] = useState(projectState.clientPhone || '');

  // Schedule kickoff call slot
  const [callDate, setCallDate] = useState('18 de Agosto');
  const [callTime, setCallTime] = useState('10:30 AM');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      showToast('Por favor completa tu nombre y correo electrónico.', 'error');
      return;
    }

    setIsSubmitting(true);
    updateProjectState({
      clientName,
      clientEmail,
      companyName,
      clientPhone,
      preferredCallDate: callDate,
      preferredCallTime: callTime
    });

    try {
      const projectId = await submitProject();
      navigate('/onboarding/success', { state: { projectId } });
    } catch (err) {
      showToast('Hubo un error al procesar tu solicitud. Inténtalo de nuevo.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <div className="h-1 bg-white/5 w-full">
          <div className="h-full bg-primary shadow-glow transition-all duration-700 w-full" />
        </div>
        <div className="px-8 py-3 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-primary">
          <span>PASO 04 / 04 — CONFIRMACIÓN & KICKOFF</span>
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
        <div className="w-full max-w-6xl">
          <div className="mb-10">
            <span className="text-primary font-mono font-bold tracking-[0.4em] uppercase text-xs mb-3 block">// ÚLTIMO PASO</span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.9] text-white font-display">
              FINALICEMOS TU<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/60">PROPUESTA A MEDIDA.</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2 font-display">
                <User className="text-primary" size={20} />
                Información del Responsable
              </h2>

              <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-2 font-bold">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Martín Soler"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-2 font-bold">
                      Email Corporativo *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="martin@empresa.com"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-2 font-bold">
                      Nombre de la Empresa
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Soler Capital / Marca"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-white/60 mb-2 font-bold">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+57 315 287 4596"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Kickoff Call Selection */}
                <div className="pt-4 border-t border-white/10">
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-3 flex items-center gap-2">
                    <CalendarIcon className="text-primary" size={16} />
                    Horario Preferido para Sesión de Kickoff (30 min)
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['18 de Agosto', '19 de Agosto', '20 de Agosto', '21 de Agosto'].map(date => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setCallDate(date)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          callDate === date
                            ? 'border-primary bg-primary text-[#070709] font-black shadow-glow'
                            : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {['10:30 AM', '03:00 PM', '05:30 PM'].map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setCallTime(time)}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                          callTime === time
                            ? 'border-primary bg-primary text-[#070709] font-black shadow-glow'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Live Summary Card */}
            <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border-primary/30 bg-primary/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-primary font-mono font-bold text-xs uppercase tracking-widest">
                  <FileCheck size={16} />
                  Resumen de Proyecto
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-primary/20 text-primary">
                  Draft Activo
                </span>
              </div>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/50">Objetivo:</span>
                  <span className="font-bold text-white text-right">{projectState.projectTypeTitle}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/50">Presupuesto Estimado:</span>
                  <span className="font-bold text-primary text-right">{projectState.budgetString}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/50">Plazo de Lanzamiento:</span>
                  <span className="font-bold text-white text-right">{projectState.timelineTitle}</span>
                </div>

                <div>
                  <span className="text-white/50 block mb-2">Módulos Seleccionados ({projectState.features.length}):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {projectState.features.slice(0, 5).map(feat => (
                      <span key={feat} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] text-white/80">
                        {feat}
                      </span>
                    ))}
                    {projectState.features.length > 5 && (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-[11px] font-bold">
                        +{projectState.features.length - 5} más
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Sparkles size={14} className="text-primary" />
                  Garantía Agilweb™
                </div>
                <p className="text-white/60 font-light leading-relaxed">
                  Tu web y dominio son 100% de tu propiedad, sin mensualidades forzadas, con soporte cercano y optimización de ventas desde el primer día.
                </p>
              </div>

              <button
                type="submit"
                form="onboarding-form"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-[#070709] font-mono font-black text-sm uppercase tracking-wider rounded-xl shadow-glow hover:bg-white transition-all transform hover:scale-102 disabled:opacity-50 flex items-center justify-center gap-2"
                data-cursor="Enviar"
              >
                {isSubmitting ? 'Procesando Cotización...' : 'ENVIAR COTIZACIÓN & RESERVAR ASESORÍA'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 p-6 lg:p-12 flex justify-between items-center z-50 backdrop-blur-md">
        <button
          onClick={() => navigate('/onboarding/step3')}
          className="text-white/40 hover:text-white font-mono font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          ANTERIOR
        </button>
      </footer>
    </div>
  );
}
