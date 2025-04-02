"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for charts
const temperatureData = [
  { name: "6:00", value: 18 },
  { name: "8:00", value: 21 },
  { name: "10:00", value: 24 },
  { name: "12:00", value: 28 },
  { name: "14:00", value: 30 },
  { name: "16:00", value: 27 },
  { name: "18:00", value: 23 },
]

const moistureData = [
  { name: "Field A", value: 65 },
  { name: "Field B", value: 45 },
  { name: "Field C", value: 78 },
  { name: "Field D", value: 52 },
]

const cropHealthData = [
  { name: "Healthy", value: 75 },
  { name: "Stressed", value: 15 },
  { name: "Diseased", value: 10 },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

// Mock SLAM visualization
function SLAMVisualization() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Robot position
    let robotX = width / 2
    let robotY = height / 2
    let robotAngle = 0

    // Map points (discovered areas)
    const mapPoints = []

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 1
      const gridSize = 30
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Update robot position
      robotAngle += 0.02
      robotX += Math.cos(robotAngle) * 1.5
      robotY += Math.sin(robotAngle) * 1.5

      // Keep robot within bounds
      if (robotX < 50) robotX = 50
      if (robotX > width - 50) robotX = width - 50
      if (robotY < 50) robotY = 50
      if (robotY > height - 50) robotY = height - 50

      // Add new map points
      mapPoints.push({ x: robotX, y: robotY })
      if (mapPoints.length > 500) {
        mapPoints.shift()
      }

      // Draw map points (discovered areas)
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
      for (const point of mapPoints) {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw robot
      ctx.fillStyle = "#3b82f6"
      ctx.beginPath()
      ctx.arc(robotX, robotY, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw robot direction
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(robotX, robotY)
      ctx.lineTo(robotX + Math.cos(robotAngle) * 20, robotY + Math.sin(robotAngle) * 20)
      ctx.stroke()

      // Draw scan lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)"
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        const scanAngle = robotAngle + a
        ctx.beginPath()
        ctx.moveTo(robotX, robotY)
        ctx.lineTo(robotX + Math.cos(scanAngle) * 100, robotY + Math.sin(scanAngle) * 100)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} width={600} height={400} className="w-full h-[400px] rounded-lg" />
}

export default function LiveDemo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="live-demo" className="py-20 bg-background">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Demo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our technology in action with this interactive demonstration of our SLAM mapping and agricultural
            analytics.
          </p>
        </motion.div>

        <Tabs defaultValue="slam" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="slam">SLAM Visualization</TabsTrigger>
            <TabsTrigger value="analytics">Farm Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="slam" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Real-time SLAM Mapping</h3>
                <p className="text-muted-foreground mb-6">
                  This visualization demonstrates how our robots create maps of the environment in real-time while
                  navigating through agricultural fields.
                </p>
                <SLAMVisualization />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Temperature Trends</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Soil Moisture</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={moistureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Crop Health Analysis</h3>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cropHealthData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {cropHealthData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

