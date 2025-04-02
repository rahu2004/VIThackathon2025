"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function Drone({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[0.5, 0.1, 0.5]} />
      <meshStandardMaterial color="#3b82f6" />
      {/* Drone propellers */}
      <group position={[0, 0.05, 0]}>
        <mesh position={[0.3, 0, 0.3]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[-0.3, 0, 0.3]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[0.3, 0, -0.3]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[-0.3, 0, -0.3]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 8]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>
    </mesh>
  )
}

function GroundRobot({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 2
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.5) * 2
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Robot body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.4, 1.2]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      {/* Robot wheels */}
      <mesh position={[0.4, 0.15, 0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.4, 0.15, 0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.4, 0.15, -0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.4, 0.15, -0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Sensor on top */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </group>
  )
}

function Field() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* Crop rows */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={i} position={[i * 2 - 10, 0, 0]}>
          {Array.from({ length: 20 }).map((_, j) => (
            <mesh key={j} position={[0, 0.2, j - 10]}>
              <boxGeometry args={[0.8, 0.4, 0.8]} />
              <meshStandardMaterial color="#15803d" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export default function ThreeDScene() {
  return (
    <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Environment preset="sunset" />

      <Field />

      {/* Multiple drones */}
      <Drone position={[2, 3, 2]} />
      <Drone position={[-3, 4, -2]} />
      <Drone position={[0, 5, -5]} />

      {/* Ground robots */}
      <GroundRobot position={[4, 0, 4]} />
      <GroundRobot position={[-4, 0, -4]} />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

