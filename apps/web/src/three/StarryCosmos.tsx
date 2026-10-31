import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#A855F7'); // Purple
    const color2 = new THREE.Color('#00D9FF'); // Cyan
    const color3 = new THREE.Color('#FFFFFF'); // White star

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Cylindrical/spherical distribution for deep depth
      const radius = THREE.MathUtils.randFloat(5, 45);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3);

      positions[i3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(phi);
      positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi) - 10;

      // Color choice
      const choice = Math.random();
      const mixedColor = choice < 0.4 ? color1 : choice < 0.8 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingPrism: React.FC<{ position: [number, number, number]; color: string; speed: number }> = ({
  position,
  color,
  speed
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008 * speed;
      meshRef.current.rotation.y += 0.012 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.45}
      />
    </mesh>
  );
};

export const StarryCosmos: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#A855F7" />
        <pointLight position={[-10, -10, 5]} intensity={1.5} color="#00D9FF" />
        
        <ParticleField />
        
        {/* Futuristic Floating Tech Polyhedra */}
        <FloatingPrism position={[-14, 6, -5]} color="#A855F7" speed={0.8} />
        <FloatingPrism position={[15, -4, -4]} color="#00D9FF" speed={0.9} />
        <FloatingPrism position={[-10, -8, -8]} color="#C4B5FD" speed={0.6} />
        <FloatingPrism position={[12, 8, -6]} color="#A855F7" speed={0.7} />
      </Canvas>
    </div>
  );
};
