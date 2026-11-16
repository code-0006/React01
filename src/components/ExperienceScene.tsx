import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export type Mood = 'wedding' | 'birthday' | 'celebration';

export const palettes: Record<Mood, { name: string; tamil: string; primary: string; secondary: string; light: string }> = {
  wedding: { name: 'THE ROYAL WEDDING', tamil: 'திருமண அலங்காரம்', primary: '#efb5c4', secondary: '#e8b96e', light: '#fff2cf' },
  birthday: { name: 'THE DREAMY BIRTHDAY', tamil: 'பிறந்தநாள் கொண்டாட்டம்', primary: '#cda3f7', secondary: '#ef8da9', light: '#ffe5f8' },
  celebration: { name: 'THE GOLDEN MOMENT', tamil: 'சிறப்பு விழாக்கள்', primary: '#89c3ae', secondary: '#f3cb77', light: '#e1fff0' },
};

function GoldArch({ glow }: { glow: string }) {
  return (
    <group position={[0, -0.42, -0.45]}>
      <mesh position={[-1.77, -0.49, 0]}><cylinderGeometry args={[0.055, 0.065, 1.01, 16]} /><meshStandardMaterial color="#b68a48" metalness={0.93} roughness={0.15} /></mesh>
      <mesh position={[1.77, -0.49, 0]}><cylinderGeometry args={[0.055, 0.065, 1.01, 16]} /><meshStandardMaterial color="#b68a48" metalness={0.93} roughness={0.15} /></mesh>
      <mesh><torusGeometry args={[1.77, 0.063, 12, 100, Math.PI]} /><meshStandardMaterial color="#f2cb80" metalness={0.94} roughness={0.12} emissive="#98612b" emissiveIntensity={0.35} /></mesh>
      <mesh position={[0, 0.04, -0.18]}><torusGeometry args={[1.56, 0.026, 10, 100, Math.PI]} /><meshStandardMaterial color={glow} metalness={0.64} roughness={0.19} emissive={glow} emissiveIntensity={0.68} /></mesh>
    </group>
  );
}

function Flower({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  return (
    <group position={position} scale={size}>
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i * Math.PI * 2) / 5;
        return <mesh key={i} position={[Math.cos(a) * 0.15, Math.sin(a) * 0.15, 0.02]} rotation={[0, 0, a]} scale={[0.19, 0.135, 0.07]}>
          <sphereGeometry args={[1, 12, 8]} /><meshPhysicalMaterial color={color} roughness={0.26} clearcoat={0.9} />
        </mesh>;
      })}
      <mesh position={[0, 0, 0.11]}><sphereGeometry args={[0.09, 12, 8]} /><meshStandardMaterial color="#f4d394" metalness={0.62} roughness={0.24} /></mesh>
    </group>
  );
}

function Balloons({ primary, secondary, compact }: { primary: string; secondary: string; compact: boolean }) {
  const balls = useMemo(() => [
    [-2.45, -0.48, 0.55, .42, 0], [-2.3, 0.05, 0.25, .48, 1], [-2.05, .65, -0.04, .42, 0],
    [-1.78, 1.1, -.3, .34, 1], [2.48, -.44, .45, .40, 1], [2.31, .1, .05, .46, 0],
    [2.05, .69, -.14, .42, 1], [1.77, 1.13, -.3, .34, 0], [2.74, -1.05, .65, .34, 0],
    [-2.73, -1.08, .56, .34, 1],
  ] as const, []);
  return (
    <group>
      {balls.map(([x,y,z,scale,alt], i) => <Float key={i} speed={1.1 + i * .05} floatIntensity={compact ? .07 : .14} rotationIntensity={0.03}>
        <mesh position={[x,y,z]} scale={[scale * .88, scale * 1.18, scale * .78]}>
          <sphereGeometry args={[1, compact ? 14 : 24, compact ? 12 : 20]} />
          <meshPhysicalMaterial color={alt ? primary : secondary} metalness={0.55} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} />
        </mesh>
      </Float>)}
    </group>
  );
}

function LightDrop({ x, y, height, tint }: { x: number; y: number; height: number; tint: string }) {
  return <group position={[x, y, 0.25]}>
    <mesh position={[0, height/2, 0]}><cylinderGeometry args={[0.006,0.006,height,6]} /><meshBasicMaterial color="#e5cbac" /></mesh>
    <mesh><sphereGeometry args={[0.085,12,10]} /><meshBasicMaterial color={tint} toneMapped={false} /></mesh>
  </group>;
}

