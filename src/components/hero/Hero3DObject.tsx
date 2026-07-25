"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Mouse reactive subtle movement — no THREE.Clock used
    const targetX = (state.mouse.x * Math.PI) / 10;
    const targetY = (state.mouse.y * Math.PI) / 10;
    meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
    meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.35} />
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.08} />
        </mesh>
      </mesh>
    </Float>
  );
}

export function Hero3DObject() {
  return (
    <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
      {/* frameloop="demand" prevents THREE.Clock from ticking unless needed */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} frameloop="always">
        <Icosahedron />
      </Canvas>
    </div>
  );
}
