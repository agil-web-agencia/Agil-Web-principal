import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Calendar, 
  Copy, 
  Check, 
  Sparkles, 
  Globe, 
  ArrowUpRight,
  Volume2,
  VolumeX,
  Award,
  Phone,
  Mail
} from 'lucide-react';
import Lenis from 'lenis';
import BookingModal from './BookingModal';
import CaseStudyModal from './CaseStudyModal';
import ToastContainer from './ToastContainer';
import AIChatWidget from './AIChatWidget';
import AgilwebLogo from './AgilwebLogo';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const location = useLocation();
  const { openBooking, showToast } = useApp();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const cursorEl = target ? target.closest('[data-cursor]') : null;
      if (cursorEl) {
        setCursorText(cursorEl.getAttribute('data-cursor'));
      } else {
        setCursorText(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('agilweb.agencia@gmail.com');
    setEmailCopied(true);
    showToast('Email copiado al portapapeles: agilweb.agencia@gmail.com', 'success');
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const toggleAudioAtmosphere = () => {
    setAudioEnabled(!audioEnabled);
    showToast(
      !audioEnabled ? 'Efectos hápticos y espaciales activados' : 'Modo silencioso activado', 
      'info'
    );
  };

  const isOnboarding = location.pathname.startsWith('/onboarding');

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-[#070709] text-white ${isTouchDevice ? '' : 'cursor-none'}`}>
      {/* Custom Haoqi-style Laser Dot & Responsive Cursor */}
      {!isTouchDevice && (
        <>
          {/* Ambient Glow Follower */}
          <motion.div
            className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"
            animate={{
              x: mousePos.x - 250,
              y: mousePos.y - 250,
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 180, mass: 0.6 }}
          />

          {/* Precision Neon Laser Indicator */}
          <motion.div
            className="fixed top-0 left-0 z-[150] pointer-events-none flex items-center justify-center"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
            }}
            transition={{ type: 'spring', damping: 28, stiffness: 500, mass: 0.05 }}
          >
            <motion.div
              className="rounded-full shadow-glow"
              animate={{
                width: cursorText ? 110 : 9,
                height: cursorText ? 110 : 9,
                backgroundColor: cursorText ? 'rgba(19, 236, 91, 0.12)' : 'rgba(19, 236, 91, 1)',
                border: cursorText ? '1px solid rgba(19, 236, 91, 0.7)' : 'none',
              }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            />
            
            <AnimatePresence>
              {cursorText && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="absolute text-[10px] font-black text-primary font-mono uppercase tracking-[0.2em] whitespace-nowrap select-none drop-shadow-[0_0_10px_rgba(19,236,91,0.8)]"
                >
                  {cursorText}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Subtle Background Noise & Tech Grid */}
      <div className="fixed inset-0 bg-noise opacity-30 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Top Floating Navigation Header (Haoqi aesthetic) */}
      {!isOnboarding && (
        <header className="sticky top-0 z-50 w-full px-4 sm:px-8 pt-4 pb-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between p-3.5 sm:px-6 rounded-2xl glass-panel border-white/10 shadow-2xl backdrop-blur-2xl">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" data-cursor="Agilweb">
              <AgilwebLogo size="md" withBadge={true} />
            </Link>

            {/* Middle Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
              {[
                { path: '/', label: 'Inicio' },
                { path: '/portfolio', label: 'Casos de Éxito' },
                { path: '/process', label: 'Cómo Trabajamos' },
                { path: '/pricing', label: 'Planes & Precios' },
              ].map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isActive 
                        ? 'bg-primary text-[#070709] font-black shadow-glow-sm' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    data-cursor={item.label}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {/* Booking CTA */}
              <button
                onClick={() => openBooking()}
                className="text-xs font-bold text-white/80 hover:text-primary transition-colors flex items-center gap-1.5 font-mono px-3 py-2 rounded-xl hover:bg-white/5"
                data-cursor="Asesoría"
              >
                <Calendar size={14} className="text-primary" />
                <span>Asesoría Gratis</span>
              </button>

              {/* Start Project CTA */}
              <Link
                to="/onboarding/step1"
                className="px-5 py-2.5 bg-primary text-[#070709] text-xs font-black uppercase tracking-wider rounded-xl hover:bg-white hover:text-black transition-all shadow-glow flex items-center gap-1.5 transform hover:scale-105"
                data-cursor="Cotizar"
              >
                <span>Cotizar Web</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-white p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      )}

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#070709]/95 backdrop-blur-2xl pt-28 px-6 lg:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6 text-center">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)} 
                className={`text-3xl font-black uppercase tracking-tight ${location.pathname === '/' ? 'text-primary' : 'text-white'}`}
              >
                Inicio
              </Link>
              <Link 
                to="/portfolio" 
                onClick={() => setIsMenuOpen(false)} 
                className={`text-3xl font-black uppercase tracking-tight ${location.pathname === '/portfolio' ? 'text-primary' : 'text-white'}`}
              >
                Casos de Éxito
              </Link>
              <Link 
                to="/process" 
                onClick={() => setIsMenuOpen(false)} 
                className={`text-3xl font-black uppercase tracking-tight ${location.pathname === '/process' ? 'text-primary' : 'text-white'}`}
              >
                Cómo Trabajamos
              </Link>
              <Link 
                to="/pricing" 
                onClick={() => setIsMenuOpen(false)} 
                className={`text-3xl font-black uppercase tracking-tight ${location.pathname === '/pricing' ? 'text-primary' : 'text-white'}`}
              >
                Planes & Precios
              </Link>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <div className="flex justify-center items-center gap-2 text-xs font-mono text-primary">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <span>AGENDA DISPONIBLE • CONTACTO INMEDIATO</span>
              </div>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl bg-white/5"
              >
                Agendar Asesoría Gratuita (30 Min)
              </button>

              <Link
                to="/onboarding/step1"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-4 bg-primary text-[#070709] font-black text-xs uppercase tracking-widest rounded-xl shadow-glow block text-center"
              >
                Cotizar Mi Página Web
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main View Area */}
      <main className="relative z-10 min-h-[calc(100vh-160px)]">
        {children}
      </main>

      {/* Global Modals & Notifications */}
      <BookingModal />
      <CaseStudyModal />
      <ToastContainer />
      <AIChatWidget />

      {/* Footer with Agilweb Conversion Focus */}
      {!isOnboarding && (
        <footer className="bg-[#030304] border-t border-white/10 pt-20 pb-12 px-6 lg:px-20 relative z-20 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            {/* Top Bar with Guarantees */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-12 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-3 text-white/70">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="font-bold text-white uppercase">GARANTÍAS AGILWEB PARA TU NEGOCIO:</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-white/50">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                  <Award size={13} className="text-primary" />
                  <span>ALTA TASA DE CONVERSIÓN</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                  <Award size={13} className="text-secondary" />
                  <span>OPTIMIZADO PARA GOOGLE Y SEO</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                  <Award size={13} className="text-accent" />
                  <span>ENTREGA RÁPIDA 1-3 SEMANAS</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-12 my-16">
              {/* Brand Col */}
              <div className="md:col-span-5 space-y-6">
                <Link to="/" className="inline-block" data-cursor="Agilweb">
                  <AgilwebLogo size="lg" withBadge={true} />
                </Link>
                
                <p className="text-gray-400 max-w-sm text-sm font-light leading-relaxed">
                  Agencia de diseño y desarrollo web especializada en microempresas, negocios locales y emprendimientos. Creamos páginas web modernas, rápidas y pensadas para captar clientes y aumentar tus ventas.
                </p>

                {/* Direct Contact Links */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyEmail}
                      className="flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono text-white transition-colors"
                      data-cursor="Copiar"
                      title="Copiar correo de Agil Web"
                    >
                      {emailCopied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                      <span className="truncate">agilweb.agencia@gmail.com</span>
                    </button>
                    <a
                      href="mailto:agilweb.agencia@gmail.com"
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-primary transition-colors text-xs"
                      title="Enviar email directo"
                    >
                      <Mail size={15} />
                    </a>
                  </div>

                  {/* Phone & WhatsApp Lines */}
                  <div className="flex flex-col gap-2 pt-1 font-mono text-xs">
                    <div className="flex items-center gap-2 text-white/80">
                      <Phone size={13} className="text-primary shrink-0" />
                      <a href="tel:+573152874596" className="hover:text-primary transition-colors">+57 315 287 4596</a>
                      <span className="text-white/20">•</span>
                      <a
                        href="https://wa.me/573152874596?text=Hola%20Agilweb,%20quiero%20cotizar%20mi%20página%20web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold hover:bg-primary hover:text-[#070709] transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Phone size={13} className="text-primary shrink-0" />
                      <a href="tel:+573103564825" className="hover:text-primary transition-colors">+57 310 356 4825</a>
                      <span className="text-white/20">•</span>
                      <a
                        href="https://wa.me/573103564825?text=Hola%20Agilweb,%20quiero%20cotizar%20mi%20página%20web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold hover:bg-primary hover:text-[#070709] transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation links */}
              <div className="md:col-span-3">
                <h4 className="text-white font-mono font-bold mb-4 uppercase tracking-widest text-xs">
                  NAVEGACIÓN DIRECTA
                </h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors flex items-center justify-between group">
                      <span>Inicio</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolio" className="hover:text-primary transition-colors flex items-center justify-between group">
                      <span>Casos de Éxito</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/process" className="hover:text-primary transition-colors flex items-center justify-between group">
                      <span>Cómo Trabajamos</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="hover:text-primary transition-colors flex items-center justify-between group">
                      <span>Planes & Inversión</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/onboarding/step1" className="text-primary font-bold hover:underline flex items-center justify-between">
                      <span>Cotizador Online</span>
                      <ArrowUpRight size={12} className="text-primary" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact and schedule */}
              <div className="md:col-span-4 space-y-4">
                <h4 className="text-white font-mono font-bold mb-2 uppercase tracking-widest text-xs">
                  IMPULSA TU NEGOCIO HOY
                </h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  ¿Listo para que tu negocio destaque en internet? Reserva una asesoría gratuita de 30 minutos y planifiquemos la web perfecta para ti.
                </p>
                
                <button
                  onClick={() => openBooking()}
                  className="w-full py-3.5 bg-primary text-[#070709] font-black text-xs uppercase tracking-wider rounded-xl shadow-glow hover:bg-white transition-all text-center block"
                  data-cursor="Asesoría"
                >
                  Agendar Asesoría Gratuita (30 Min)
                </button>

                <div className="text-[11px] text-white/50 font-mono pt-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span>📍 Atención Personalizada</span>
                    <span className="text-primary font-bold">RESPUESTA &lt; 24H</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <span>Llámanos:</span>
                    <a href="tel:+573152874596" className="text-primary hover:underline font-bold">+57 315 287 4596</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-mono">
              <div>© 2026 AGILWEB™ • PÁGINAS WEB QUE VENDEN PARA MICROEMPRESAS Y EMPRENDEDORES</div>
              <div className="flex gap-6">
                <button 
                  onClick={() => showToast('Garantizamos la privacidad y seguridad total de tu información.', 'info')}
                  className="hover:text-white transition-colors"
                >
                  Privacidad
                </button>
                <button 
                  onClick={() => showToast('Tu página web y dominio son 100% de tu propiedad.', 'info')}
                  className="hover:text-white transition-colors"
                >
                  Propiedad 100% Tuya
                </button>
                <button 
                  onClick={() => showToast('Desarrollado con React, Tailwind CSS y optimización móvil total.', 'info')}
                  className="hover:text-primary transition-colors"
                >
                  Tecnología Rápida
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
