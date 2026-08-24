'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Transformation3DCanvasProps {
  activeStage: number;
}

function HouseModel({ activeStage }: { activeStage: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const extensionRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Group>(null);
  const lightsRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;

    if (extensionRef.current) {
      const targetExtensionScale = activeStage >= 1 ? 1 : 0.001;
      const targetExtensionY = activeStage >= 1 ? 0 : -0.5;
      extensionRef.current.scale.lerp(
        new THREE.Vector3(targetExtensionScale, targetExtensionScale, targetExtensionScale),
        delta * 3
      );
      extensionRef.current.position.y = THREE.MathUtils.lerp(
        extensionRef.current.position.y,
        targetExtensionY,
        delta * 3
      );
    }

    if (roofRef.current) {
      const targetRoofY = activeStage === 3 ? 1.4 : 0.85;
      roofRef.current.position.y = THREE.MathUtils.lerp(
        roofRef.current.position.y,
        targetRoofY,
        delta * 3
      );
    }

    if (lightsRef.current) {
      const targetIntensity = activeStage >= 2 ? 2.5 : 0.5;
      lightsRef.current.intensity = THREE.MathUtils.lerp(
        lightsRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.2}>
      <RoundedBox args={[4.2, 0.1, 3.2]} radius={0.02} smoothness={4} position={[0, -0.9, 0]}>
        <meshStandardMaterial color="#f4f3ee" roughness={0.7} />
      </RoundedBox>

      <RoundedBox args={[2.0, 1.5, 1.8]} radius={0.03} smoothness={4} position={[-0.8, 0, 0]}>
        <meshStandardMaterial
          color={activeStage === 0 ? '#b88969' : '#a87a5b'}
          roughness={0.8}
        />
      </RoundedBox>

      <mesh position={[-0.8, 1.1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.5, 0.8, 4]} />
        <meshStandardMaterial color="#374151" roughness={0.6} />
      </mesh>

      <group ref={extensionRef} position={[0.9, 0, 0]}>
        <RoundedBox args={[1.8, 1.4, 2.2]} radius={0.03} smoothness={4} position={[0, 0, 0.2]}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.92}
            opacity={1}
            transparent
            roughness={0.08}
            ior={1.5}
            thickness={0.5}
          />
        </RoundedBox>

        <mesh position={[0.85, 0, 1.25]}>
          <boxGeometry args={[0.06, 1.4, 0.06]} />
          <meshStandardMaterial color="#121316" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.85, 0, 1.25]}>
          <boxGeometry args={[0.06, 1.4, 0.06]} />
          <meshStandardMaterial color="#121316" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.7, 1.28]}>
          <boxGeometry args={[1.8, 0.04, 0.04]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>

        <mesh position={[0, -0.3, 0.2]}>
          <boxGeometry args={[1.2, 0.3, 1.0]} />
          <meshStandardMaterial color="#0b3b2c" roughness={0.5} />
        </mesh>
      </group>

      <group ref={roofRef} position={[0.9, 0.85, 0.2]}>
        <RoundedBox args={[2.2, 0.08, 2.6]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#1a1c1e" roughness={0.4} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[2.0, 0.02, 2.4]} />
          <meshStandardMaterial color="#c5a880" roughness={0.6} />
        </mesh>
      </group>

      <pointLight ref={lightsRef} position={[0.8, 0.2, 0.2]} color="#ffeedd" distance={5} />
    </group>
  );
}

export default function Transformation3DCanvas({ activeStage }: Transformation3DCanvasProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [2.5, 2.2, 4.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 10, 6]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#faf5eb" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <HouseModel activeStage={activeStage} />
        </Float>

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.4}
          scale={8}
          blur={2.5}
          far={4}
          color="#0b3b2c"
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
