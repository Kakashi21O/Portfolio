"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { motion } from "framer-motion";

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
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

function Fallback2D() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {/* Glowing orb fallback */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-primary/20 blur-[60px]"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-48 h-48 rounded-full border-[1px] border-primary/40 border-dashed opacity-50"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-32 h-32 rounded-full border-[1px] border-primary/20 border-dotted"
      />
    </div>
  );
}

export function Hero3DObject() {
  return (
    <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center" style={{ contentVisibility: "auto" }}>
      <ErrorBoundary fallback={<Fallback2D />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} frameloop="always">
          <Icosahedron />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
