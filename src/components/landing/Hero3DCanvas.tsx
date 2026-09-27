'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 3D CSS Core Sphere with animated distort shader material
function CSSCoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
}

// Floating 3D Cubes representing CSS layout boxes
function FloatingCSSCube({ position, color, speed = 1, rotationSpeed = 0.5 }: { position: [number, number, number]; color: string; speed?: number; rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed * 1.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
    </Float>
  );
}

// Floating Particle Field for futuristic background depth
function ParticlesField({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#60a5fa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export const Hero3DCanvas: React.FC = () => {
  return (
    <div className="w-full h-[500px] md:h-[650px] relative">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ec4899" />

        <CSSCoreSphere />

        {/* Floating CSS Property Geometry Objects */}
        <FloatingCSSCube position={[-3, 2, -1]} color="#60a5fa" speed={1.5} />
        <FloatingCSSCube position={[3.2, -1.5, 0.5]} color="#a855f7" speed={2} />
        <FloatingCSSCube position={[-2.5, -2, -2]} color="#ec4899" speed={1.2} />
        <FloatingCSSCube position={[2.8, 2.2, -1.5]} color="#34d399" speed={1.8} />

        <ParticlesField count={120} />
      </Canvas>
    </div>
  );
};
