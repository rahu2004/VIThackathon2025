"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Cpu, DrillIcon as Drone, Map, Leaf } from "lucide-react"

const features = [
  {
    icon: <Map className="h-10 w-10" />,
    title: "SLAM Navigation",
    description:
      "Simultaneous Localization and Mapping technology enables our robots to create real-time maps of the environment while tracking their own position.",
  },
  {
    icon: <Cpu className="h-10 w-10" />,
    title: "AI-Driven Analysis",
    description:
      "Advanced machine learning algorithms process visual and sensor data to detect crop health issues, pest infestations, and irrigation needs.",
  },
  {
    icon: <Drone className="h-10 w-10" />,
    title: "Autonomous Drones & Robots",
    description:
      "Coordinated fleet of aerial drones and ground robots work together to provide comprehensive coverage of agricultural fields.",
  },
  {
    icon: <Leaf className="h-10 w-10" />,
    title: "Precision Agriculture",
    description:
      "Targeted interventions based on real-time data help optimize resource usage, reduce waste, and increase crop yields.",
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="how-it-works" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our integrated system combines multiple technologies to deliver comprehensive agricultural monitoring and
            analysis.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card p-8 rounded-xl shadow-lg border border-border"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

