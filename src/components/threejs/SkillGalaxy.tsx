"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

interface Skill {
  name: string;
  category: string;
  color: string;
  angle: number;
  radius: number;
  speed: number;
  size: number;
}

const skillsData: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", color: "#3b82f6", angle: 0, radius: 2.5, speed: 0.3, size: 0.15 },
  { name: "Java", category: "Languages", color: "#3b82f6", angle: 2.1, radius: 2.8, speed: 0.25, size: 0.12 },
  { name: "C", category: "Languages", color: "#3b82f6", angle: 4.2, radius: 2.6, speed: 0.28, size: 0.1 },
  // Frontend
  { name: "React", category: "Frontend", color: "#06b6d4", angle: 1, radius: 3.2, speed: -0.2, size: 0.15 },
  { name: "Next.js", category: "Frontend", color: "#06b6d4", angle: 3.0, radius: 3.0, speed: -0.22, size: 0.14 },
  { name: "Tailwind", category: "Frontend", color: "#06b6d4", angle: 5.0, radius: 3.3, speed: -0.18, size: 0.12 },
  // Backend
  { name: "Node.js", category: "Backend", color: "#10b981", angle: 0.5, radius: 3.8, speed: 0.15, size: 0.13 },
  { name: "Prisma", category: "Backend", color: "#10b981", angle: 2.5, radius: 4.0, speed: 0.17, size: 0.11 },
  { name: "MySQL", category: "Backend", color: "#10b981", angle: 4.5, radius: 3.9, speed: 0.14, size: 0.11 },
  { name: "MongoDB", category: "Backend", color: "#10b981", angle: 1.5, radius: 4.2, speed: 0.16, size: 0.11 },
  // AI/ML
  { name: "TensorFlow", category: "AI/ML", color: "#f59e0b", angle: 1.2, radius: 2.2, speed: -0.35, size: 0.14 },
  { name: "PyTorch", category: "AI/ML", color: "#f59e0b", angle: 3.2, radius: 2.0, speed: -0.38, size: 0.13 },
  { name: "Keras", category: "AI/ML", color: "#f59e0b", angle: 5.2, radius: 2.4, speed: -0.32, size: 0.11 },
  { name: "HuggingFace", category: "AI/ML", color: "#f59e0b", angle: 0.7, radius: 1.8, speed: -0.40, size: 0.12 },
  // Tools
  { name: "GitHub", category: "Tools", color: "#8b5cf6", angle: 2.8, radius: 4.5, speed: 0.1, size: 0.12 },
  { name: "OpenCV", category: "Tools", color: "#8b5cf6", angle: 4.8, radius: 4.3, speed: 0.12, size: 0.11 },
];

function SkillNode({ skill, index }: { skill: Skill; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(skill.angle);

  useFrame((state) => {
    angleRef.current += skill.speed * 0.005;
    if (!meshRef.current) return;

    const inclination = (index % 5) * 0.4 - 1.0;
    meshRef.current.position.x = skill.radius * Math.cos(angleRef.current);
    meshRef.current.position.z = skill.radius * Math.sin(angleRef.current) * 0.6;
    meshRef.current.position.y = inclination + Math.sin(angleRef.current * 0.7) * 0.3;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.08;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[skill.size, 16, 16]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={0.6}
        roughness={0}
        metalness={0.8}
      />
    </mesh>
  );
}

function CentralSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.3;
  });

  return (
    <Float speed={1} floatIntensity={0.5}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshDistortMaterial
          color="#4f46e5"
          roughness={0}
          metalness={1}
          distort={0.4}
          speed={2}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRings() {
  const rings = [
    { radius: 2.5, color: "#3b82f6", opacity: 0.2, incline: 0 },
    { radius: 3.5, color: "#8b5cf6", opacity: 0.15, incline: 0.2 },
    { radius: 4.3, color: "#10b981", opacity: 0.1, incline: 0.3 },
  ];

  return (
    <>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + ring.incline, 0, i * 0.3]}>
          <torusGeometry args={[ring.radius, 0.006, 8, 100]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

export default function SkillGalaxy() {
  return (
    <Canvas
      camera={{ position: [0, 3, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={3} />
      <pointLight position={[-5, -3, 3]} color="#8b5cf6" intensity={2} />

      <CentralSphere />
      <OrbitalRings />

      {skillsData.map((skill, i) => (
        <SkillNode key={skill.name} skill={skill} index={i} />
      ))}
    </Canvas>
  );
}
