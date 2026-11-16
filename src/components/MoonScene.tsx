import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sparkles, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

type BalloonProps = {
  position: [number, number, number];
  color: string;
  scale?: number;
  floatSpeed?: number;
};

function Balloon({ position, color, scale = 1, floatSpeed = 1 }: BalloonProps) {
  return (
    <Float speed={floatSpeed} rotationIntensity={0.14} floatIntensity={0.32}>
      <group position={position} scale={scale}>
        <mesh scale={[0.47, 0.6, 0.39]}>
          <sphereGeometry args={[1, 32, 24]} />
          <meshPhysicalMaterial color={color} metalness={0.58} roughness={0.15} clearcoat={1} clearcoatRoughness={0.08} />
        </mesh>
        <mesh position={[-0.12, 0.2, 0.34]} scale={[0.12, 0.3, 0.035]} rotation={[0, 0, -0.28]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshBasicMaterial color="#fff5df" transparent opacity={0.55} />
        </mesh>
        <mesh position={[0, -0.64, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.1, 0.17, 12]} />
          <meshStandardMaterial color={color} metalness={0.58} roughness={0.2} />
        </mesh>
        <Line
          points={[[0, -0.72, 0], [0.09, -1.05, 0.02], [-0.08, -1.33, 0.01], [0.04, -1.72, -0.02]]}
          color="#c5a16d"
          transparent
          opacity={0.8}
          lineWidth={1}
        />
      </group>
    </Float>
  );
}

function Crescent() {
  const shape = useMemo(() => {
    const path = new THREE.Shape();
    path.moveTo(1.16, 1.96);
    path.bezierCurveTo(-0.26, 2.65, -2.48, 1.75, -2.48, 0);
    path.bezierCurveTo(-2.48, -1.75, -0.26, -2.65, 1.16, -1.96);
    path.bezierCurveTo(-0.24, -1.36, -0.63, -0.54, -0.63, 0);
    path.bezierCurveTo(-0.63, 0.54, -0.24, 1.36, 1.16, 1.96);
    path.closePath();
    return path;
  }, []);
  return (
    <mesh position={[-0.06, 0.1, -0.4]} rotation={[0.09, -0.22, -0.19]}>
      <extrudeGeometry args={[shape, { depth: 0.26, bevelEnabled: true, bevelThickness: 0.075, bevelSize: 0.075, bevelSegments: 3, steps: 1, curveSegments: 40 }]} />
      <meshPhysicalMaterial color="#d8a759" metalness={0.85} roughness={0.2} clearcoat={1} emissive="#4d2910" emissiveIntensity={0.2} />
    </mesh>
  );
}

function BrandMedallion() {
  const logo = useTexture('/images/logo-mark.webp');
  logo.colorSpace = THREE.SRGBColorSpace;
  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.13}>
      <group position={[0.36, 0, 0.88]} rotation={[0.03, -0.13, 0.04]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.19, 1.19, 0.2, 80]} />
          <meshPhysicalMaterial color="#a5752e" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 0.125]}>
          <circleGeometry args={[1.14, 80]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.17]}>
          <torusGeometry args={[1.175, 0.026, 8, 100]} />
          <meshPhysicalMaterial color="#ffdda0" metalness={0.88} roughness={0.16} emissive="#b88335" emissiveIntensity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

/** Slow-moving faceted jewels give the brand sculpture more depth than a flat badge. */
function OrbitingJewels({ compact }: { compact: boolean }) {
  const ring = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (ring.current) ring.current.rotation.z = clock.elapsedTime * 0.075; });
  const jewels: Array<[number, number, number, string]> = [
    [2.52, 1.28, .26, '#f7d095'], [-2.44, -1.13, .3, '#eaa5b5'],
    [-.42, 2.8, -.33, '#fff1d1'], [1.35, -2.6, .46, '#f5b6cd'],
  ];
  return <group ref={ring}>
    {jewels.slice(0, compact ? 2 : 4).map(([x, y, z, color], i) => <Float key={i} speed={1.3 + i * .3} floatIntensity={.14} rotationIntensity={.7}>
      <mesh position={[x, y, z]} scale={i % 2 ? .14 : .18}>
        <icosahedronGeometry args={[1, 0]}/>
        <meshPhysicalMaterial color={color} roughness={.17} metalness={.6} clearcoat={1} emissive={color} emissiveIntensity={.24}/>
      </mesh>
    </Float>)}
  </group>;
}

function Bloom({ position, color, scale = 1 }: { position: [number,number,number]; color: string; scale?: number }) {
  return <Float speed={1.15} floatIntensity={.12} rotationIntensity={.09}>
    <group position={position} scale={scale}>
      {Array.from({length:5}, (_, i) => {
        const a = i * Math.PI * 2 / 5;
        return <mesh key={i} position={[Math.cos(a)*.13, Math.sin(a)*.13, 0]} rotation={[0,0,a]} scale={[.18,.1,.05]}>
          <sphereGeometry args={[1,12,8]}/>
          <meshPhysicalMaterial color={color} roughness={.25} clearcoat={1}/>
        </mesh>;
      })}
      <mesh position={[0,0,.085]}><sphereGeometry args={[.083,12,8]}/><meshStandardMaterial color="#f7d290" metalness={.76} roughness={.22}/></mesh>
    </group>
  </Float>;
}

