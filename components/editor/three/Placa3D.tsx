'use client'

import { useEffect, useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type Konva from 'konva'
import { FRAME_W, FRAME_H, MARGIN } from '@/lib/frameConfig'

const ASPECT = FRAME_W / FRAME_H

function PlacaMesh({ texture }: { texture: THREE.Texture }) {
  const w = 4
  const h = w / ASPECT

  // Solo la cara frontal lleva la textura; el resto es un canto sólido. Así la cara
  // trasera no espeja/duplica el contenido. Orden de caras del box: [px, nx, py, ny, pz(frente), nz(atrás)].
  const materials = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: '#e5e7eb', roughness: 0.7, metalness: 0.05 })
    const face = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.FrontSide,
      roughness: 0.65,
      metalness: 0.05,
    })
    return [edge, edge, edge, edge, face, edge]
  }, [texture])

  return (
    <mesh castShadow material={materials}>
      {/* Caja fina: da grosor de marco; el centro transparente del PNG (alphaTest) se ve a través. */}
      <boxGeometry args={[w, h, 0.14]} />
    </mesh>
  )
}

export default function Placa3D({ stageRef }: { stageRef: React.RefObject<Konva.Stage> }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  // Snapshot del stage Konva → textura. Se ejecuta al montar (cada vez que se entra a 3D).
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    // Recorta a la región de la placa (la capa está desplazada por MARGIN) para conservar
    // el aspecto 4:3 y el look limpio del producto físico.
    const url = stage.toDataURL({ x: MARGIN, y: MARGIN, width: FRAME_W, height: FRAME_H, pixelRatio: 2 })
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
