import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { techStacks } from '../data/portfolio';

/** Central planet with organic terrain relief using MeshDistortMaterial */
function Planet() {
  const meshRef  = useRef<THREE.Mesh>(null);
  const wireRef  = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current)  meshRef.current.rotation.y  =  t * 0.12;
    if (wireRef.current)  wireRef.current.rotation.y  = -t * 0.06;
    if (cloudRef.current) cloudRef.current.rotation.y =  t * 0.18;
  });

  return (
    <group>
      {/* ── TERRAIN LAYER — distorted surface = relief ── */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.1, 128, 128]} />
        <MeshDistortMaterial
          color="#0c3d5e"
          emissive="#0ea5e9"
          emissiveIntensity={0.18}
          metalness={0.1}
          roughness={0.85}
          distort={0.14}   /* amplitude of terrain bumps */
          speed={0.8}      /* how fast terrain moves */
        />
      </mesh>

      {/* ── CLOUD LAYER — secondary distortion, faster ── */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.16, 64, 64]} />
        <MeshDistortMaterial
          color="#7dd3fc"
          transparent
          opacity={0.06}
          distort={0.22}
          speed={1.4}
          depthWrite={false}
        />
      </mesh>

      {/* ── WIREFRAME GRID — subtle latitude/longitude lines ── */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.12, 20, 20]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.06} />
      </mesh>

      {/* ── ATMOSPHERE GLOW — backside sphere slightly larger ── */}
      <mesh>
        <sphereGeometry args={[1.28, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── EQUATORIAL RING ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.012, 8, 120]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// Each planet gets its own unique orbital plane so they NEVER bunch together.
// All share the same angular speed → initial 60° spread is preserved forever.
const ORBIT_CONFIGS = [
  { inc:   0, node:   0, radius: 2.5, phase: 0                 },
  { inc:  32, node:  55, radius: 2.6, phase: Math.PI / 3       },
  { inc: -32, node: 110, radius: 2.5, phase: (2 * Math.PI) / 3 },
  { inc:  58, node: 165, radius: 2.7, phase: Math.PI            },
  { inc: -58, node: 220, radius: 2.6, phase: (4 * Math.PI) / 3 },
  { inc:  18, node: 275, radius: 2.5, phase: (5 * Math.PI) / 3 },
];

const ORBIT_SPEED = 0.18; // identical for every planet → spread never changes

interface OrbitingTechProps {
  name: string;
  iconUrl: string;
  color: string;
  inc: number;    // orbital inclination in degrees
  node: number;   // longitude of ascending node in degrees
  phase: number;  // initial orbital phase in radians
  radius: number;
}

function OrbitingTech({ name, iconUrl, color, inc, node, phase, radius }: OrbitingTechProps) {
  const groupRef = useRef<THREE.Group>(null);

  const incRad  = (inc  * Math.PI) / 180;
  const nodeRad = (node * Math.PI) / 180;
  const cosN = Math.cos(nodeRad), sinN = Math.sin(nodeRad);
  const cosI = Math.cos(incRad),  sinI = Math.sin(incRad);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * ORBIT_SPEED + phase;
    // Standard orbital-mechanics position on inclined plane
    groupRef.current.position.set(
      (cosN * Math.cos(t) - sinN * cosI * Math.sin(t)) * radius,
      sinI * Math.sin(t) * radius,
      (sinN * Math.cos(t) + cosN * cosI * Math.sin(t)) * radius,
    );
  });

  return (
    <group ref={groupRef}>
      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>

      {/* Mini planet with relief */}
      <mesh>
        <sphereGeometry args={[0.27, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          roughness={0.65}
          metalness={0.1}
          distort={0.28}
          speed={2.5}
        />
      </mesh>

      {/* Tech logo + name as HTML overlay */}
      <Html
        center
        position={[0, -0.62, 0]}
        distanceFactor={5.5}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <img
            src={iconUrl}
            alt={name}
            width={22}
            height={22}
            style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))' }}
          />
          <span
            style={{
              color: '#f1f5f9',
              fontSize: 10,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              whiteSpace: 'nowrap',
              textShadow: `0 0 10px ${color}, 0 1px 3px rgba(0,0,0,0.9)`,
              letterSpacing: '0.04em',
            }}
          >
            {name}
          </span>
        </div>
      </Html>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]}   intensity={2.2} color="#00d4ff" />
      <pointLight position={[-6, -4, -6]} intensity={1.0} color="#7c3aed" />
      <pointLight position={[0, 0, 5]}   intensity={0.7} color="#ffffff" />

      <Planet />

      {techStacks.map((tech, i) => {
        const cfg = ORBIT_CONFIGS[i % ORBIT_CONFIGS.length];
        return (
          <OrbitingTech
            key={tech.name}
            name={tech.name}
            iconUrl={tech.iconUrl}
            color={tech.color}
            inc={cfg.inc}
            node={cfg.node}
            phase={cfg.phase}
            radius={cfg.radius}
          />
        );
      })}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />
    </>
  );
}

export default function ThreeScene() {
  return (
    <div
      className="w-full h-[380px] relative rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(0,212,255,0.07)', cursor: 'grab' }}
    >
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(7,7,16,0.8) 100%)',
        }}
      />
    </div>
  );
}
