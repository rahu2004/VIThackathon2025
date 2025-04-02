"use client"
import Chatbot from "./chatbot";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import ThreeDScene from "./three-d-scene"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* 3D Animation Background */}
      
      <div className="absolute inset-0 z-0">{mounted && <ThreeDScene />}</div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Revolutionizing Agriculture with AI-Powered Autonomy
          </h1>
          <p className="text-xl text-muted-foreground/80 mb-8">
            Our SLAM-based autonomous fleet technology transforms agricultural monitoring, increasing efficiency and
            sustainability through intelligent automation.
          </p>
          <Button onClick={() => window.location.href = 'http://localhost:5173/'} size="lg" className="group">
            Explore the Future of Smart Farming
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-[1]"></div>
    </section>
  )
}