function SignatureSculpture({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Mesh>(null);
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.2 + Math.sin(t * 0.24) * 0.08, 0.035);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.13 + Math.cos(t * 0.23) * 0.035, 0.035);
      group.current.position.y = Math.sin(t * 0.62) * 0.07;
    }
    if (orbit.current) orbit.current.rotation.z = t * 0.06;
  });
  return (
    <group ref={group} scale={compact ? 0.75 : 0.85}>
      <mesh ref={orbit} rotation={[0.24, 0.1, 0.14]} position={[0.05, 0, -0.7]}>
        <torusGeometry args={[2.75, 0.019, 8, 180]} />
        <meshStandardMaterial color="#b48151" metalness={0.94} roughness={0.27} emissive="#724622" emissiveIntensity={0.23} />
      </mesh>
      <mesh rotation={[0.42, 0.1, -0.17]} position={[0.05, 0, -0.76]}>
        <torusGeometry args={[2.94, 0.009, 8, 180]} />
        <meshBasicMaterial color="#b0875c" transparent opacity={0.48} />
      </mesh>
      <Crescent />
      <BrandMedallion />
      <OrbitingJewels compact={compact}/>
      <Bloom position={[-2.04,1.2,.74]} color="#f5c0cb" scale={1.05}/>
      {!compact && <><Bloom position={[-2.2,.52,.72]} color="#f5dfbd" scale={.72}/><Bloom position={[1.7,-1.52,.42]} color="#f3b4c8" scale={.88}/></>}
      <mesh rotation={[.36,.1,-.2]} position={[.05,0,-.85]}>
        <torusGeometry args={[3.18,.012,6,160]}/>
        <meshBasicMaterial color="#f0c58b" transparent opacity={.43}/>
      </mesh>
      <Balloon position={[2.41, 1.19, -0.06]} color="#edb775" scale={0.82} floatSpeed={1.35} />
      <Balloon position={[3.08, 0.48, 0.38]} color="#cb7086" scale={0.7} floatSpeed={1.1} />
      <Balloon position={[-2.67, -0.76, 0.5]} color="#e0aab4" scale={0.61} floatSpeed={1.7} />
      <Sparkles count={compact ? 20 : 42} size={2.35} speed={0.36} scale={[7.2, 6.3, 2.5]} color="#f9dfa9" />
    </group>
  );
}

function ThreeComposition({ compact }: { compact: boolean }) {
  return (
    <>
      <ambientLight intensity={1.65} />
      <hemisphereLight args={['#ffe6cd', '#44203d', 1.5]} />
      <directionalLight position={[-4, 5, 8]} color="#ffe0af" intensity={4.5} />
      <pointLight position={[4, 2, 3]} intensity={65} distance={12} color="#f8a8b0" />
      <pointLight position={[-3, -3, 4]} intensity={35} distance={11} color="#f6b96b" />
      <Stars radius={28} depth={45} count={compact ? 110 : 330} factor={2.3} saturation={0.12} fade speed={0.45} />
      <Suspense fallback={null}>
        <SignatureSculpture compact={compact} />
      </Suspense>
    </>
  );
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch { return false; }
}

/** WebGL scene is optional so every mobile visitor can still browse & enquire smoothly. */
export default function MoonScene() {
  const holder = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState<boolean | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [compact, setCompact] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const small = window.matchMedia('(max-width: 980px)');
    const update = () => setCompact(small.matches);
    update();
    small.addEventListener?.('change', update);
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    // Honor motion preferences/data saving; user can still enable 3D explicitly.
    const lowPower = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || Boolean(nav.connection?.saveData) || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2);
    setEnabled(!lowPower);
    setReady(canUseWebGL());
    return () => small.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const node = holder.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(node);
    const update = () => { if (document.hidden) setVisible(false); else setVisible(node.getBoundingClientRect().bottom > 0 && node.getBoundingClientRect().top < innerHeight); };
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);

  const show3D = ready === true && enabled;
  return (
    <div className="scene-holder" ref={holder}>
      {show3D ? (
        <Canvas
          className="moon-canvas"
          camera={{ position: [0, 0, compact ? 11.2 : 11.1], fov: 41 }}
          gl={{ alpha: true, antialias: !compact, powerPreference: compact ? 'low-power' : 'high-performance' }}
          dpr={compact ? [1, 1.2] : [1, 1.65]}
          frameloop={visible ? 'always' : 'demand'}
          fallback={<div className="scene-fallback"><div className="fallback-orbit" /><img src="/images/logo-mark.webp" alt="Happy Moon Decoration" /></div>}
        >
          <ThreeComposition compact={compact} />
        </Canvas>
      ) : (
        <div className="scene-fallback" aria-label="Happy Moon Decoration logo">
          <div className="fallback-orbit" />
          <img src="/images/logo-mark.webp" alt="Happy Moon Decoration" />
        </div>
      )}
      {ready && (
        <button className="scene-mode-btn" type="button" aria-pressed={show3D}
          onClick={() => setEnabled((current) => !current)}>
          {show3D ? '3D OFF' : 'VIEW 3D'}
        </button>
      )}
    </div>
  );
}
