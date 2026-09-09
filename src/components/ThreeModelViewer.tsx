import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Box, 
  Layers, 
  RotateCw, 
  Sparkles, 
  Sliders, 
  Eye, 
  Activity, 
  Maximize2,
  Minimize2,
  RefreshCw,
  Cpu
} from 'lucide-react';

type GeometryType = 'cursor' | 'icosahedron' | 'dodecahedron' | 'torus' | 'octahedron';
type MaterialStyle = 'hologram' | 'glass' | 'wireframe' | 'iridescent';

export default function ThreeModelViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State controls
  const [selectedGeo, setSelectedGeo] = useState<GeometryType>('cursor');
  const [selectedMat, setSelectedMat] = useState<MaterialStyle>('hologram');
  const [accentColor, setAccentColor] = useState<string>('#13ec5b');
  const [isWireframe, setIsWireframe] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.2);
  const [autoRotate, setAutoRotate] = useState(true);
  const [fps, setFps] = useState(60);

  // Three.js internal refs
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const mainMeshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshRef = useRef<THREE.LineSegments | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // Geometry Creator
    const createGeo = (type: GeometryType): THREE.BufferGeometry => {
      switch (type) {
        case 'cursor': {
          const s = new THREE.Shape();
          s.moveTo(0, 1.8);
          s.lineTo(1.3, -0.9);
          s.lineTo(0.5, -0.65);
          s.lineTo(0.7, -1.8);
          s.lineTo(-0.05, -1.8);
          s.lineTo(-0.25, -0.65);
          s.lineTo(-1.2, -0.45);
          s.closePath();
          const geo = new THREE.ExtrudeGeometry(s, { depth: 0.35, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.06, bevelSegments: 3 });
          geo.center();
          return geo;
        }
        case 'icosahedron':
          return new THREE.IcosahedronGeometry(1.5, 2);
        case 'dodecahedron':
          return new THREE.DodecahedronGeometry(1.5, 1);
        case 'torus':
          return new THREE.TorusGeometry(1.3, 0.4, 30, 100);
        case 'octahedron':
          return new THREE.OctahedronGeometry(1.6, 2);
        default:
          return new THREE.IcosahedronGeometry(1.5, 2);
      }
    };

    // Material Creator
    const createMat = (style: MaterialStyle, colorHex: string, wire: boolean): THREE.Material => {
      const colorNum = new THREE.Color(colorHex).getHex();
      
      switch (style) {
        case 'glass':
          return new THREE.MeshPhysicalMaterial({
            color: 0x050508,
            emissive: colorNum,
            emissiveIntensity: 0.15,
            roughness: 0.1,
            metalness: 0.1,
            transmission: 0.8,
            ior: 1.6,
            thickness: 1.2,
            wireframe: wire
          });
        case 'wireframe':
          return new THREE.MeshBasicMaterial({
            color: colorNum,
            wireframe: true
          });
        case 'iridescent':
          return new THREE.MeshPhysicalMaterial({
            color: 0x111116,
            emissive: colorNum,
            emissiveIntensity: 0.4,
            metalness: 0.9,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            wireframe: wire
          });
        case 'hologram':
        default:
          return new THREE.MeshStandardMaterial({
            color: 0x090a10,
            emissive: colorNum,
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.8,
            wireframe: wire
          });
      }
    };

    // Initialize initial meshes
    let currentGeo = createGeo(selectedGeo);
    let currentMat = createMat(selectedMat, accentColor, isWireframe);

    const mainMesh = new THREE.Mesh(currentGeo, currentMat);
    group.add(mainMesh);
    mainMeshRef.current = mainMesh;

    // Overlay Wireframe helper
    const wireGeo = new THREE.WireframeGeometry(currentGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor).getHex(),
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    group.add(wireMesh);
    wireMeshRef.current = wireMesh;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pLight1 = new THREE.PointLight(new THREE.Color(accentColor).getHex(), 4, 15);
    pLight1.position.set(3, 3, 3);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0x8b5cf6, 3, 15);
    pLight2.position.set(-3, -3, 3);
    scene.add(pLight2);

    // Mouse drag rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      meshGroupRef.current.rotation.y += deltaX * 0.008;
      meshGroupRef.current.rotation.x += deltaY * 0.008;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      // FPS calculation
      frameCount++;
      if (currentTime - fpsTimer >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - fpsTimer)));
        frameCount = 0;
        fpsTimer = currentTime;
      }

      const delta = (currentTime - lastTime) * 0.001;
      lastTime = currentTime;

      if (autoRotate && !isDragging && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += delta * rotationSpeed;
        meshGroupRef.current.rotation.x += delta * 0.4 * rotationSpeed;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      currentGeo.dispose();
      currentMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, [selectedGeo, selectedMat, accentColor, isWireframe, autoRotate, rotationSpeed]);

  return (
    <div className="glass-panel rounded-3xl p-6 lg:p-8 border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] opacity-30 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: accentColor }}
      />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-primary">
            <Cpu size={18} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
              DEMOSTRACIÓN DE FLUIDEZ & TECNOLOGÍA VISUAL
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Diseño Moderno & Experiencia Interactiva
            </h3>
          </div>
        </div>

        {/* Telemetry badges */}
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary animate-ping" />
            <span>{fps} FPS // FLUIDEZ TOTAL</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            MOTOR AGILWEB
          </div>
        </div>
      </div>

      {/* 3D Canvas Viewport + Interactive HUD */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6 items-center">
        <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-2xl bg-black/40 border border-white/10 overflow-hidden group">
          {/* Three.js viewport */}
          <div 
            ref={containerRef} 
            className="w-full h-full cursor-grab active:cursor-grabbing"
            title="Arrastra con el ratón para rotar el modelo libremente"
          />

          {/* Grid lines aesthetic overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
          
          <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 text-[10px] font-mono text-white/50 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <RotateCw size={12} className="text-primary animate-spin" />
            <span>ARRASTRA PARA INTERACTUAR</span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-lg text-xs font-mono border transition-all ${
                autoRotate ? 'bg-primary/20 border-primary text-primary' : 'bg-black/60 border-white/10 text-white/50'
              }`}
              title={autoRotate ? 'Pausar auto-rotación' : 'Activar auto-rotación'}
            >
              <RotateCw size={14} />
            </button>
          </div>
        </div>

        {/* Control Panel Inspector */}
        <div className="lg:col-span-4 space-y-5">
          {/* Geometry Selector */}
          <div>
            <label className="text-[11px] font-mono uppercase font-bold text-white/60 block mb-2">
              Elemento Interactivo:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'cursor', label: 'Cursor Agilweb' },
                { id: 'icosahedron', label: 'Prisma Icosaedro' },
                { id: 'dodecahedron', label: 'Poliedro Digital' },
                { id: 'torus', label: 'Anillo Dinámico' },
                { id: 'octahedron', label: 'Octaedro Cristal' },
              ].map(geo => (
                <button
                  key={geo.id}
                  onClick={() => setSelectedGeo(geo.id as GeometryType)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                    selectedGeo === geo.id
                      ? 'border-primary bg-primary/10 text-white shadow-glow-sm'
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span>{geo.label}</span>
                  {selectedGeo === geo.id && <span className="size-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Material Shader Selector */}
          <div>
            <label className="text-[11px] font-mono uppercase font-bold text-white/60 block mb-2">
              Shader de Superficie:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'hologram', label: 'Holográfico' },
                { id: 'glass', label: 'Cristal 3D' },
                { id: 'iridescent', label: 'Iridescente' },
                { id: 'wireframe', label: 'Wireframe' },
              ].map(mat => (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMat(mat.id as MaterialStyle)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                    selectedMat === mat.id
                      ? 'border-primary bg-primary/10 text-white shadow-glow-sm'
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span>{mat.label}</span>
                  {selectedMat === mat.id && <span className="size-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div>
            <label className="text-[11px] font-mono uppercase font-bold text-white/60 block mb-2">
              Tono de Iluminación:
            </label>
            <div className="flex items-center gap-3">
              {[
                { hex: '#13ec5b', label: 'Emerald' },
                { hex: '#8b5cf6', label: 'Violet' },
                { hex: '#38bdf8', label: 'Cyan' },
                { hex: '#f59e0b', label: 'Amber' },
                { hex: '#ec4899', label: 'Pink' }
              ].map(color => (
                <button
                  key={color.hex}
                  onClick={() => setAccentColor(color.hex)}
                  className={`size-8 rounded-xl border-2 transition-transform ${
                    accentColor === color.hex ? 'scale-110 border-white shadow-glow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {/* Rotation Speed Range Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] font-mono uppercase text-white/60 mb-2">
              <span>Velocidad de Giro:</span>
              <span className="text-primary font-bold">{rotationSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={rotationSpeed}
              onChange={e => setRotationSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
