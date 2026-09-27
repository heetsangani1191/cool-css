'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera, Html, Box, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Continuous3DCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activeSectionIndex: number;
}

// ----------------------------------------------------
// 01 & 14. Master CSS Core Sphere
// ----------------------------------------------------
function CoreSphere({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (0.2 + scrollProgress * 1.5);
      meshRef.current.rotation.y += delta * (0.3 + scrollProgress * 2.0);

      // Section 14 convergence or Section 01 explosive expansion
      if (scrollProgress > 0.95) {
        meshRef.current.scale.lerp(new THREE.Vector3(2.2, 2.2, 2.2), 0.05);
      } else if (scrollProgress > 0.05 && scrollProgress < 0.12) {
        meshRef.current.scale.lerp(new THREE.Vector3(0.2, 0.2, 0.2), 0.08);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.05);
      }
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color={scrollProgress > 0.6 ? '#8b5cf6' : scrollProgress > 0.3 ? '#ec4899' : '#3b82f6'}
        attach="material"
        distort={0.35 + Math.sin(scrollProgress * Math.PI * 4) * 0.2}
        speed={3}
        roughness={0.15}
        metalness={0.85}
        clearcoat={1}
      />
    </Sphere>
  );
}

// ----------------------------------------------------
// Transition Particles System across all scenes
// ----------------------------------------------------
function GlobalParticleSystem({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.3;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={scrollProgress > 0.7 ? '#f43f5e' : scrollProgress > 0.4 ? '#38bdf8' : '#818cf8'}
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

// ----------------------------------------------------
// Section 03 & 04 & 09: Browser & Device Rig Frame
// ----------------------------------------------------
function BrowserDeviceRig({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      // Visible during Sections 3, 4, 9
      const isVisible = (scrollProgress >= 0.12 && scrollProgress <= 0.28) || (scrollProgress >= 0.56 && scrollProgress <= 0.68);
      const targetScale = isVisible ? 1 : 0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

      if (scrollProgress >= 0.21 && scrollProgress <= 0.28) {
        // Section 4 Responsive Split: rotate slightly to showcase 3D depth
        groupRef.current.rotation.y = Math.sin(scrollProgress * 20) * 0.25;
      } else {
        groupRef.current.rotation.y = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 1]}>
      {/* Outer 3D Glass Viewport */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.5, 2.8, 0.1]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          thickness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Top Browser Bar */}
      <mesh position={[0, 1.25, 0.06]}>
        <boxGeometry args={[4.4, 0.25, 0.02]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Windows control dots */}
      <mesh position={[-2.0, 1.25, 0.08]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-1.85, 1.25, 0.08]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[-1.7, 1.25, 0.08]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------
// Section 06: Flexbox Glowing Alignment Axis & 3D Blocks
// ----------------------------------------------------
function Flexbox3DBlocks({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      const isVisible = scrollProgress >= 0.33 && scrollProgress <= 0.43;
      const targetScale = isVisible ? 1 : 0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
  });

  const blockColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <group ref={groupRef} position={[0, -0.2, 2]}>
      {/* Horizontal Axis Glow Bar */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 0.05, 0.05]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>
      {blockColors.map((col, idx) => {
        const posX = (idx - 2) * 0.9;
        return (
          <Float key={idx} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={[posX, 0.4, 0]}>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshStandardMaterial color={col} roughness={0.2} metalness={0.8} />
              <Html center distanceFactor={8}>
                <div className="text-[10px] font-mono font-bold bg-slate-900/90 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/40">
                  {idx + 1}
                </div>
              </Html>
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// ----------------------------------------------------
// Section 07: Grid Matrix 3D Cell Grid
// ----------------------------------------------------
function GridMatrix3D({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      const isVisible = scrollProgress >= 0.41 && scrollProgress <= 0.51;
      const targetScale = isVisible ? 1 : 0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      groupRef.current.rotation.x = Math.sin(scrollProgress * 15) * 0.15;
    }
  });

  const gridCells = Array.from({ length: 9 });

  return (
    <group ref={groupRef} position={[0, 0, 1.8]}>
      {gridCells.map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = (col - 1) * 1.1;
        const y = (1 - row) * 1.1;

        return (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[0.95, 0.95, 0.15]} />
            <meshStandardMaterial color="#8b5cf6" roughness={0.3} metalness={0.7} wireframe={i % 2 === 1} />
          </mesh>
        );
      })}
    </group>
  );
}

// ----------------------------------------------------
// Section 08: Orbiting UI Component Constellation
// ----------------------------------------------------
function ComponentGalaxy3D({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const isVisible = scrollProgress >= 0.49 && scrollProgress <= 0.59;
      const targetScale = isVisible ? 1 : 0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  const components = [
    { label: 'Button', color: '#3b82f6', pos: [-2.2, 1.2, 0] },
    { label: 'Card', color: '#ec4899', pos: [2.2, 1.0, 0] },
    { label: 'Navbar', color: '#10b981', pos: [-2.5, -1.0, 0] },
    { label: 'Input', color: '#f59e0b', pos: [2.4, -1.2, 0] },
    { label: 'Modal', color: '#8b5cf6', pos: [0, 2.0, 0] },
    { label: 'Badge', color: '#06b6d4', pos: [0, -2.0, 0] },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 1.5]}>
      {components.map((c, i) => (
        <Float key={i} speed={2} floatIntensity={1.5}>
          <mesh position={c.pos as [number, number, number]}>
            <boxGeometry args={[1.2, 0.5, 0.2]} />
            <meshStandardMaterial color={c.color} roughness={0.2} metalness={0.8} />
            <Html center distanceFactor={7}>
              <div className="px-2 py-1 rounded bg-slate-950/90 text-white font-mono text-[11px] border border-white/20 shadow-lg font-bold pointer-events-none whitespace-nowrap">
                {c.label}
              </div>
            </Html>
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ----------------------------------------------------
// Section 10: CSS Art 3D Geometries (Glass, Neon, Soft Depth)
// ----------------------------------------------------
function CssArt3DGeometries({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const isVisible = scrollProgress >= 0.65 && scrollProgress <= 0.75;
      const targetScale = isVisible ? 1 : 0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      groupRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 1.8]}>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-1.6, 0.5, 0]}>
          <torusKnotGeometry args={[0.5, 0.18, 128, 32]} />
          <meshPhysicalMaterial color="#f43f5e" roughness={0.1} metalness={0.9} clearcoat={1} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8}>
        <mesh position={[1.6, -0.4, 0]}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

// ----------------------------------------------------
// Main Continuous Camera Controller
// ----------------------------------------------------
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  useFrame(() => {
    if (cameraRef.current) {
      // Dynamic z position and subtle wobble as user scrolls through the 14 sections
      const targetZ = 6 + Math.sin(scrollProgress * Math.PI * 6) * 0.8;
      const targetY = (0.5 - scrollProgress) * 2;
      const targetX = Math.sin(scrollProgress * Math.PI * 4) * 0.5;

      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.05);
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.05);

      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 6]} fov={50} />;
}

export const Continuous3DCanvas: React.FC<Continuous3DCanvasProps> = ({ scrollProgress, activeSectionIndex }) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <CameraController scrollProgress={scrollProgress} />

        {/* Dynamic Color Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.8}
          color={scrollProgress > 0.7 ? '#f43f5e' : scrollProgress > 0.4 ? '#38bdf8' : '#818cf8'}
        />
        <pointLight
          position={[-10, -10, -5]}
          intensity={1.2}
          color={scrollProgress > 0.8 ? '#eab308' : '#ec4899'}
        />

        {/* Persistent 3D Core & Scene Groups */}
        <CoreSphere scrollProgress={scrollProgress} />
        <GlobalParticleSystem scrollProgress={scrollProgress} />

        {/* Specialized 3D Section Scenes */}
        <BrowserDeviceRig scrollProgress={scrollProgress} />
        <Flexbox3DBlocks scrollProgress={scrollProgress} />
        <GridMatrix3D scrollProgress={scrollProgress} />
        <ComponentGalaxy3D scrollProgress={scrollProgress} />
        <CssArt3DGeometries scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
