import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

interface ThreeHeroCanvasProps {
  interactive?: boolean;
  className?: string;
  theme?: 'green' | 'violet' | 'cyan';
}

// 8-Bit Voxel Cursor Matrix (B = Border Cube, W = Fill Cube, . = Empty)
const VOXEL_GRID = [
  "B...............", // 0
  "BB..............", // 1
  "BWB.............", // 2
  "BWWB............", // 3
  "BWWWB...........", // 4
  "BWWWWB..........", // 5
  "BWWWWWB.........", // 6
  "BWWWWWWB........", // 7
  "BWWWWWWWB.......", // 8
  "BWWWWWWWWB......", // 9
  "BWWWWWWWWWB.....", // 10
  "BWWWWWWWWWWBB...", // 11
  "BWWWWWWBBBBBB...", // 12
  "BWWWB.BWWB......", // 13
  "BWWB...BWWB.....", // 14
  "BWB....BWWB.....", // 15
  "BB......BWWB....", // 16
  "B.......BWWB....", // 17
  ".........BBBB...", // 18
];

export default function ThreeHeroCanvas({
  interactive = true,
  className = ''
}: ThreeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // 1. Scene, Camera, Renderer (Optimized for Mobile & Desktop)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      60
    );
    camera.position.z = isMobile ? 8.2 : 7.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable MSAA on mobile for huge fill-rate boost on high-DPI screens
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp'
    });

    const pixelRatio = isMobile
      ? Math.min(window.devicePixelRatio, 1.2)
      : Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Main Group for the 3D Voxel Cursor
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Voxel Configuration
    const cubeSize = 0.22;
    const cubeSpacing = 0.235;
    const borderDepth = 0.44;
    const fillDepth = 0.38;

    // Calculate Grid Bounds to center the cursor
    let minCol = 99, maxCol = 0, minRow = 99, maxRow = 0;
    VOXEL_GRID.forEach((rowStr, r) => {
      for (let c = 0; c < rowStr.length; c++) {
        if (rowStr[c] !== '.') {
          minCol = Math.min(minCol, c);
          maxCol = Math.max(maxCol, c);
          minRow = Math.min(minRow, r);
          maxRow = Math.max(maxRow, r);
        }
      }
    });

    const centerCol = (minCol + maxCol) / 2;
    const centerRow = (minRow + maxRow) / 2;

    // Collect individual geometries for single-draw-call merging
    const borderGeos: THREE.BufferGeometry[] = [];
    const fillGeos: THREE.BufferGeometry[] = [];
    const edgeGeos: THREE.BufferGeometry[] = [];
    const glowEdgeGeos: THREE.BufferGeometry[] = [];

    VOXEL_GRID.forEach((rowStr, r) => {
      for (let c = 0; c < rowStr.length; c++) {
        const type = rowStr[c];
        if (type === '.') continue;

        const isBorder = type === 'B';
        const posX = (c - centerCol) * cubeSpacing;
        const posY = -(r - centerRow) * cubeSpacing;
        const posZ = isBorder ? 0.02 : 0;
        const depth = isBorder ? borderDepth : fillDepth;

        // Box Mesh geometry
        const boxGeo = new THREE.BoxGeometry(cubeSize, cubeSize, depth);
        boxGeo.translate(posX, posY, posZ);

        if (isBorder) {
          borderGeos.push(boxGeo);
        } else {
          fillGeos.push(boxGeo);
        }

        // Crisp wireframe edge geometry
        const edges = new THREE.EdgesGeometry(boxGeo);
        edgeGeos.push(edges);

        // Soft lens aura edge geometry (slightly dilated)
        const glowBox = new THREE.BoxGeometry(cubeSize * 1.05, cubeSize * 1.05, depth * 1.05);
        glowBox.translate(posX, posY, posZ);
        const glowEdges = new THREE.EdgesGeometry(glowBox);
        glowEdgeGeos.push(glowEdges);
      }
    });

    // Merge into unified BufferGeometries (reduces 240+ draw calls down to 4!)
    const mergedBorderGeo = BufferGeometryUtils.mergeGeometries(borderGeos);
    const mergedFillGeo = BufferGeometryUtils.mergeGeometries(fillGeos);
    const mergedEdgeGeo = BufferGeometryUtils.mergeGeometries(edgeGeos);
    const mergedGlowEdgeGeo = BufferGeometryUtils.mergeGeometries(glowEdgeGeos);

    // Clean up temporary geometries
    borderGeos.forEach(g => g.dispose());
    fillGeos.forEach(g => g.dispose());
    edgeGeos.forEach(g => g.dispose());
    glowEdgeGeos.forEach(g => g.dispose());

    // 2. High-Performance Standard Materials (No heavy transmission pass)
    const borderMaterial = new THREE.MeshStandardMaterial({
      color: 0x080e0a,
      emissive: 0x02160a,
      emissiveIntensity: 0.35,
      roughness: 0.18,
      metalness: 0.92
    });

    const fillMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d2015,
      emissive: 0x052e15,
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85
    });

    const greenWireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x13ec5b,
      transparent: true,
      opacity: 0.92
    });

    const softGlowWireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x22ff6e,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });

    // 3. Single-Draw-Call Meshes
    const cursorGroup = new THREE.Group();

    if (mergedBorderGeo) {
      const borderMesh = new THREE.Mesh(mergedBorderGeo, borderMaterial);
      cursorGroup.add(borderMesh);
    }
    if (mergedFillGeo) {
      const fillMesh = new THREE.Mesh(mergedFillGeo, fillMaterial);
      cursorGroup.add(fillMesh);
    }
    if (mergedEdgeGeo) {
      const wireframe = new THREE.LineSegments(mergedEdgeGeo, greenWireframeMaterial);
      cursorGroup.add(wireframe);
    }
    if (mergedGlowEdgeGeo) {
      const glowWireframe = new THREE.LineSegments(mergedGlowEdgeGeo, softGlowWireframeMaterial);
      cursorGroup.add(glowWireframe);
    }

    cursorGroup.rotation.z = 0.08;
    mainGroup.add(cursorGroup);

    // 4. Ambient Floating Dust Particles (Optimized count)
    const particleCount = isMobile ? 50 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x13ec5b,
      size: isMobile ? 0.03 : 0.035,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Multi-Directional, Less Frequent Shooting Stars
    const SHOOTING_STARS_COUNT = 2; // Lean pool
    interface ShootingStar {
      trailMesh: THREE.Line;
      headMesh: THREE.Mesh;
      active: boolean;
      progress: number;
      speed: number;
      startPos: THREE.Vector3;
      endPos: THREE.Vector3;
      nextLaunchTime: number;
    }

    const shootingStars: ShootingStar[] = [];
    const starsGroup = new THREE.Group();
    scene.add(starsGroup);

    const headGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const starColors = [
      new THREE.Color(0x13ec5b), // Emerald
      new THREE.Color(0x38bdf8), // Cyan
    ];

    for (let i = 0; i < SHOOTING_STARS_COUNT; i++) {
      const color = starColors[i % starColors.length];

      const trailGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
      ]);
      const trailMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      const trailMesh = new THREE.Line(trailGeo, trailMat);
      trailMesh.visible = false;
      starsGroup.add(trailMesh);

      const headMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.visible = false;
      starsGroup.add(headMesh);

      shootingStars.push({
        trailMesh,
        headMesh,
        active: false,
        progress: 0,
        speed: 0.011,
        startPos: new THREE.Vector3(),
        endPos: new THREE.Vector3(),
        // Staggered long launch times (spacious and infrequent)
        nextLaunchTime: 6.0 + i * 12.0 + Math.random() * 8.0
      });
    }

    // Shared Dynamic Star Accent Flash (single light instead of multiple heavy point lights)
    const starFlashLight = new THREE.PointLight(0x13ec5b, 0, 10);
    scene.add(starFlashLight);

    const launchShootingStar = (star: ShootingStar) => {
      star.active = true;
      star.progress = 0;
      star.speed = 0.010 + Math.random() * 0.012; // Elegant, smooth gliding pace

      // Multi-directional trajectory: anywhere on 360-degree perimeter
      const radius = 8.5 + Math.random() * 2.0;
      const startAngle = Math.random() * Math.PI * 2;
      const targetAngle = startAngle + Math.PI + (Math.random() - 0.5) * 1.2;

      const startX = Math.cos(startAngle) * radius;
      const startY = Math.sin(startAngle) * radius;
      const startZ = (Math.random() - 0.5) * 4.0;

      const endX = Math.cos(targetAngle) * radius;
      const endY = Math.sin(targetAngle) * radius;
      const endZ = startZ + (Math.random() - 0.5) * 3.0;

      star.startPos.set(startX, startY, startZ);
      star.endPos.set(endX, endY, endZ);

      star.trailMesh.visible = true;
      star.headMesh.visible = true;
    };

    // 6. Balanced, High-Performance Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    const greenAccentLight = new THREE.PointLight(0x13ec5b, 2.4, 18);
    greenAccentLight.position.set(-3, -2, 4);
    scene.add(greenAccentLight);

    // 7. Responsive Interaction Handling
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let clickPulse = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = Math.max(-1, Math.min(1, x));
      mouse.targetY = Math.max(-1, Math.min(1, y));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.targetX = Math.max(-1, Math.min(1, x));
        mouse.targetY = Math.max(-1, Math.min(1, y));
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleClick = () => {
      clickPulse = 1.0;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      container.addEventListener('click', handleClick);
    }

    // 8. Resize Observer with Debounce / Guard
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 9. Intersection Observer (Pauses render loop completely when user scrolls away!)
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    // 10. Smooth Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // If hero is scrolled out of view, skip 3D rendering to save 100% GPU
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Group Rotation & Floating
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.6) * 0.1 + mouse.y * 0.45;
      mainGroup.rotation.y = elapsedTime * 0.2 + mouse.x * 0.65;
      mainGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.06 - mouse.x * 0.12;

      // Levitation position
      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.1 - (scrollY * 0.0006);
      mainGroup.position.x = mouse.x * 0.3;

      // Subtle breathing pulse + click impulse on cursor
      if (clickPulse > 0.01) {
        clickPulse *= 0.92;
      }
      const scaleEffect = 1.0 + Math.sin(elapsedTime * 2.0) * 0.015 + clickPulse * 0.08;
      cursorGroup.scale.set(scaleEffect, scaleEffect, scaleEffect);

      // Shooting stars animation
      let activeFlashIntensity = 0;
      let activeFlashPos: THREE.Vector3 | null = null;

      shootingStars.forEach((star) => {
        if (!star.active) {
          if (elapsedTime >= star.nextLaunchTime) {
            launchShootingStar(star);
          }
        } else {
          star.progress += star.speed;

          if (star.progress >= 1.0) {
            star.active = false;
            star.trailMesh.visible = false;
            star.headMesh.visible = false;
            // Less frequent launches: 12 to 24 seconds delay
            star.nextLaunchTime = elapsedTime + 12.0 + Math.random() * 12.0;
          } else {
            const currentPos = new THREE.Vector3().lerpVectors(
              star.startPos,
              star.endPos,
              star.progress
            );

            const trailProgress = Math.max(0, star.progress - 0.12);
            const tailPos = new THREE.Vector3().lerpVectors(
              star.startPos,
              star.endPos,
              trailProgress
            );

            star.headMesh.position.copy(currentPos);

            const posAttr = star.trailMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
            posAttr.setXYZ(0, currentPos.x, currentPos.y, currentPos.z);
            posAttr.setXYZ(1, tailPos.x, tailPos.y, tailPos.z);
            posAttr.needsUpdate = true;

            const fade = Math.sin(star.progress * Math.PI);
            (star.trailMesh.material as THREE.LineBasicMaterial).opacity = fade * 0.8;
            (star.headMesh.material as THREE.MeshBasicMaterial).opacity = fade * 0.95;

            if (fade > activeFlashIntensity) {
              activeFlashIntensity = fade;
              activeFlashPos = currentPos;
            }
          }
        }
      });

      // Update shared star flash reflection light
      if (activeFlashPos && activeFlashIntensity > 0.05) {
        starFlashLight.position.copy(activeFlashPos);
        starFlashLight.intensity = activeFlashIntensity * 2.5;
      } else {
        starFlashLight.intensity = 0;
      }

      // Rotate particle field very gently
      particles.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Complete Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('scroll', handleScroll);
        container.removeEventListener('click', handleClick);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      mergedBorderGeo?.dispose();
      mergedFillGeo?.dispose();
      mergedEdgeGeo?.dispose();
      mergedGlowEdgeGeo?.dispose();
      borderMaterial.dispose();
      fillMaterial.dispose();
      greenWireframeMaterial.dispose();
      softGlowWireframeMaterial.dispose();
      headGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      shootingStars.forEach(s => {
        s.trailMesh.geometry.dispose();
        (s.trailMesh.material as THREE.Material).dispose();
        (s.headMesh.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 3D WebGL Canvas Layer - Clean, Hardware-Accelerated without laggy CSS filters */}
      <div 
        ref={containerRef} 
        className={`absolute inset-0 pointer-events-auto cursor-grab active:cursor-grabbing ${className}`}
        title="Arrastra para rotar el cursor 3D"
      />
      
      {/* Zero-Cost Ambient Radial Glow (Static background gradient, no backdrop-filter overhead) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(19,236,91,0.06)_0%,transparent_60%)]" />
    </div>
  );
}
