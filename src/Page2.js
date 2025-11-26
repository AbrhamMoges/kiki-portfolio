import { useState, useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const KALKIDANE_PATH = '/KALKIDANE.glb'
const KIKI_LOGO_PATH = '/kiki logo 2.glb'

// Preload the models
useGLTF.preload(KALKIDANE_PATH)
useGLTF.preload(KIKI_LOGO_PATH)

// KALKIDANE 3D Model Component
function KalkidaneModel({ isMobile, opacity, onHover }) {
  const { scene } = useGLTF(KALKIDANE_PATH)
  const groupRef = useRef()
  const hoverScaleRef = useRef(1)
  const [isHovered, setIsHovered] = useState(false)
  
  // Calculate model scale to match About.PNG size (102px mobile, 152px desktop)
  const { modelScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = new THREE.Vector3()
    box.getCenter(center)
    const maxSize = Math.max(size.x, size.y, size.z)
    // Base scale to normalize the model
    const baseScale = maxSize > 0 ? 1 / maxSize : 1
    // Scale to match About.PNG visual size, plus 5 inches bigger
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
  
  // Set initial scale
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(modelScale)
    }
  }, [modelScale])
  
  // Hover scale animation (no floating) - stays enlarged while hovered
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth hover scale - stays at 1.3x while hovered, returns to 1x when not hovered
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
  const [opacity, setOpacity] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isAboutHovered, setIsAboutHovered] = useState(false)
  const [isContactHovered, setIsContactHovered] = useState(false)
  const [isMediaCoverHovered, setIsMediaCoverHovered] = useState(false)
  const [isPhotographyCoverHovered, setIsPhotographyCoverHovered] = useState(false)
  const [isAboutMeCoverHovered, setIsAboutMeCoverHovered] = useState(false)
  const [isWritingCoverHovered, setIsWritingCoverHovered] = useState(false)
  
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
        boxSizing: 'border-box'
      }}>
        {/* Left: KALKIDANE.glb */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'center',
          paddingLeft: '0px',
          opacity: opacity,
          transition: 'opacity 2s ease-in-out'
        }}>
          <div style={{
            width: isMobile ? '102px' : '152px',
            height: isMobile ? '102px' : '152px',
            position: 'relative',
            marginTop: '-48px',
            marginLeft: '-24px',
            cursor: 'pointer'
          }}>
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
        
        {/* Center: Kstaura Logo */}
        <img 
          src="/Kstaura Black logo.png" 
          alt="Kstaura Logo" 
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            e.target.style.border = '2px solid red';
          }}
          onLoad={() => console.log('Image loaded successfully')}
          style={{ 
            maxWidth: isMobile ? '126px' : '176px', 
            width: isMobile ? '50%' : 'auto',
            minWidth: isMobile ? '76px' : '150px',
            height: 'auto',
            objectFit: 'contain',
            opacity: opacity,
            transition: 'opacity 2s ease-in-out',
            display: 'block'
          }} 
        />
        
        {/* Right: About.PNG and Contact.PNG */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: isMobile ? '10px' : '20px', paddingRight: isMobile ? '0px' : '20px' }}>
          <img 
            src="/About.PNG" 
            alt="About" 
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.border = '2px solid red';
            }}
            onLoad={() => console.log('About image loaded successfully')}
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
            onTouchStart={() => setIsAboutHovered(true)}
            onTouchEnd={() => setIsAboutHovered(false)}
            style={{ 
              maxWidth: isMobile ? '102px' : '152px', 
              width: isMobile ? '50%' : 'auto',
              minWidth: isMobile ? '52px' : '102px',
              height: 'auto',
              objectFit: 'contain',
              opacity: opacity,
              transition: 'opacity 2s ease-in-out, transform 0.3s ease-in-out',
              transform: `scale(${isAboutHovered ? 1.3 : 1})`,
              display: 'block',
              marginTop: '-48px',
              cursor: 'pointer'
            }} 
          />
          <img 
            src="/Contact.PNG" 
            alt="Contact" 
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.border = '2px solid red';
            }}
            onLoad={() => console.log('Contact image loaded successfully')}
            onMouseEnter={() => setIsContactHovered(true)}
            onMouseLeave={() => setIsContactHovered(false)}
            onTouchStart={() => setIsContactHovered(true)}
            onTouchEnd={() => setIsContactHovered(false)}
            style={{ 
              maxWidth: isMobile ? '102px' : '152px', 
              width: isMobile ? '50%' : 'auto',
              minWidth: isMobile ? '52px' : '102px',
              height: 'auto',
              objectFit: 'contain',
              opacity: opacity,
              transition: 'opacity 2s ease-in-out, transform 0.3s ease-in-out',
              transform: `scale(${isContactHovered ? 1.3 : 1})`,
              display: 'block',
              marginTop: '-48px',
              cursor: 'pointer'
            }} 
          />
        </div>
      </header>
      
      {/* Cover Images Section - Centered in the middle of the page */}
      <section style={{
        width: isMobile ? '100%' : '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0px',
        padding: isMobile ? '180px 10px 40px' : '220px 40px 60px',
        minHeight: 'calc(100vh - 120px)',
        position: 'relative',
        zIndex: 20,
        marginTop: 0,
        marginLeft: isMobile ? '-30px' : '-100px',
        marginRight: isMobile ? 'auto' : 'auto',
        backgroundColor: 'transparent',
        pointerEvents: 'auto',
        overflowX: 'visible',
        overflowY: 'visible',
        boxSizing: 'border-box'
      }}>
        {/* Media Cover */}
        <div style={{
          width: 'auto',
          maxWidth: isMobile ? '250px' : '650px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 20,
          marginRight: '0px',
          marginTop: isMobile ? '15px' : '40px',
          marginLeft: isMobile ? '0px' : '50px'
        }}
        onMouseEnter={() => setIsMediaCoverHovered(true)}
        onMouseLeave={() => setIsMediaCoverHovered(false)}
        onTouchStart={() => setIsMediaCoverHovered(true)}
        onTouchEnd={() => setIsMediaCoverHovered(false)}
        >
          <img 
            src="/Media Cover.png" 
            alt="Media Cover" 
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.border = '2px solid red';
              e.target.style.backgroundColor = '#f0f0f0';
            }}
            onLoad={() => console.log('Media Cover image loaded successfully')}
            style={{ 
              width: 'auto',
              maxWidth: isMobile ? '250px' : '650px',
              height: 'auto',
              objectFit: 'contain',
              opacity: 1,
              transition: 'opacity 2s ease-in-out, transform 0.3s ease-in-out',
              transform: `scale(${isMediaCoverHovered ? 1.05 : 1})`,
              display: 'block',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 25,
              backgroundColor: 'transparent',
              visibility: 'visible'
            }} 
          />
          {/* White overlay on hover */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            opacity: isMediaCoverHovered ? 0.5 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: 'none',
            zIndex: 26,
            borderRadius: 'inherit'
          }} />
        </div>
        
        {/* Photography Cover */}
        <div style={{
          width: 'auto',
          maxWidth: isMobile ? '115px' : '240px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 21,
          marginLeft: isMobile ? '-100px' : '-250px',
          marginTop: isMobile ? '40px' : '120px'
        }}
        onMouseEnter={() => setIsPhotographyCoverHovered(true)}
        onMouseLeave={() => setIsPhotographyCoverHovered(false)}
        onTouchStart={() => setIsPhotographyCoverHovered(true)}
        onTouchEnd={() => setIsPhotographyCoverHovered(false)}
        >
          <img 
            src="/Photography Cover.png" 
            alt="Photography Cover" 
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.border = '2px solid red';
              e.target.style.backgroundColor = '#f0f0f0';
            }}
            onLoad={() => console.log('Photography Cover image loaded successfully')}
            style={{ 
              width: 'auto',
              maxWidth: isMobile ? '115px' : '240px',
              height: 'auto',
              objectFit: 'contain',
              opacity: 1,
              transition: 'opacity 2s ease-in-out, transform 0.3s ease-in-out',
              transform: `scale(${isPhotographyCoverHovered ? 1.05 : 1})`,
              display: 'block',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 25,
              backgroundColor: 'transparent',
              visibility: 'visible'
            }} 
          />
          {/* White overlay on hover */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            opacity: isPhotographyCoverHovered ? 0.5 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: 'none',
            zIndex: 26,
            borderRadius: 'inherit'
          }} />
        </div>
        
        {/* About Me Cover */}
        <div style={{
          width: 'auto',
          maxWidth: isMobile ? '105px' : '220px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 22,
          marginLeft: isMobile ? '-50px' : '-100px',
          marginTop: isMobile ? '18px' : '50px'
        }}
        onMouseEnter={() => setIsAboutMeCoverHovered(true)}
        onMouseLeave={() => setIsAboutMeCoverHovered(false)}
        onTouchStart={() => setIsAboutMeCoverHovered(true)}
        onTouchEnd={() => setIsAboutMeCoverHovered(false)}
        >
          <img 
            src="/About Me Cover.png" 
            alt="About Me Cover" 
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.border = '2px solid red';
              e.target.style.backgroundColor = '#f0f0f0';
            }}
            onLoad={() => console.log('About Me Cover image loaded successfully')}
            style={{ 
              width: 'auto',
              maxWidth: isMobile ? '105px' : '220px',
              height: 'auto',
              objectFit: 'contain',
              opacity: 1,
              transition: 'opacity 2s ease-in-out, transform 0.3s ease-in-out',
              transform: `scale(${isAboutMeCoverHovered ? 1.05 : 1})`,
              display: 'block',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 25,
              backgroundColor: 'transparent',
              visibility: 'visible'
            }} 
          />
          {/* White overlay on hover */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            opacity: isAboutMeCoverHovered ? 0.5 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: 'none',
            zIndex: 26,
            borderRadius: 'inherit'
          }} />
        </div>
        
        {/* Writing Cover */}
        <div style={{
          width: 'auto',
          maxWidth: isMobile ? '160px' : '330px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 21,
          marginLeft: isMobile ? '-22px' : '-40px',
          marginTop: isMobile ? '28px' : '80px'
        }}
        onMouseEnter={() => setIsWritingCoverHovered(true)}
        onMouseLeave={() => setIsWritingCoverHovered(false)}
        onTouchStart={() => setIsWritingCoverHovered(true)}
        onTouchEnd={() => setIsWritingCoverHovered(false)}
        >
          <img 
            src="/writing cover.png" 
            alt="Writing Cover" 
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.border = '2px solid red';
              e.target.style.backgroundColor = '#f0f0f0';
            }}
            onLoad={() => console.log('Writing Cover image loaded successfully')}
            style={{ 
              width: 'auto',
              maxWidth: isMobile ? '160px' : '330px',
              height: 'auto',
              objectFit: 'contain',
              opacity: 1,
              transition: 'opacity 2s ease-in-out, transform 0.3s ease-in-out',
              transform: `scale(${isWritingCoverHovered ? 1.05 : 1}) rotate(8deg)`,
              display: 'block',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 25,
              backgroundColor: 'transparent',
              visibility: 'visible'
            }} 
          />
          {/* White overlay on hover */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            opacity: isWritingCoverHovered ? 0.5 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: 'none',
            zIndex: 26,
            borderRadius: 'inherit'
          }} />
        </div>
      </section>
      
      </div>
    </>
  )
}
