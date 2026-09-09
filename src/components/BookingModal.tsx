import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, CheckCircle, Video, ArrowRight, User, Mail, Building, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookingModal() {
  const { isBookingOpen, closeBooking, showToast } = useApp();
  const [step, setStep] = useState<'datetime' | 'details' | 'confirmed'>('datetime');
  
  // Selected date & slot
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<number>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.getDate();
  });
  const [selectedMonth] = useState('Agosto 2026');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');

  // Form details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isBookingOpen) return null;

  // Available days generator (next 8 business days)
  const availableDays = Array.from({ length: 8 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return {
      dayNum: d.getDate(),
      dayName: dayNames[d.getDay()],
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    };
  }).filter(d => !d.isWeekend);

  const timeSlots = [
    '09:30 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '04:45 PM', '06:00 PM'
  ];

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Por favor completa tu nombre y correo electrónico.', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setStep('confirmed');
    showToast(`¡Sesión estratégica agendada con éxito para el ${selectedDate} de Agosto a las ${selectedSlot}!`, 'success');
  };

  const resetAndClose = () => {
    setStep('datetime');
    closeBooking();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl glass-panel border border-white/15 bg-[#0d0d12]/95 rounded-3xl shadow-2xl p-6 sm:p-10 z-10 overflow-hidden"
        >
          {/* Background subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={resetAndClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all z-20"
            data-cursor="Cerrar"
          >
            <X size={18} />
          </button>

          {step !== 'confirmed' && (
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary text-xs font-mono font-bold uppercase tracking-widest mb-2">
                <Video size={14} />
                <span>Asesoría Estratégica Gratuita (30 Min)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
                {step === 'datetime' ? 'Selecciona Fecha y Hora' : 'Tus Datos de Contacto'}
              </h2>
              <p className="text-white/60 text-sm mt-1 font-light">
                Analizaremos los objetivos de tu negocio, tu mercado y la mejor estrategia para captar clientes con tu nueva web.
              </p>
            </div>
          )}

          {step === 'datetime' && (
            <div className="space-y-6">
              {/* Date selection */}
              <div>
                <label className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-3">
                  <span>Día Disponible</span>
                  <span className="text-primary font-mono">{selectedMonth}</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {availableDays.map((d) => (
                    <button
                      key={d.dayNum}
                      type="button"
                      onClick={() => setSelectedDate(d.dayNum)}
                      className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                        selectedDate === d.dayNum 
                          ? 'border-primary bg-primary/15 text-primary shadow-glow font-bold' 
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10'
                      }`}
                      data-cursor="Elegir"
                    >
                      <span className="text-[10px] uppercase font-mono tracking-wider">{d.dayName}</span>
                      <span className="text-xl font-bold font-display mt-1">{d.dayNum}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection */}
              <div>
                <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-3">
                  <Clock size={14} />
                  <span>Horarios Disponibles (Hora Local)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 px-4 rounded-xl border text-xs font-mono font-bold transition-all ${
                        selectedSlot === slot 
                          ? 'border-primary bg-primary text-[#070709] shadow-glow' 
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                      }`}
                      data-cursor="Slot"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="text-xs text-white/40 font-mono">
                  Reserva confirmada inmediatamente sin compromiso.
                </div>
                <button
                  onClick={() => setStep('details')}
                  className="flex items-center gap-2 px-8 py-3.5 bg-primary text-[#070709] font-mono font-black text-sm uppercase tracking-wider rounded-xl shadow-glow hover:bg-white transition-all transform hover:scale-102"
                  data-cursor="Continuar"
                >
                  Continuar
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleConfirm} className="space-y-4 font-mono text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                    <User size={13} /> Tu Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Mateo Castillo"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                    <Mail size={13} /> Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mateo@tuempresa.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                    <Building size={13} /> Empresa / Proyecto
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Nova Labs"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                    <Phone size={13} /> Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+57 315 287 4596"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-white/60 mb-2">
                  ¿Qué te gustaría lograr en esta sesión? (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Cuéntanos un poco sobre tu producto, objetivos o preguntas específicas..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                />
              </div>

              <div className="p-3.5 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between text-xs font-mono">
                <span className="text-white/80">
                  📅 Cita: <strong className="text-primary">{selectedDate} de Agosto de 2026</strong> a las <strong className="text-primary">{selectedSlot}</strong> vía Google Meet.
                </span>
                <button
                  type="button"
                  onClick={() => setStep('datetime')}
                  className="text-primary hover:underline font-bold"
                >
                  Cambiar
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('datetime')}
                  className="text-xs text-white/50 hover:text-white uppercase font-bold"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3.5 bg-primary text-[#070709] font-black text-sm uppercase tracking-wider rounded-xl shadow-glow hover:bg-white transition-all transform hover:scale-102 disabled:opacity-50"
                  data-cursor="Confirmar"
                >
                  {isSubmitting ? 'Reservando...' : 'Confirmar Reunión'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-6">
              <div className="size-16 rounded-full bg-primary/20 border-2 border-primary mx-auto flex items-center justify-center text-primary shadow-glow">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight font-display">¡Sesión Confirmada!</h3>
                <p className="text-gray-300 text-sm mt-2 max-w-md mx-auto">
                  Hemos enviado la invitación a <strong>{formData.email}</strong> con el enlace de Google Meet y los detalles del calendario.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2 border-primary/30 font-mono">
                <div className="flex justify-between text-white/60">
                  <span>Fecha:</span>
                  <span className="font-bold text-white">{selectedDate} de Agosto, 2026</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Hora:</span>
                  <span className="font-bold text-white">{selectedSlot}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Asesor:</span>
                  <span className="font-bold text-primary">Director de Estrategia Agilweb</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="px-8 py-3.5 bg-primary text-[#070709] font-mono font-black text-sm uppercase tracking-wider rounded-xl shadow-glow hover:bg-white transition-all"
                data-cursor="Listo"
              >
                Volver al Sitio
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
