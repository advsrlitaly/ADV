import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

// ✅ Solo immagini che esistono in /public/images
const imageUrls = [
  "/images/javascript.webp",
  "/images/mysql.webp",
  "/images/node.webp",
  "/images/tt.png",
  "/images/fb.png",
  "/images/ig.png",
  "/images/google.png",
  "/images/tdm.png",
  "/images/ADVsrl.png",
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(15)].map((_, i) => ({
  scale: [0.7, 1, 0.8, 1, 1][i % 5],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({ vec = new THREE.Vector3(), scale, material, isActive }: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.05, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(new THREE.Vector3(-50 * delta * scale, -150 * delta * scale, -50 * delta * scale));
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20) - 25,
        THREE.MathUtils.randFloatSpread(20) - 10,
      ]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material={material} rotation={[0.3, 1, 1]} />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3(), isActive }: { vec?: THREE.Vector3; isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0),
      0.2
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

// ✅ Error Boundary — se qualcosa va storto, il sito continua a funzionare
class TechErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const TechStackInner = () => {
  const [isActive, setIsActive] = useState(false);
  const textures = useLoader(THREE.TextureLoader, imageUrls);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#work",
      start: "top center",
      onEnter: () => setIsActive(true),
      onLeaveBack: () => setIsActive(false),
    });
    return () => trigger.kill();
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, [textures]);

  const sphereMaterials = useMemo(() => {
    return spheres.map((_, i) => materials[i % materials.length]);
  }, [materials]);

  return (
    <div className="techstack">
      <h2>My Techstack</h2>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32 }}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[256, 256]} />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo key={i} {...props} material={sphereMaterials[i]} isActive={isActive} />
          ))}
        </Physics>
        <Environment files="/models/char_enviorment.hdr" environmentIntensity={0.5} />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#5bc8bf" aoRadius={2} intensity={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

const TechStack = () => (
  <TechErrorBoundary>
    <TechStackInner />
  </TechErrorBoundary>
);

export default TechStack;