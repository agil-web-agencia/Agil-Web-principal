import { motion } from 'motion/react';
import { CheckCircle, Download, MessageSquare, ArrowRight, Copy, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import AgilwebLogo from '../components/AgilwebLogo';

export default function OnboardingSuccess() {
  const location = useLocation();
  const { projectState, resetProjectState, showToast } = useApp();
  const projectId = location.state?.projectId || 'AGIL-948210';
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(projectId);
    setCopied(true);
    showToast(`Código de proyecto ${projectId} copiado al portapapeles.`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadBrief = () => {
    const briefText = `=========================================
AGILWEB™ - RESUMEN DE PROYECTO WEB
ID: ${projectId}
FECHA: ${new Date().toLocaleDateString()}
=========================================

CLIENTE:
- Nombre: ${projectState.clientName || 'Cliente'}
- Empresa: ${projectState.companyName || 'No especificada'}
- Email: ${projectState.clientEmail || 'No especificado'}
- Teléfono: ${projectState.clientPhone || 'No especificado'}

ALCANCE:
- Tipo de Proyecto: ${projectState.projectTypeTitle}
- Presupuesto Estimado: ${projectState.budgetString}
- Plazo de Lanzamiento: ${projectState.timelineTitle}
- Módulos Seleccionados: ${projectState.features.join(', ')}

KICKOFF CALL AGENDADA:
- Fecha: ${projectState.preferredCallDate || 'Próximamente'}
- Hora: ${projectState.preferredCallTime || '10:30 AM'}

DESCRIPCIÓN ADICIONAL:
${projectState.projectDescription || 'Sin notas adicionales'}

=========================================
Agilweb Digital Studio • contacto@agilweb.io
=========================================`;

    const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Brief-Agilweb-${projectId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Brief descargado con éxito.', 'success');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl text-center space-y-8"
      >
        <div className="flex justify-center mb-4">
          <AgilwebLogo size={64} />
        </div>

        <div className="size-20 rounded-full bg-primary/20 border-2 border-primary mx-auto flex items-center justify-center text-primary shadow-[0_0_30px_rgba(19,236,91,0.4)]">
          <CheckCircle size={40} />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <span>¡PROPUESTA ENVIADA CON ÉXITO!</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-display">
            Bienvenido a Agilweb<span className="text-primary">.</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mt-3 max-w-lg mx-auto font-light leading-relaxed">
            Nuestro equipo de ingeniería y dirección técnica está revisando los detalles. Te contactaremos en menos de 2 horas.
          </p>
        </div>

        {/* Project ID badge */}
        <div className="glass-panel p-6 rounded-2xl border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-lg mx-auto text-left">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-white/40 block">
              IDENTIFICADOR DE TU PROYECTO
            </span>
            <span className="text-2xl font-mono font-black text-primary tracking-wider">
              {projectId}
            </span>
          </div>

          <button
            onClick={handleCopyId}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono font-bold text-white transition-colors"
            data-cursor="Copiar"
          >
            {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
            {copied ? 'Copiado' : 'Copiar ID'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-2 font-mono">
          <button
            onClick={handleDownloadBrief}
            className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
            data-cursor="Descargar"
          >
            <Download size={16} />
            Descargar Brief en TXT
          </button>

          <a
            href="https://wa.me/34600000000?text=Hola%20Agilweb,%20he%20enviado%20mi%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 bg-primary text-[#070709] font-black rounded-xl text-xs uppercase tracking-wider shadow-glow hover:bg-white transition-all transform hover:scale-102"
            data-cursor="WhatsApp"
          >
            <MessageSquare size={16} />
            Hablar por WhatsApp
          </a>
        </div>

        <div className="pt-6 border-t border-white/10">
          <Link
            to="/"
            onClick={resetProjectState}
            className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-xs font-mono font-bold uppercase tracking-widest"
          >
            Volver a la Página Principal
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
