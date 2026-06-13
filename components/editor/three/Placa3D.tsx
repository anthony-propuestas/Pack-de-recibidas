'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type Konva from 'konva'
import { FRAME_W, FRAME_H, STAGE_W, STAGE_H } from '@/lib/frameConfig'

const ASPECT = FRAME_W / FRAME_H

// Placa física (slab) 4×3; el plano de impresión cubre todo el stage (placa + bleed).
const PLATE_W = 4
const PLATE_H = PLATE_W / ASPECT
const PRINT_W = PLATE_W * (STAGE_W / FRAME_W)
const PRINT_H = PLATE_H * (STAGE_H / FRAME_H)

function PlacaMesh({ texture }: { texture: THREE.Texture }) {
  return (
    <group>
      {/* Cuerpo: slab blanco con grosor. Respaldo opaco ⇒ la cara trasera no duplica el
          contenido y el centro se ve blanco (consistente con la tarjeta blanca del 2D). */}
      <mesh castShadow>
        <boxGeometry args={[PLATE_W, PLATE_H, 0.14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Impreso: plano del tamaño del stage completo. alphaTest descarta los márgenes
          transparentes, así solo se ven el marco y los objetos; los que cruzan el borde
          sobresalen como stickers más allá del canto. FrontSide ⇒ cara trasera limpia. */}
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[PRINT_W, PRINT_H]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.5}
          side={THREE.FrontSide}
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>
    </group>
  )
}

export default function Placa3D({ stageRef }: { stageRef: React.RefObject<Konva.Stage> }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  // Snapshot del stage Konva → textura. Se ejecuta al montar (cada vez que se entra a 3D).
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    // Snapshot completo (placa + bleed) para que los objetos que sobresalen entren en la textura.
    const url = stage.toDataURL({ pixelRatio: 2 })
    const loader = new THREE.TextureLoader()
    loader.load(url, (t) => {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 8
      setTexture(t)
    })
  }, [stageRef])

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 6]} intensity={1.3} />
      <directionalLight position={[-4, -2, 3]} intensity={0.4} />
      {texture && <PlacaMesh texture={texture} />}
      <OrbitControls enablePan enableZoom enableRotate minDistance={2.5} maxDistance={12} />
    </Canvas>
  )
}