function Room({ mood, compact }: { mood: Mood; compact: boolean }) {
  const set = palettes[mood];
  const root = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!root.current) return;
    const t = clock.elapsedTime;
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, (compact ? 0 : pointer.x * .09) + Math.sin(t * .32) * .045, .025);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, compact ? -.015 : -pointer.y * .06, .03);
    root.current.position.y = Math.sin(t * .65) * .043;
  });
  return <group ref={root} scale={compact ? .83 : .99}>
    {/* glossy floating display podium */}
    <mesh position={[0,-1.54,-.18]}><cylinderGeometry args={[2.5,2.75,.23,64]} /><meshStandardMaterial color="#6d4253" metalness={.51} roughness={.25} /></mesh>
    <mesh position={[0,-1.42,-.18]}><cylinderGeometry args={[2.49,2.49,.03,64]} /><meshStandardMaterial color="#ecc788" metalness={.94} roughness={.16} /></mesh>
    <mesh position={[0, -.13,-.88]}><boxGeometry args={[4.2,2.85,.12]} /><meshPhysicalMaterial color="#4b2d3a" metalness={.18} roughness={.34} clearcoat={.55} /></mesh>
    <mesh position={[0,-.13,-.799]}><planeGeometry args={[3.95,2.58]} /><meshStandardMaterial color={set.primary} transparent opacity={.12} emissive={set.primary} emissiveIntensity={.38} /></mesh>
    <GoldArch glow={set.secondary}/>
    <Balloons primary={set.primary} secondary={set.secondary} compact={compact}/>
    <Flower position={[-1.5,.67,.1]} color={set.primary} size={1.2}/>
    <Flower position={[-1.73,.2,.4]} color={set.light} size={.98}/>
    <Flower position={[1.53,.73,.1]} color={set.light} size={1.18}/>
    <Flower position={[1.76,.3,.35]} color={set.primary} size={.95}/>
    <Flower position={[-2.14,-1.19,.62]} color={set.primary} size={1.1}/>
    <Flower position={[2.16,-1.19,.63]} color={set.light} size={1.14}/>
    <LightDrop x={-.87} y={.36} height={.9} tint={set.light}/>
    <LightDrop x={0} y={.8} height={.68} tint={set.light}/>
    <LightDrop x={.87} y={.36} height={.9} tint={set.light}/>
    <mesh position={[0,-1.07,.37]}><cylinderGeometry args={[.7,.77,.42,48]} /><meshPhysicalMaterial color="#dfbe83" metalness={.79} roughness={.2} clearcoat={.5} /></mesh>
    <mesh position={[0,-.84,.37]}><cylinderGeometry args={[.56,.56,.07,48]} /><meshStandardMaterial color={set.light} metalness={.35} roughness={.25} /></mesh>
    <Sparkles count={compact ? 12 : 26} speed={.32} size={2.3} color={set.light} scale={[6.5,4.4,2]}/>
  </group>;
}

function webglAvailable() {
  try { const el = document.createElement('canvas'); return !!(el.getContext('webgl2') || el.getContext('webgl')); } catch { return false; }
}

export default function ExperienceScene({ mood }: { mood: Mood }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 700px)');
    const update = () => setCompact(mobile.matches);
    update(); mobile.addEventListener?.('change', update);
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    setAllowed(webglAvailable() && !nav.connection?.saveData && !(nav.deviceMemory && nav.deviceMemory <= 2) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '180px 0px', threshold: .01 });
    if (container.current) observer.observe(container.current);
    return () => { observer.disconnect(); mobile.removeEventListener?.('change', update); };
  }, []);
  return <div className="experience-scene" ref={container}>
    {allowed && visible ? <Canvas camera={{ position:[0,.15,8.1], fov:43 }} dpr={compact ? [1,1.15] : [1,1.5]} gl={{ alpha:true, antialias:!compact, powerPreference: compact ? 'low-power' : 'high-performance' }}>
      <ambientLight intensity={1.65}/><hemisphereLight args={['#ffe3c8','#342537',1.6]}/>
      <directionalLight position={[-3,4,5]} color="#fff2d2" intensity={3.2}/>
      <pointLight position={[3,2,4]} color={palettes[mood].primary} intensity={38} distance={10}/>
      <Suspense fallback={null}><Room mood={mood} compact={compact}/></Suspense>
    </Canvas> : <div className="experience-static"><img src="/images/logo-crescent.webp" alt="Happy Moon Decoration crescent moon and floral design" /></div>}
  </div>;
}
