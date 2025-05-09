"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LucideBuilding, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to login page with success message instead of dashboard
      router.push("/?registered=true")
    }, 1000)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Background gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-100 to-indigo-50"></div>

      {/* Animated gradient orbs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-purple-300/20 blur-3xl animate-blob"></div>
      <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-gradient-to-br from-blue-300/20 to-cyan-300/20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/10 to-indigo-300/10 blur-3xl animate-blob animation-delay-4000"></div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>

      {/* Floating particles */}
      <div className="particles-container absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className={`particle absolute rounded-full bg-white`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Add this to your CSS (app/globals.css) */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .particle {
          animation: float linear infinite;
          will-change: transform;
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-60px) translateX(10px);
          }
          100% {
            transform: translateY(-80px) translateX(0);
            opacity: 0;
          }
        }
      `}</style>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-[450px] backdrop-blur-[2px] bg-white/95">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="rounded-full bg-primary p-2">
                <LucideBuilding className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">Enter your information to register</CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <div className="text-center">
                <span className="text-sm text-muted-foreground">Already have an account? </span>
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => router.push("/")}>
                  Sign in
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-muted-foreground mx-auto"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="h-3 w-3" />
                Back to login
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Note: Authentication is not implemented. This is for demonstration purposes only.
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
