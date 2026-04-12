import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const KALKIDANE_PATH = '/KALKIDANE.glb'

useGLTF.preload(KALKIDANE_PATH)

function KalkidaneModel({ isMobile, onHover, onNavigate }) {
  const { scene } = useGLTF(KALKIDANE_PATH)
  const { camera } = useThree()
  const groupRef = useRef()
  const hoverScaleRef = useRef(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const { modelScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = new THREE.Vector3()
    box.getCenter(center)
    const maxSize = Math.max(size.x, size.y, size.z)
    const baseScale = maxSize > 0 ? 1 / maxSize : 1
    const visualScale = isMobile ? 6.4 : 5.5
    return {
      modelScale: baseScale * visualScale,
      centerOffset: center.clone().negate(),
    }
  }, [scene, isMobile])

  const clonedScene = useMemo(() => {
    const cloned = scene.clone()
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return cloned
  }, [scene])

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(modelScale)
    }
  }, [modelScale])

  useFrame((state, delta) => {
    const zoomed = isHovered || isPressed
    const targetCamZ = zoomed ? (isMobile ? 10.6 : 11.2) : 8
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, Math.min(delta * 7, 1))

    if (groupRef.current) {
      const targetHover = zoomed ? 1.38 : 1
      hoverScaleRef.current = THREE.MathUtils.lerp(hoverScaleRef.current, targetHover, Math.min(delta * 10, 1))
      groupRef.current.scale.setScalar(modelScale * hoverScaleRef.current)
    }
  })

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerOver={() => {
        setIsHovered(true)
        if (onHover) onHover(true)
      }}
      onPointerOut={() => {
        setIsHovered(false)
        setIsPressed(false)
        if (onHover) onHover(false)
      }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (onNavigate) onNavigate()
      }}
    >
      <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  )
}

/** Same center Kalkidane block as Home — use on every page with this header (not splash). */
export default function HeaderKalkidane({ isMobile, opacity }) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: isMobile ? '48px' : '80px',
        opacity,
        transition: 'opacity 2s ease-in-out',
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="Kalkidane — go to splash"
        onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
        style={{
          width: isMobile ? '168px' : '190px',
          height: isMobile ? '168px' : '190px',
          position: 'relative',
          marginTop: '-24px',
          cursor: 'pointer',
          touchAction: 'manipulation',
          transition: 'transform 0.2s ease',
          overflow: 'visible',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 100 }}
          gl={{ antialias: true, outputColorSpace: THREE.SRGBColorSpace }}
          style={{ width: '100%', height: '100%', background: 'transparent', display: 'block' }}
        >
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={1} />
          <KalkidaneModel isMobile={isMobile} onNavigate={() => navigate('/')} />
        </Canvas>
      </div>
    </div>
  )
}
