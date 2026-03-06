"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function NeuralParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 300;

  const [positions, ] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      nodes.push(new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]));
    }

    return [pos, nodes];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8b5cf6"
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralConnections() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const count = 80;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = 1.5 + Math.random() * 0.8;

      const theta2 = theta1 + (Math.random() - 0.5) * 1.5;
      const phi2 = phi1 + (Math.random() - 0.5) * 1.5;
      const r2 = 1.5 + Math.random() * 0.8;

      positions[i * 6] = r1 * Math.sin(phi1) * Math.cos(theta1);
      positions[i * 6 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1);
      positions[i * 6 + 2] = r1 * Math.cos(phi1);
      positions[i * 6 + 3] = r2 * Math.sin(phi2) * Math.cos(theta2);
      positions[i * 6 + 4] = r2 * Math.sin(phi2) * Math.sin(theta2);
      positions[i * 6 + 5] = r2 * Math.cos(phi2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    const mat = linesRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color="#6366f1"
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function CoreBrain({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.12 + mousePosition.x * 0.5;
    meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.3 + mousePosition.y * 0.3;

    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.08;
      const s = 1 + Math.sin(t * 1.2) * 0.05;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main brain sphere */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1.0, 64, 64]} />
        <MeshDistortMaterial
          color="#1a0533"
          roughness={0.1}
          metalness={0.9}
          distort={0.35}
          speed={2}
          envMapIntensity={1}
          emissive="#6366f1"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshDistortMaterial
          color="#4f46e5"
          roughness={0}
          metalness={1}
          distort={0.5}
          speed={3}
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2} />
      <pointLight position={[-5, -5, 5]} color="#8b5cf6" intensity={1.5} />
      <pointLight position={[0, 0, 3]} color="#a78bfa" intensity={1} />

      <NeuralParticles />
      <NeuralConnections />
      <CoreBrain mousePosition={mousePosition} />

      <OrbitRing radius={1.7} color="#6366f1" speed={0.3} />
      <OrbitRing radius={2.1} color="#8b5cf6" speed={-0.2} />
      <OrbitRing radius={2.4} color="#a78bfa" speed={0.15} />

      <Sparkles
        count={50}
        scale={6}
        size={0.6}
        speed={0.2}
        color="#a78bfa"
        opacity={0.6}
      />
    </>
  );
}

export default function AIBrain() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
