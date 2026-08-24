'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function ArchitecturalModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Slow gentle idle rotation
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={0.95}>
      {/* Multi-tiered Architectural Plinth / Foundation */}
      <RoundedBox args={[5.2, 0.16, 4.2]} radius={0.03} smoothness={4} position={[0, -0.08, 0]}>
        <meshStandardMaterial color="#f5f4ef" roughness={0.7} metalness={0.05} />
      </RoundedBox>

      {/* Raised Terraced Entrance Steps */}
      <RoundedBox args={[2.2, 0.08, 1.4]} radius={0.02} smoothness={4} position={[-0.8, 0.04, 1.6]}>
        <meshStandardMaterial color="#ebe8e0" roughness={0.6} />
      </RoundedBox>

      {/* Main Ground Floor Limestone Mass */}
      <RoundedBox args={[2.4, 1.6, 2.8]} radius={0.03} smoothness={4} position={[-0.9, 0.88, 0]}>
        <meshStandardMaterial color="#eae5da" roughness={0.7} metalness={0.05} />
      </RoundedBox>

      {/* Main Ground Floor Glass Corner Pavilion */}
      <RoundedBox args={[2.4, 1.56, 2.6]} radius={0.02} smoothness={4} position={[1.0, 0.86, 0.3]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.92}
          opacity={1}
          transparent
          roughness={0.04}
          ior={1.48}
          thickness={0.5}
          specularColor="#ffffff"
        />
      </RoundedBox>

      {/* Ground Floor Slim Architectural Dark Frames */}
      <mesh position={[2.18, 0.86, 1.58]}>
        <boxGeometry args={[0.04, 1.56, 0.04]} />
        <meshStandardMaterial color="#1a1c1e" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[-0.18, 0.86, 1.58]}>
        <boxGeometry args={[0.04, 1.56, 0.04]} />
        <meshStandardMaterial color="#1a1c1e" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Champagne Gold Cantilever Columns */}
      <mesh position={[2.15, 0.86, 1.55]}>
        <cylinderGeometry args={[0.02, 0.02, 1.56, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Second Floor Cantilever Volume */}
      <RoundedBox args={[2.8, 1.4, 2.4]} radius={0.03} smoothness={4} position={[0.2, 2.36, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.05} />
      </RoundedBox>

      {/* Second Floor Master Bedroom Glass Balcony */}
      <RoundedBox args={[1.8, 1.2, 1.6]} radius={0.02} smoothness={4} position={[0.6, 2.26, 0.6]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.90}
          opacity={1}
          transparent
          roughness={0.05}
          ior={1.46}
          thickness={0.4}
        />
      </RoundedBox>

      {/* Modern Roof Slab with Extended Cantilever */}
      <RoundedBox args={[4.4, 0.1, 3.8]} radius={0.02} smoothness={4} position={[0.1, 3.12, 0]}>
        <meshStandardMaterial color="#121316" roughness={0.3} metalness={0.5} />
      </RoundedBox>

      {/* Timber Slat Inset / Pergola Louvers */}
      <group position={[0.2, 3.18, 0]}>
        {[-1.4, -0.9, -0.4, 0.1, 0.6, 1.1, 1.6].map((x, i) => (
          <mesh key={i} position={[x, 0.03, 0]}>
            <boxGeometry args={[0.04, 0.04, 3.2]} />
            <meshStandardMaterial color="#c5a880" roughness={0.4} metalness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Interior Living Suite & Emerald Accent Block */}
      <RoundedBox args={[1.2, 0.5, 1.2]} radius={0.02} smoothness={4} position={[0.8, 0.5, 0.2]}>
        <meshStandardMaterial color="#0b3b2c" roughness={0.4} />
      </RoundedBox>

      {/* Warm Ambient Interior Illumination */}
      <pointLight position={[0.8, 0.9, 0.2]} intensity={2.2} color="#fcecd2" distance={6} />
      <pointLight position={[-0.6, 2.2, 0.2]} intensity={1.8} color="#fcecd2" distance={5} />

      {/* Landscape Planter Box with Emerald Greenery */}
      <RoundedBox args={[1.6, 0.3, 0.5]} radius={0.02} smoothness={4} position={[1.4, 0.15, 1.8]}>
        <meshStandardMaterial color="#0b3b2c" roughness={0.9} />
      </RoundedBox>
    </group>
  );
}

export default function Hero3DModel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [4.2, 3.4, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[8, 12, 8]} intensity={1.6} color="#ffffff" castShadow />
        <directionalLight position={[-8, 6, -6]} intensity={0.7} color="#faf5ee" />
        <pointLight position={[0, 4, 0]} intensity={0.6} color="#d4af37" />

        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
          <ArchitecturalModel />
        </Float>

        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.45}
          scale={8}
          blur={2.6}
          far={4}
          color="#0b3b2c"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 5}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}