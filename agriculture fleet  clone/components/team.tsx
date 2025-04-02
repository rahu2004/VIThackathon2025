"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import pic from '../public/photo 1.jpg'
import pic1 from '../public/photo 2.jpg'
import pic4 from '../public/photo 3.jpg'
import pic3 from '../public/photo 4.jpg'
const teamMembers = [
  {
    name: "Rahul Bonala",
    role: "AI Engineer",
    image: pic,
    bio: "Specializes in computer vision and machine learning for agricultural applications.",
    social: {
      github: "https://github.com/rahu2004",
      linkedin: "http://www.linkedin.com/in/rahul-bonala-13b14724a/",
      twitter: "#",
    },
  },
  {
    name: "Rithwik Raja",
    role: "Data Scientist",
    image: pic1,
    bio: "Designs and implements autonomous navigation systems for drones and ground robots.",
    social: {
      github: "https://github.com/Rithwik084",
      linkedin: "https://www.linkedin.com/in/rithwikr/",
      twitter: "https://x.com/RithwikRaja",
    },
  },
  {
    name: "Saksham",
    role: "Web Developer",
    image: pic3,
    bio: "Creates intuitive interfaces for visualizing complex agricultural data and robot operations.",
    social: {
      github: "https://github.com/sakshamcod",
      linkedin: "https://www.linkedin.com/in/saksham-kumar-b25188297/",
      twitter: "https://x.com/Saksham80073938",
    },
  },
  {
    name: "Ishaan",
    role: "Web Developer",
    image: pic4,
    bio: "Provides domain expertise in crop health monitoring and precision agriculture techniques.",
    social: {
      github: "https://github.com/Ishaan-chaturvedi99",
      linkedin: "https://www.linkedin.com/in/ishaan-chaturvedi-bba105258/",
      twitter: "https://x.com/IshaanChaturv15?t=PkYXG1COnp1xyLr30HSmbQ&s=09",
    },
  },
]

export default function Team() {
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
    <section id="team" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the talented individuals behind our autonomous agricultural fleet technology.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl overflow-hidden shadow-lg border border-border"
            >
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a
                    href={member.social.github}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            <Github className="h-5 w-5 mr-2" />
            View our open-source repository
          </a>
        </div>
      </div>
    </section>
  )
}

