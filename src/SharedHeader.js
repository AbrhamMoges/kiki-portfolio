import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const KALKIDANE_PATH = '/KALKIDANE.glb'

useGLTF.preload(KALKIDANE_PATH)

function KalkidaneModel({ isMobile, opacity }) {
  const { scene } = useGLTF(KALKIDANE_PATH)
  const groupRef = useRef()
  const hoverScaleRef = useRef(1)
  const [isHovered, setIsHovered] = useState(false)

  const { modelScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = new THREE.Vector3()
    box.getCenter(center)
    const maxSize = Math.max(size.x, size.y, size.z)
    const baseScale = maxSize > 0 ? 1 / maxSize : 1
    const visualScale = isMobile ? 4.5 : 5.5
    return {
      modelScale: baseScale * visualScale,
      centerOffset: center.clone().negate()
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
    if (groupRef.current) {
      const targetScale = isHovered ? 1.3 : 1
      hoverScaleRef.current = THREE.MathUtils.lerp(hoverScaleRef.current, targetScale, Math.min(delta * 8, 1))
      groupRef.current.scale.setScalar(modelScale * hoverScaleRef.current)
    }
  })

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  )
}

export default function SharedHeader() {
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    setOpacity(1)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <header
      style={{
        width: '100%',
        padding: isMobile ? '0px 20px' : '0px 40px',
        paddingTop: isMobile ? '0px' : '0px',
        marginTop: isMobile ? '-24px' : '-24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: '0px',
          opacity,
          transition: 'opacity 2s ease-in-out',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/page2')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigate('/page2')
          }
        }}
      >
        <img
          src="/Kstaura Black logo.png"
          alt="Kstaura Logo"
          onError={(e) => {
            console.error('Image failed to load:', e.target.src)
            e.target.style.border = '2px solid red'
          }}
          style={{
            maxWidth: isMobile ? '70px' : '95px',
            width: isMobile ? '35%' : 'auto',
            minWidth: isMobile ? '45px' : '80px',
            height: 'auto',
            objectFit: 'contain',
            opacity,
            transition: 'opacity 2s ease-in-out',
            display: 'block',
            marginTop: '-14px',
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity,
          transition: 'opacity 2s ease-in-out'
        }}
      >
        <div
          style={{
            width: isMobile ? '120px' : '190px',
            height: isMobile ? '120px' : '190px',
            position: 'relative',
            marginTop: '-24px',
            cursor: 'pointer'
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 100 }}
            gl={{ antialias: true, outputColorSpace: THREE.SRGBColorSpace }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          >
            <color attach="background" args={['transparent']} />
            <ambientLight intensity={1} />
            <KalkidaneModel isMobile={isMobile} opacity={opacity} />
          </Canvas>
        </div>
      </div>

      <div style={{ flex: 1 }} />
    </header>
  )
}
