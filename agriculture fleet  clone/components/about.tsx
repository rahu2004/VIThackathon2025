"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const timelineEvents = [
  {
    year: "2021",
    title: "Project Inception",
    description: "Initial research and concept development for SLAM-based agricultural monitoring.",
  },
  {
    year: "2022",
    title: "Prototype Development",
    description: "First autonomous drone and ground robot prototypes with basic SLAM capabilities.",
  },
  {
    year: "2023",
    title: "AI Integration",
    description: "Implementation of advanced AI algorithms for crop health detection and analysis.",
  },
  {
    year: "2024",
    title: "Fleet Coordination",
    description: "Development of multi-agent coordination system for efficient farm coverage.",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Our Technology</h2>
          <p className="text-lg text-muted-foreground">
            Our SLAM-based autonomous fleet combines cutting-edge robotics, computer vision, and artificial intelligence
            to revolutionize agricultural monitoring and management. By deploying coordinated teams of drones and ground
            robots, we provide farmers with unprecedented insights into their crops and soil conditions.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                <div className="bg-card p-6 rounded-lg shadow-lg">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

