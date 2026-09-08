import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-store";

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function Starfield() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.012 + scrollState.velocity * 0.00025;
    group.current.rotation.x = damp(
      group.current.rotation.x,
      scrollState.progress * 0.35,
      1.2,
      dt,
    );
  });
  return (
    <group ref={group}>
      <Stars radius={90} depth={60} count={4200} factor={3.4} saturation={0} fade speed={0.4} />
    </group>
  );
}

function Nebula() {
  const group = useRef<THREE.Group>(null);
  const clouds = useMemo(
    () => [
      { pos: [-16, 6, -30] as const, color: "#3b6fd4", scale: 20 },
      { pos: [18, -8, -36] as const, color: "#6b4fd0", scale: 26 },
      { pos: [4, 14, -44] as const, color: "#1f9fd0", scale: 22 },
    ],
    [],
  );
  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.05) * 0.12;
    group.current.position.y = damp(group.current.position.y, scrollState.progress * 10, 1, dt);
  });
  return (
    <group ref={group}>
      {clouds.map((c, i) => (
        <mesh key={i} position={[c.pos[0], c.pos[1], c.pos[2]]}>
          <sphereGeometry args={[c.scale, 24, 24]} />
          <meshBasicMaterial
            color={c.color}
            transparent
            opacity={0.055}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Planet({
  position,
  radius,
  color,
  speed,
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * speed;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.15 + position[0]) * 0.8;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshStandardMaterial color={color} roughness={0.75} metalness={0.15} />
    </mesh>
  );
}

function Dust() {
  return (
    <Sparkles count={140} scale={[26, 18, 20]} size={2.2} speed={0.25} opacity={0.5} color="#cfe4ff" />
  );
}

function CameraRig() {
  useFrame((state, dt) => {
    const cam = state.camera;
    const targetX = scrollState.pointerX * 1.6;
    const targetY = scrollState.pointerY * 1.0 + scrollState.progress * 2.5;
    const targetZ = 18 - scrollState.progress * 7;
    cam.position.x = damp(cam.position.x, targetX, 1.6, dt);
    cam.position.y = damp(cam.position.y, targetY, 1.6, dt);
    cam.position.z = damp(cam.position.z, targetZ, 1.2, dt);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

function LightRays() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.02;
  });
  return (
    <group ref={ref} position={[0, 0, -18]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI * 2]} position={[0, 0, 0]}>
          <planeGeometry args={[0.5, 60]} />
          <meshBasicMaterial
            color="#8fc6ff"
            transparent
            opacity={0.03}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SpaceScene({ quality = 1 }: { quality?: number }) {
  return (
    <Canvas
      dpr={[1, quality > 0.6 ? 1.8 : 1]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0, 18], fov: 55 }}
      frameloop="always"
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[12, 10, 8]} intensity={140} color="#9fd0ff" distance={90} decay={2} />
      <pointLight position={[-14, -8, -6]} intensity={90} color="#8f7bff" distance={90} decay={2} />
      <Starfield />
      <Nebula />
      <LightRays />
      <Dust />
      <Planet position={[-9, 3, -8]} radius={2.1} color="#4a6fa8" speed={0.06} />
      <Planet position={[10, -4, -14]} radius={3.2} color="#2f3f6b" speed={0.04} />
      <Planet position={[6, 7, -22]} radius={1.2} color="#7d8fc4" speed={0.09} />
      <CameraRig />
    </Canvas>
  );
}
