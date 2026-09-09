import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
              t.type === 'success'
                ? 'bg-bg-dark/95 border-primary/40 text-white shadow-[0_0_20px_rgba(19,236,91,0.2)]'
                : t.type === 'error'
                ? 'bg-bg-dark/95 border-red-500/40 text-white'
                : 'bg-bg-dark/95 border-white/20 text-white'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === 'success' && <CheckCircle2 className="text-primary" size={18} />}
              {t.type === 'error' && <AlertCircle className="text-red-400" size={18} />}
              {t.type === 'info' && <Info className="text-secondary" size={18} />}
            </div>

            <p className="text-xs text-white/90 leading-relaxed flex-1 font-medium">{t.message}</p>

            <button
              onClick={() => dismissToast(t.id)}
              className="text-white/40 hover:text-white shrink-0 p-0.5 rounded transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
