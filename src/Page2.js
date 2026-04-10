import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const KALKIDANE_PATH = '/KALKIDANE.glb'
const KIKI_LOGO_PATH = '/kiki logo 2.glb'

// Preload the models
useGLTF.preload(KALKIDANE_PATH)
useGLTF.preload(KIKI_LOGO_PATH)

// KALKIDANE 3D Model Component
function KalkidaneModel({ isMobile, opacity, onHover, onNavigate }) {
  const { scene } = useGLTF(KALKIDANE_PATH)
  const { camera } = useThree()
  const groupRef = useRef()
  const hoverScaleRef = useRef(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Calculate model scale to match About.PNG size (102px mobile, 152px desktop)
  const { modelScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = new THREE.Vector3()
    box.getCenter(center)
    const maxSize = Math.max(size.x, size.y, size.z)
    // Base scale to normalize the model
    const baseScale = maxSize > 0 ? 1 / maxSize : 1
    // Larger on mobile; desktop unchanged
    const visualScale = isMobile ? 6.4 : 5.5
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
  
  // Set initial scale
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(modelScale)
    }
  }, [modelScale])
  
  // Hover / press: scale up + ease camera back so the mesh stays inside the frustum (avoids edge clip)
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

// Kiki Logo 3D Model Component (for Page2)
function KikiLogoModel({ isMobile, opacity, onHover }) {
  const { scene } = useGLTF(KIKI_LOGO_PATH)
  const groupRef = useRef()
  const hoverScaleRef = useRef(1)
  const [isHovered, setIsHovered] = useState(false)
  
  // Calculate model scale to match other elements
  const { modelScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = new THREE.Vector3()
    box.getCenter(center)
    const maxSize = Math.max(size.x, size.y, size.z)
    const baseScale = maxSize > 0 ? 1 / maxSize : 1
    // Scale to match other elements (same as KALKIDANE for mobile)
    const visualScale = isMobile ? 1.5 : 2.5
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
  
  // Set initial scale
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(modelScale)
    }
  }, [modelScale])
  
  // Hover scale animation - stays enlarged while hovered
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
      onPointerOver={() => {
        setIsHovered(true)
        if (onHover) onHover(true)
      }}
      onPointerOut={() => {
        setIsHovered(false)
        if (onHover) onHover(false)
      }}
    >
      <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  )
}

