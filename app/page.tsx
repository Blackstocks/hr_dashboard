"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LucideBuilding } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("demo@example.com")
  const [password, setPassword] = useState("password123")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("registered") === "true") {
      setShowSuccessMessage(true)
      window.history.replaceState({}, document.title, window.location.pathname)

      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)

      return () => clearTimeout(timer)
    }

    // Generate particles only on client
    const generatedParticles = Array.from({ length: 30 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 1}px`,
      height: `${Math.random() * 6 + 1}px`,
      opacity: Math.random() * 0.5 + 0.1,
      animationDuration: `${Math.random() * 20 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
    }))
    setParticles(generatedParticles)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-100 to-indigo-50"></div>
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-purple-300/20 blur-3xl animate-blob"></div>
      <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-gradient-to-br from-blue-300/20 to-cyan-300/20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/10 to-indigo-300/10 blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
      <div className="particles-container absolute inset-0 overflow-hidden">
        {particles.map((style, index) => (
          <div
            key={index}
            className="particle absolute rounded-full bg-white"
            style={style}
          />
        ))}
      </div>
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
        <Card className="w-full max-w-[400px] backdrop-blur-[2px] bg-white/95">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="rounded-full bg-primary p-2">
                <LucideBuilding className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">TalentHub</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {showSuccessMessage && (
                <div
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative text-sm"
                  role="alert"
                >
                  <strong className="font-medium">Success!</strong>
                  <span className="block sm:inline">
                    {" "}
                    Your account has been created. You can now log in.
                  </span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="h-auto p-0 text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="text-center">
                <span className="text-sm text-muted-foreground">Don't have an account? </span>
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => router.push("/register")}>
                  Register
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Note: Authentication is not implemented. Using dummy credentials for demonstration purposes.
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
