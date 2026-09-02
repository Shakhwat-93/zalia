'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Transformation3DCanvasProps {
  activeStage: number;
}

function ArchitecturalTransformationModel({ activeStage }: { activeStage: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const extensionRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Group>(null);
  const trussRef = useRef<THREE.Group>(null);
  const lightsRef = useRef<THREE.PointLight>(null);
  const interiorLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow cinematic rotation
    groupRef.current.rotation.y += delta * 0.08;

    // Stage 1+: Materialize modern glass extension
    if (extensionRef.current) {
      const targetScale = activeStage >= 1 ? 1 : 0.01;
      const targetOpacity = activeStage >= 1 ? 1 : 0;
      extensionRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 3.5
      );
      extensionRef.current.position.y = THREE.MathUtils.lerp(
        extensionRef.current.position.y,
        activeStage >= 1 ? 0 : -0.6,
        delta * 3.5
      );
    }

    // Stage 3 (Exploded Reimagined): Lift roof and truss layers
    if (roofRef.current) {
      const targetRoofY = activeStage === 3 ? 1.6 : 0.88;
      roofRef.current.position.y = THREE.MathUtils.lerp(
        roofRef.current.position.y,
        targetRoofY,
        delta * 3
      );
    }

    if (trussRef.current) {
      const targetTrussY = activeStage === 3 ? 2.3 : 1.15;
      trussRef.current.position.y = THREE.MathUtils.lerp(
        trussRef.current.position.y,
        targetTrussY,
        delta * 3
      );
    }

    // Stage 2+: Turn on warm architectural illumination
    if (lightsRef.current) {
      const targetIntensity = activeStage >= 2 ? 3.0 : 0.4;
      lightsRef.current.intensity = THREE.MathUtils.lerp(
        lightsRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }

    if (interiorLightRef.current) {
      const targetIntensity = activeStage >= 2 ? 2.2 : 0.2;
      interiorLightRef.current.intensity = THREE.MathUtils.lerp(
        interiorLightRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={1.15}>
      {/* 1. Terraced Stone Ground Plinth with Recessed Steps */}
      <RoundedBox args={[5.0, 0.16, 4.0]} radius={0.03} smoothness={4} position={[0, -0.9, 0]}>
        <meshStandardMaterial color="#f7f6f0" roughness={0.7} metalness={0.05} />
      </RoundedBox>
      <RoundedBox args={[2.4, 0.08, 1.2]} radius={0.02} smoothness={4} position={[-0.8, -0.78, 1.6]}>
        <meshStandardMaterial color="#ece9df" roughness={0.6} />
      </RoundedBox>

      {/* 2. Original Victorian Brick House Mass */}
      <RoundedBox args={[2.2, 1.6, 2.4]} radius={0.03} smoothness={4} position={[-0.9, 0.0, 0]}>
        <meshStandardMaterial
          color={activeStage === 0 ? '#a86c48' : '#96603f'}
          roughness={0.85}
          metalness={0.05}
        />
      </RoundedBox>

      {/* Victorian Pitched Gable Roof Base */}
      <mesh position={[-0.9, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.7, 0.9, 4]} />
        <meshStandardMaterial color="#2d3139" roughness={0.5} />
      </mesh>

      {/* Victorian Double Chimney Stacks */}
      <mesh position={[-1.7, 1.6, -0.5]}>
        <boxGeometry args={[0.22, 0.6, 0.3]} />
        <meshStandardMaterial color="#8b5235" roughness={0.9} />
      </mesh>
      <mesh position={[-0.2, 1.6, -0.5]}>
        <boxGeometry args={[0.22, 0.6, 0.3]} />
        <meshStandardMaterial color="#8b5235" roughness={0.9} />
      </mesh>

      {/* 3. Modern Double-Height Glazed Pavilion Extension */}
      <group ref={extensionRef} position={[0.9, 0, 0.2]}>
        {/* Glass Outer Shell */}
        <RoundedBox args={[2.2, 1.5, 2.4]} radius={0.03} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.94}
            opacity={1}
            transparent
            roughness={0.04}
            ior={1.5}
            thickness={0.5}
            specularColor="#ffffff"
          />
        </RoundedBox>

        {/* Structural Dark Steel Mullions */}
        <mesh position={[1.05, 0, 1.15]}>
          <boxGeometry args={[0.05, 1.5, 0.05]} />
          <meshStandardMaterial color="#121316" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-1.05, 0, 1.15]}>
          <boxGeometry args={[0.05, 1.5, 0.05]} />
          <meshStandardMaterial color="#121316" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[1.05, 0, -1.15]}>
          <boxGeometry args={[0.05, 1.5, 0.05]} />
          <meshStandardMaterial color="#121316" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Champagne Gold Horizontal Fascia Line */}
        <mesh position={[0, 0.72, 1.18]}>
          <boxGeometry args={[2.2, 0.04, 0.04]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Interior Lounge & Forest Green Velvet Furniture Accent */}
        <RoundedBox args={[1.2, 0.35, 0.8]} radius={0.02} smoothness={4} position={[0.1, -0.4, 0]}>
          <meshStandardMaterial color="#07381E" roughness={0.6} />
        </RoundedBox>

        {/* Natural Timber Feature Slats on Side */}
        <group position={[1.08, 0, -0.2]}>
          {[-0.6, -0.3, 0, 0.3, 0.6].map((z, i) => (
            <mesh key={i} position={[0, 0, z]}>
              <boxGeometry args={[0.03, 1.4, 0.08]} />
              <meshStandardMaterial color="#c5a880" roughness={0.5} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 4. Exploded Roof Slab (Lifts in Stage 04) */}
      <group ref={roofRef} position={[0.9, 0.88, 0.2]}>
        <RoundedBox args={[2.6, 0.08, 2.8]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#14161a" roughness={0.3} metalness={0.4} />
        </RoundedBox>
        {/* Timber Under-ceiling Planks */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[2.4, 0.02, 2.6]} />
          <meshStandardMaterial color="#d6b993" roughness={0.5} />
        </mesh>
      </group>

      {/* 5. Exploded Timber Rafter Truss Layer (Lifts higher in Stage 04) */}
      <group ref={trussRef} position={[0.9, 1.15, 0.2]}>
        {[-1.0, -0.6, -0.2, 0.2, 0.6, 1.0].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.04, 0.04, 2.6]} />
            <meshStandardMaterial color="#c5a880" roughness={0.4} metalness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Warm Ambient Recessed Spotlights */}
      <pointLight ref={lightsRef} position={[0.9, 0.3, 0.3]} color="#ffeed8" distance={6} />
      <pointLight ref={interiorLightRef} position={[-0.7, 0.2, 0.2]} color="#ffddb8" distance={5} />

      {/* Landscaped Planter & Shrubs */}
      <RoundedBox args={[1.6, 0.25, 0.6]} radius={0.02} smoothness={4} position={[1.4, -0.7, 1.8]}>
        <meshStandardMaterial color="#0b3b2c" roughness={0.9} />
      </RoundedBox>
    </group>
  );
}

export default function Transformation3DCanvas({ activeStage }: Transformation3DCanvasProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [3.4, 2.8, 5.4], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[8, 12, 8]} intensity={1.6} color="#ffffff" castShadow />
        <directionalLight position={[-8, 6, -6]} intensity={0.6} color="#faf5ee" />
        <pointLight position={[0, 4, 0]} intensity={0.8} color="#d4af37" />

        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
          <ArchitecturalTransformationModel activeStage={activeStage} />
        </Float>

        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.45}
          scale={9}
          blur={2.6}
          far={4.5}
          color="#0b3b2c"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minPolarAngle={Math.PI / 4}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}