export default function Page2Home(props) {
  const navigate = useNavigate()
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mediaHover, setMediaHover] = useState(false)
  const [aboutHover, setAboutHover] = useState(false)
  
  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Fade in animation on mount
    setOpacity(1)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <>
      {/* Fixed background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{ 
        width: '100%', 
        minHeight: '100vh', // Make page scrollable
        backgroundColor: 'transparent', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',
        overflowX: 'visible',
        overflowY: 'visible'
      }}>
      {/* Header section with logo - Fixed in place */}
      <header style={{
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
        boxSizing: 'border-box',
        overflow: 'visible',
      }}>
        {/* Left: Kstaura Logo */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'center',
          paddingLeft: '0px',
          opacity: opacity,
          transition: 'opacity 2s ease-in-out'
        }}>
          <img 
            src="/Kstaura Black logo.png" 
            alt="Kstaura Logo" 
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.border = '2px solid red';
            }}
            onLoad={() => console.log('Image loaded successfully')}
            style={{ 
              maxWidth: isMobile ? '100px' : '132px', 
              width: isMobile ? '48%' : 'auto',
              minWidth: isMobile ? '64px' : '108px',
              height: 'auto',
              objectFit: 'contain',
              opacity: opacity,
              transition: 'opacity 2s ease-in-out',
              display: 'block',
              marginTop: '-14px'
            }} 
          />
        </div>
        
        {/* Center: KALKIDANE.glb — tap / click returns to splash; hover or press scales up */}
        <div style={{ 
          flex: 1,
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          opacity: opacity,
          transition: 'opacity 2s ease-in-out'
        }}>
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
              <KalkidaneModel
                isMobile={isMobile}
                opacity={opacity}
                onNavigate={() => navigate('/')}
              />
            </Canvas>
          </div>
        </div>
        <div style={{ flex: 1 }} />
      </header>
      
      {/* Middle section: About kiki, Kiki Photography, Digital Journal - large and centered */}
      <section style={{
        width: '100%',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? '12px' : '24px',
        padding: isMobile ? '120px 20px 48px' : '160px 48px 80px',
        position: 'relative',
        zIndex: 5,
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        opacity,
        transition: 'opacity 2s ease-in-out'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: isMobile ? 'stretch' : 'flex-start',
          gap: isMobile ? 'clamp(28px, 8vw, 44px)' : '24px',
          width: '100%',
          maxWidth: isMobile ? 'min(100%, 520px)' : '1200px',
          margin: isMobile ? '0 auto' : undefined,
          flex: '1 1 auto'
        }}>
          <div
            style={{
              flex: isMobile ? '0 0 auto' : '1 1 0',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'stretch' : 'center',
              cursor: 'pointer',
              transform: aboutHover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              opacity: aboutHover ? 0.9 : 1
            }}
            onClick={() => navigate('/page3')}
            onMouseEnter={() => setAboutHover(true)}
            onMouseLeave={() => setAboutHover(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/page3')}
          >
            <img 
              src="/About%20kiki.jpg" 
              alt="About Kiki" 
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.border = '2px solid red';
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              style={{ 
                width: '100%',
                maxWidth: isMobile ? '100%' : '380px',
                height: 'auto',
                maxHeight: isMobile ? 'none' : '65vh',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
            <p style={{
              fontFamily: isMobile ? 'Inter, system-ui, sans-serif' : '"Caveat", cursive',
              fontSize: isMobile ? '15px' : '16px',
              fontWeight: 'bold',
              color: '#000',
              margin: '10px 0 0 0',
              alignSelf: 'flex-start',
              width: '100%',
              maxWidth: isMobile ? '100%' : '380px',
              textAlign: 'left',
              letterSpacing: isMobile ? '-0.01em' : undefined
            }}>{isMobile ? '* About Me' : 'About Me'}</p>
          </div>
          <div
            style={{
              flex: isMobile ? '0 0 auto' : '1 1 0',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'stretch' : 'center',
              cursor: 'pointer',
              transform: mediaHover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              opacity: mediaHover ? 0.9 : 1
            }}
            onClick={() => navigate('/media')}
            onMouseEnter={() => setMediaHover(true)}
            onMouseLeave={() => setMediaHover(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/media')}
          >
            <img 
              src="/Kiki%20Photography.jpg" 
              alt="Kiki Photography" 
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.border = '2px solid red';
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              style={{ 
                width: '100%',
                maxWidth: isMobile ? '100%' : '380px',
                height: 'auto',
                maxHeight: isMobile ? 'none' : '65vh',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
            <p style={{
              fontFamily: isMobile ? 'Inter, system-ui, sans-serif' : '"Caveat", cursive',
              fontSize: isMobile ? '15px' : '16px',
              fontWeight: 'bold',
              color: '#000',
              margin: '10px 0 0 0',
              alignSelf: 'flex-start',
              width: '100%',
              maxWidth: isMobile ? '100%' : '380px',
              textAlign: 'left',
              letterSpacing: isMobile ? '-0.01em' : undefined
            }}>{isMobile ? '* Media' : 'Media'}</p>
          </div>
          <div style={{ flex: isMobile ? '0 0 auto' : '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'stretch' : 'center' }}>
            <img 
              src="/Newsletter%20Kiki.jpg" 
              alt="Digital Journal" 
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.border = '2px solid red';
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              style={{ 
                width: '100%',
                maxWidth: isMobile ? '100%' : '380px',
                height: 'auto',
                maxHeight: isMobile ? 'none' : '65vh',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
            <p style={{
              fontFamily: isMobile ? 'Inter, system-ui, sans-serif' : '"Caveat", cursive',
              fontSize: isMobile ? '15px' : '16px',
              fontWeight: 'bold',
              color: '#000',
              margin: '10px 0 0 0',
              alignSelf: 'flex-start',
              width: '100%',
              maxWidth: isMobile ? '100%' : '380px',
              textAlign: 'left',
              letterSpacing: isMobile ? '-0.01em' : undefined
            }}>{isMobile ? '* Digital Journal' : 'Digital Journal'}</p>
          </div>
        </div>
      </section>
      
      </div>
    </>
  )
}
