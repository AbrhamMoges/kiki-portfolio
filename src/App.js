import * as THREE from 'three'
import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { Effects } from './Effects'

const MODEL_PATH = '/kiki logo 2.glb'
const MODEL_COLOR = '#4060ff'

// Preload the model
useGLTF.preload(MODEL_PATH)

export default function App(props) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  return (
    <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false, outputColorSpace: THREE.SRGBColorSpace, toneMapping: THREE.ACESFilmicToneMapping }} camera={{ position: [0, 0, isMobile ? 25 : 30], fov: isMobile ? 20 : 17.5, near: 10, far: 40 }} {...props} onCreated={({ gl }) => { gl.domElement.style.cursor = 'default' }}>
      <color attach="background" args={['white']} />
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.8} />
      {/* Front-facing light for the logo with blue tint */}
      <FrontSpotLight />
      <pointLight position={[0, 0, 15]} intensity={2.5} color="#4060ff" />
      {/* Blue tint lights around the logo */}
      <pointLight position={[5, 0, 0]} intensity={1.5} color="#4060ff" />
      <pointLight position={[-5, 0, 0]} intensity={1.5} color="#4060ff" />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#4060ff" />
      <pointLight position={[0, -5, 0]} intensity={1.5} color="#4060ff" />
      {/* Additional lights for right and center areas */}
      <pointLight position={[8, 0, 10]} intensity={2.5} color="#4060ff" />
      <pointLight position={[10, 5, 5]} intensity={2} color="#4060ff" />
      <pointLight position={[0, 0, 12]} intensity={3} color="#4060ff" />
      <directionalLight position={[15, 0, 10]} intensity={1.5} color="#4060ff" />
      <pointLight position={[6, 3, 8]} intensity={2} color="#4060ff" />
      <KikiLogo />
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
let cachedCenterOffset = null

function FrontSpotLight() {
  const lightRef = useRef()
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.target.position.set(0, 0, 0)
      lightRef.current.target.updateMatrixWorld()
    }
  })
  return (
    <spotLight
      ref={lightRef}
      position={[0, 0, 20]}
      intensity={3}
      angle={0.6}
      penumbra={0.3}
      color="#4060ff"
    />
  )
}

function KikiLogo() {
  const { scene } = useGLTF(MODEL_PATH)
  const { viewport } = useThree()
  const groupRef = useRef()
  const scaleRef = useRef(0)
  const startTimeRef = useRef(null)
  const [isClicked, setIsClicked] = useState(false)
  const [scaleDownStart, setScaleDownStart] = useState(null)
  const hasNavigatedRef = useRef(false)
  const navigate = useNavigate()
  const isMobile = viewport.width < 10
  
  // Calculate model scale and center offset once and cache it
  const { modelScale, centerOffset } = useMemo(() => {
    if (cachedModelScale !== null) {
      return { modelScale: cachedModelScale, centerOffset: cachedCenterOffset }
    }
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = new THREE.Vector3()
    box.getCenter(center)
    const maxSize = Math.max(size.x, size.y, size.z)
    // Scale to match original sphere size of 1
    cachedModelScale = maxSize > 0 ? 1 / maxSize : 1
    cachedCenterOffset = center.clone().negate()
    return { modelScale: cachedModelScale, centerOffset: cachedCenterOffset }
  }, [scene])
  
  // Adjust scale for mobile
  const mobileScale = isMobile ? 0.4 : 1
  
  const clonedScene = useMemo(() => {
    const cloned = scene.clone()
    // Only enable shadows, preserve original materials
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
  
  // Animation: scale from 0 to 1, or scale down from 1 to 0 if clicked
  useFrame((state) => {
    if (isClicked && scaleDownStart === null) {
      setScaleDownStart(state.clock.elapsedTime)
    }
    
    if (isClicked && scaleDownStart !== null) {
      // Scale down animation
      const elapsed = state.clock.elapsedTime - scaleDownStart
      const duration = 1 // 1 second
      
      if (elapsed < duration) {
        const progress = elapsed / duration
        // Reverse smooth step: from 1 to 0
        scaleRef.current = 1 - (progress * progress * (3 - 2 * progress))
      } else {
        scaleRef.current = 0
        // Navigate after animation completes (only once)
        if (!hasNavigatedRef.current) {
          hasNavigatedRef.current = true
          setTimeout(() => {
            navigate('/page2')
          }, 100)
        }
      }
    } else {
      // Scale up animation (initial)
      if (startTimeRef.current === null) {
        startTimeRef.current = state.clock.elapsedTime
      }
      
      const elapsed = state.clock.elapsedTime - startTimeRef.current
      const duration = 2.5 // 2.5 seconds
      
      if (elapsed < duration) {
        // Ease out animation
        const progress = elapsed / duration
        scaleRef.current = progress * progress * (3 - 2 * progress) // Smooth step interpolation
      } else {
        scaleRef.current = 1
      }
    }
    
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current)
    }
  })
  
  // Handle click
  const handleClick = (e) => {
    e.stopPropagation()
    if (!isClicked) {
      setIsClicked(true)
    }
  }
  
  const rotationGroupRef = useRef()
  const targetRotationY = useRef(0)
  const targetRotationX = useRef(-5 * Math.PI / 180)
  
  // Gentle floating animation and mouse following
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.3
    }
    
    // Make logo's face follow the mouse/touch accurately across the screen (horizontal and vertical)
    if (rotationGroupRef.current) {
      const mouse = state.mouse
      
      // Convert mouse position to world coordinates for accurate following
      const mouseX = mouse.x * viewport.width / 2
      const mouseY = mouse.y * viewport.height / 2
      
      // Calculate direction vector from logo center to mouse position
      const direction = new THREE.Vector3(mouseX, mouseY, 10).normalize()
      
      // Calculate target Y rotation to face the mouse horizontally
      const targetY = Math.atan2(direction.x, direction.z)
      
      // Calculate target X rotation to follow mouse vertically (up and down)
      // Tilt down by 5 degrees (-5 * Math.PI / 180) and add vertical following
      const baseTilt = -5 * Math.PI / 180 // -5 degrees down
      const verticalFollow = -Math.asin(direction.y) * 0.5 // Follow mouse up/down
      const targetX = baseTilt + verticalFollow
      
      // Smooth interpolation for mobile (lerp with delta time for consistent smoothing)
      const lerpFactor = isMobile ? Math.min(delta * 8, 1) : Math.min(delta * 12, 1) // Faster smoothing on mobile
      targetRotationY.current = THREE.MathUtils.lerp(targetRotationY.current, targetY, lerpFactor)
      targetRotationX.current = THREE.MathUtils.lerp(targetRotationX.current, targetX, lerpFactor)
      
      // Apply smoothed rotation
      rotationGroupRef.current.rotation.y = targetRotationY.current
      rotationGroupRef.current.rotation.x = targetRotationX.current
      rotationGroupRef.current.rotation.z = 0 // No Z rotation
    }
  })
  
  const finalScale = modelScale * 6 * mobileScale
  
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0} rotation={[0, 0, 0]} onClick={handleClick} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }} onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default' }}>
      <group ref={rotationGroupRef} scale={finalScale}>
        <group rotation={[-Math.PI / 9, Math.PI / 3, 0]}>
          <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
            <primitive object={clonedScene} />
          </group>
        </group>
      </group>
    </group>
  )
}
