"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

const PARTICLE_COUNT = 8000;
const RADIUS = 2;

// Helper to generate points on a sphere
const generateSphere = (count: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = RADIUS * Math.sin(phi) * Math.cos(theta);
    const y = RADIUS * Math.sin(phi) * Math.sin(theta);
    const z = RADIUS * Math.cos(phi);
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
};

// Helper to generate points in a cube
const generateCube = (count: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    points[i * 3] = (Math.random() - 0.5) * RADIUS * 1.5;
    points[i * 3 + 1] = (Math.random() - 0.5) * RADIUS * 1.5;
    points[i * 3 + 2] = (Math.random() - 0.5) * RADIUS * 1.5;
  }
  return points;
};

// Helper to generate points on a torus
const generateTorus = (count: number) => {
  const points = new Float32Array(count * 3);
  const R = 2; // Major radius
  const r = 0.8; // Minor radius
  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const x = (R + r * Math.cos(v)) * Math.cos(u);
    const y = (R + r * Math.cos(v)) * Math.sin(u);
    const z = r * Math.sin(v);
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
};

// Helper to generate a random helix/galaxy shape
const generateGalaxy = (count: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 10; // Multiple turns
    const radius = Math.random() * RADIUS;

    points[i * 3] = radius * Math.cos(theta);
    points[i * 3 + 1] = (Math.random() - 0.5) * 2; // Vertical spread
    points[i * 3 + 2] = radius * Math.sin(theta);
  }
  return points;
};

// Helper to generate a Double Helix (DNA-like) with volume
const generateDoubleHelix = (count: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 20; // 10 turns
    const radius = RADIUS * 0.5;
    const offset = i % 2 === 0 ? 0 : Math.PI; // Separate strands

    // Add random scatter for volume
    const scatterRadius = 0.2;
    const r = Math.random() * scatterRadius;
    const angle = Math.random() * Math.PI * 2;

    const baseX = radius * Math.cos(t + offset);
    const baseY = (i / count - 0.5) * RADIUS * 3; // Height
    const baseZ = radius * Math.sin(t + offset);

    points[i * 3] = baseX + r * Math.cos(angle);
    points[i * 3 + 1] = baseY + r * Math.sin(angle);
    points[i * 3 + 2] = baseZ + r * Math.sin(angle); // Simple scatter
  }
  return points;
};

// Helper to generate a Trefoil Knot with volume
const generateTrefoilKnot = (count: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const x = Math.sin(t) + 2 * Math.sin(2 * t);
    const y = Math.cos(t) - 2 * Math.cos(2 * t);
    const z = -Math.sin(3 * t);

    // Add random scatter for volume
    const scatterRadius = 0.4;
    const r = Math.random() * scatterRadius;
    const angle = Math.random() * Math.PI * 2;

    // Scale it down significantly
    const scale = RADIUS * 0.4;
    points[i * 3] = (x + r * Math.cos(angle)) * scale;
    points[i * 3 + 1] = (y + r * Math.sin(angle)) * scale;
    points[i * 3 + 2] = (z + r * Math.sin(angle)) * scale;
  }
  return points;
};



const MorphParticles = () => {
  const mesh = useRef<THREE.Points>(null);
  const [currentShape, setCurrentShape] = useState(0);
  const { resolvedTheme } = useTheme();

  // Geometries
  const sphere = useMemo(() => generateSphere(PARTICLE_COUNT), []);
  const cube = useMemo(() => generateCube(PARTICLE_COUNT), []);
  const torus = useMemo(() => generateTorus(PARTICLE_COUNT), []);
  const galaxy = useMemo(() => generateGalaxy(PARTICLE_COUNT), []);
  const doubleHelix = useMemo(() => generateDoubleHelix(PARTICLE_COUNT), []);
  const trefoil = useMemo(() => generateTrefoilKnot(PARTICLE_COUNT), []);

  const shapes = useMemo(
    () => [sphere, doubleHelix, cube, trefoil, torus, galaxy],
    [sphere, doubleHelix, cube, trefoil, torus, galaxy],
  );

  // Current particles position
  const particles = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  // Initialize with the first shape
  useMemo(() => {
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      particles[i] = shapes[0][i];
    }
  }, [particles, shapes]);

  // Color handling
  const colors = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3);

    let color1: THREE.Color;
    let color2: THREE.Color;

    if (resolvedTheme === "dark") {
      color1 = new THREE.Color("#fbbf24"); // Primary (Amber-400)
      color2 = new THREE.Color("#f59e0b"); // Secondary (Amber-500)
    } else {
      // Light Mode Colors - Darker for contrast
      color1 = new THREE.Color("#b45309"); // Amber-700
      color2 = new THREE.Color("#78350f"); // Amber-900
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random());
      array[i * 3] = mixedColor.r;
      array[i * 3 + 1] = mixedColor.g;
      array[i * 3 + 2] = mixedColor.b;
    }
    return array;
  }, [resolvedTheme]);

  // Update geometry colors when theme changes
  useEffect(() => {
    if (mesh.current) {
      mesh.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [colors]);

  // Cycle shapes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, 5000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [shapes.length]);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Rotation
    mesh.current.rotation.y += delta * 0.1;
    mesh.current.rotation.x += delta * 0.05;

    // Interpolation
    const target = shapes[currentShape];
    const positions = mesh.current.geometry.attributes.position
      .array as Float32Array;

    // Lerp factor - adjust speed here
    const speed = 2.0 * delta;

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      positions[i] += (target[i] - positions[i]) * speed;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const ThreeMorph = () => {
  return (
    <div className="w-full h-full relative overflow-hidden pointer-events-auto">
      {/* Overlay to block touch gestures on mobile */}
      <div className="absolute inset-0 z-20 lg:hidden" />
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <MorphParticles />
      </Canvas>
    </div>
  );
};

export default ThreeMorph;
