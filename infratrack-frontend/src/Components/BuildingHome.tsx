// src/Components/BuildingHome.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function BuildingModel() {
  const { scene } = useGLTF('/models/building.glb');
  return <primitive object={scene} scale={.4} />;
}

export default function BuildingHome() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <BuildingModel />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
