import * as THREE from 'three'
import { useRef, useReducer, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF } from '@react-three/drei'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { easing } from 'maath'
import { Effects } from './Effects'

const MODEL_PATH = '/kiki logo 2.glb'
const CENTER_MODEL_PATH = '/KALKIDANE.glb'
const MODEL_COLOR = '#4060ff'

// Preload the models
useGLTF.preload(MODEL_PATH)
useGLTF.preload(CENTER_MODEL_PATH)

const accents = ['#ff4060', '#ffcc00', '#20ffa0', '#4060ff']
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: '#444', roughness: 0.1 },
  { color: '#444', roughness: 0.3 },
  { color: '#444', roughness: 0.3 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.2 },
  { color: 'white', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true, transparent: true, opacity: 0.5 },
  { color: accents[accent], roughness: 0.3, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true }
]

export default function App(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])
  return (
    <Canvas shadows onClick={click} dpr={[1, 1.5]} gl={{ antialias: false, outputColorSpace: THREE.SRGBColorSpace, toneMapping: THREE.ACESFilmicToneMapping }} camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 40 }} {...props}>
      <color attach="background" args={['white']} />
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.8} />
      <CenterModel />
      <Physics /*debug*/ timeStep="vary" gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Sphere key={i} {...props} />
        ))}
      </Physics>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer form="ring" color="#4060ff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
        </group>
      </Environment>
      <Effects />
    </Canvas>
  )
}

// Shared model scale calculation (calculated once, cached)
let cachedModelScale = null
let cachedCenterModelScale = null
let cachedCenterOffset = null

function CenterModel() {
  const { scene } = useGLTF(CENTER_MODEL_PATH)
  
  // Calculate center model scale and center offset once and cache it
  const { modelScale, centerOffset } = useMemo(() => {
    if (cachedCenterModelScale !== null) {
      return { modelScale: cachedCenterModelScale, centerOffset: cachedCenterOffset }
    }
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = new THREE.Vector3()
    box.getCenter(center)
    const maxSize = Math.max(size.x, size.y, size.z)
    // Scale to match original sphere size of 1
    cachedCenterModelScale = maxSize > 0 ? 1 / maxSize : 1
    cachedCenterOffset = center.clone().negate()
    return { modelScale: cachedCenterModelScale, centerOffset: cachedCenterOffset }
  }, [scene])
  
  const clonedScene = useMemo(() => {
    const cloned = scene.clone()
    // Enable shadows and make materials shiny
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        const mat = child.material
        if (mat) {
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              if (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial) {
                m.metalness = Math.max(m.metalness || 0, 0.9)
                m.roughness = Math.min(m.roughness || 0.5, 0.1)
                m.needsUpdate = true
              }
            })
          } else if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
            mat.metalness = Math.max(mat.metalness || 0, 0.9)
            mat.roughness = Math.min(mat.roughness || 0.5, 0.1)
            mat.needsUpdate = true
          }
        }
      }
    })
    return cloned
  }, [scene])
  
  return (
    <group position={[0, 0, 0]} scale={modelScale * 8}>
      <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  )
}

function Sphere({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, color = 'white', ...props }) {
  const api = useRef()
  const groupRef = useRef()
  const { scene } = useGLTF(MODEL_PATH)
  
  // Calculate model scale once and cache it
  const modelScale = useMemo(() => {
    if (cachedModelScale !== null) return cachedModelScale
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const maxSize = Math.max(size.x, size.y, size.z)
    // Scale to match original sphere size of 1
    cachedModelScale = maxSize > 0 ? 1 / maxSize : 1
    return cachedModelScale
  }, [scene])
  
  const clonedScene = useMemo(() => {
    const cloned = scene.clone()
    // Only enable shadows, preserve original materials; optionally tint if no texture map
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        const mat = child.material
        if (mat && mat.isMeshStandardMaterial) {
          if (!mat.map && MODEL_COLOR) {
            mat.color.set(MODEL_COLOR)
            mat.needsUpdate = true
          }
        }
      }
    })
    return cloned
  }, [scene])
  
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
  
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    // Increase interaction force for better responsiveness
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.5))
    // No color/material changes - preserve original materials
  })
  
  // Make flying logos bigger
  const finalScale = (scale || 1) * modelScale * 2
  
  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <BallCollider args={[2]} />
      <group ref={groupRef} castShadow receiveShadow scale={finalScale}>
        <primitive object={clonedScene} />
        {children}
      </group>
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)))
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[3]} />
    </RigidBody>
  )
}
