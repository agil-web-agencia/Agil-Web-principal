import { useState, useRef, ReactNode, MouseEvent, Key } from 'react';
import { motion } from 'motion/react';

interface ThreeFloatingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  dataCursor?: string;
  onClick?: () => void;
  key?: Key;
}

export default function ThreeFloatingCard({
  children,
  className = '',
  glowColor = 'rgba(19, 236, 91, 0.3)',
  intensity = 15,
  dataCursor,
  onClick
}: ThreeFloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -intensity;
    const rY = ((x - centerX) / centerX) * intensity;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      className="perspective-1000"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.1 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`relative glass-panel rounded-3xl transition-all duration-200 group overflow-hidden ${className}`}
        data-cursor={dataCursor}
      >
        {/* Holographic dynamic glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, transparent 60%)`,
          }}
        />

        {/* Ambient border glow on hover */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-primary/40 transition-colors pointer-events-none z-20" />

        {/* Card Content with 3D Pop depth */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
