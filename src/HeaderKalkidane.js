import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const KALKIDANE_PATH = '/KALKIDANE.glb'

const CAM_Z_IDLE = 8
/** Small pullback only: enough to reduce clipping without shrinking the logo like a big dolly + wide FOV did. */
const CAM_Z_HOVER = 8.55
const FOV = 50
/** Must read clearly larger than idle; kept moderate so edges stay inside the frame. */
const HOVER_SCALE = 1.28

useGLTF.preload(KALKIDANE_PATH)

function KalkidaneModel({ isMobile, hoverActive }) {
  const { scene } = useGLTF(KALKIDANE_PATH)
  const { camera } = useThree()
  const groupRef = useRef()
  const hoverScaleRef = useRef(1)

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
    if (camera.isPerspectiveCamera) {
      camera.fov = FOV
      camera.position.z = CAM_Z_IDLE
      camera.updateProjectionMatrix()
    }
    if (groupRef.current) {
      groupRef.current.scale.setScalar(modelScale)
    }
    hoverScaleRef.current = 1
  }, [camera, modelScale])

  useFrame((_, delta) => {
    const zoomed = hoverActive
    const targetHover = zoomed ? HOVER_SCALE : 1
    const t = Math.min(delta * 12, 1)
    hoverScaleRef.current = THREE.MathUtils.lerp(hoverScaleRef.current, targetHover, t)

    const targetZ = zoomed ? CAM_Z_HOVER : CAM_Z_IDLE

    if (camera.isPerspectiveCamera) {
      // No FOV change — wider FOV was making the logo look smaller on hover.
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, t * 0.9)
      camera.updateProjectionMatrix()
    }

    if (groupRef.current) {
      groupRef.current.scale.setScalar(modelScale * hoverScaleRef.current)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  )
}

/** Same center Kalkidane block as Home — use on every page with this header (not splash). */
export default function HeaderKalkidane({ isMobile, opacity }) {
  const navigate = useNavigate()
  const [hoverActive, setHoverActive] = useState(false)

  /* Slightly larger draw surface so scaled render has breathing room vs the viewport */
  const boxW = isMobile ? 200 : 228
  const boxH = isMobile ? 200 : 228

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
        overflow: 'visible',
        minWidth: 0,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="Kalkidane — go to splash"
        onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
        onPointerEnter={() => setHoverActive(true)}
        onPointerLeave={() => setHoverActive(false)}
        onClick={() => navigate('/')}
        style={{
          width: `${boxW}px`,
          height: `${boxH}px`,
          position: 'relative',
          marginTop: '-24px',
          cursor: 'pointer',
          touchAction: 'manipulation',
          overflow: 'visible',
          flexShrink: 0,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, CAM_Z_IDLE], fov: FOV, near: 0.1, far: 100 }}
          gl={{ antialias: true, outputColorSpace: THREE.SRGBColorSpace }}
          dpr={[1, 2]}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            display: 'block',
          }}
        >
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={1} />
          <KalkidaneModel isMobile={isMobile} hoverActive={hoverActive} />
        </Canvas>
      </div>
    </div>
  )
}
