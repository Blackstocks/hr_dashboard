"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import type React from "react"

import { useState, Suspense, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  BriefcaseIcon,
  HomeIcon,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  UserRound,
  Users2Icon,
  X,
  Bell,
  Search,
  Clock,
  User,
  Briefcase,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface NavItemProps {
  href: string
  icon: React.ElementType
  title: string
  isActive: boolean
}

// Replace the NavItem component with this updated version that triggers the page loading animation
function NavItem({ href, icon: Icon, title, isActive }: NavItemProps) {
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all relative overflow-hidden",
        isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
      )}
      onClick={() => setIsPageLoading(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background effects */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-primary rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {!isActive && isHovered && (
        <motion.div
          className="absolute inset-0 bg-muted rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Glass overlay for active items */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Icon with glow effect when active */}
      <div className="relative z-10 flex items-center justify-center">
        {isActive && <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm" />}
        <Icon className={cn("h-4 w-4 transition-transform duration-200", isHovered && "scale-110")} />
      </div>

      <span className="relative z-10">{title}</span>

      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute right-0 h-6 w-1 rounded-l-full bg-primary/80 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </Link>
  )
}

function PageTransitionLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent overflow-hidden">
      <div className="h-full w-full bg-primary origin-left animate-page-loading"></div>
    </div>
  )
}

// Sample suggestion data - in a real app, this would come from your backend
const recentSearches = ["Frontend Developer", "Product Manager", "UX Designer", "Remote positions"]

const suggestedCandidates = [
  { name: "Alex Johnson", role: "Senior Frontend Developer", location: "San Francisco" },
  { name: "Samantha Lee", role: "Product Designer", location: "Remote" },
  { name: "Michael Chen", role: "Backend Engineer", location: "New York" },
]

const suggestedJobs = [
  { title: "Senior React Developer", department: "Engineering", location: "Remote" },
  { title: "Product Manager", department: "Product", location: "San Francisco" },
  { title: "UX Researcher", department: "Design", location: "New York" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const styleElement = useRef<HTMLStyleElement>(null)
  const [searchValue, setSearchValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  // Add a new state variable for loading state after the other state declarations
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const router = useRouter()

  const navItems = [
    { href: "/dashboard", icon: HomeIcon, title: "Dashboard" },
    { href: "/dashboard/jobs", icon: BriefcaseIcon, title: "Jobs" },
    { href: "/dashboard/candidates", icon: Users2Icon, title: "Candidates" },
    { href: "/dashboard/insights", icon: BarChart3, title: "Insights" },
    { href: "/dashboard/chat", icon: MessageSquare, title: "AI Voice Chat" },
  ]

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add CSS for typing cursor animation
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
    .typing-cursor {
      position: relative;
    }
    
    .typing-cursor::after {
      content: "";
      position: absolute;
      left: 4.5rem;  /* Increased from 2.5rem */
      top: 0;
      height: 100%;
      width: 0;
      border-right: 2px solid currentColor;
      color: #9ca3af;
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      animation: blink-caret 0.75s step-end infinite;
    }
    
    .typing-cursor:focus::after {
      display: none;
    }
    
    @keyframes blink-caret {
      from, to { border-color: transparent }
      50% { border-color: currentColor }
    }
    
    /* Text animation */
    .typing-text {
      position: absolute;
      left: 4.5rem;  /* Increased from 2.5rem */
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      overflow: hidden;
      white-space: nowrap;
      width: 0;
      animation: typing 3s steps(30, end) forwards, typing-loop 10s 3s infinite;
    }
    
    .typing-cursor:focus + .typing-text {
      display: none;
    }
    
    @keyframes typing {
      to { width: 16ch; }
    }
    
    @keyframes typing-loop {
      0%, 100% { width: 0; }
      10%, 45% { width: 16ch; }
      55%, 90% { width: 0; }
    }

    @keyframes pageLoadingAnimation {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .animate-page-loading {
      animation: pageLoadingAnimation 0.8s ease-in-out;
    }

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
      animation: blob 15s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    .bg-grid-pattern {
      background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
      background-size: 20px 20px;
    }

    @keyframes pulse-subtle {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }

    .animate-in {
      animation-duration: 0.3s;
      animation-timing-function: ease-out;
      animation-fill-mode: both;
    }

    .slide-in-from-right-5 {
      animation-name: slideInFromRight5;
    }

    @keyframes slideInFromRight5 {
      from {
        transform: translateX(5%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .delay-100 {
      animation-delay: 0.1s;
    }

    .delay-200 {
      animation-delay: 0.2s;
    }

    .card-gradient {
      background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5));
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
}

    .dark .card-gradient {
      background-image: linear-gradient(to bottom right, rgba(30, 30, 30, 0.9), rgba(15, 15, 15, 0.5));
    }

/* Card hover effects with gradients */
.card-hover-effect {
  transition: all 0.3s ease;
  background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.1));
}

.card-hover-effect:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2));
}

.dark .card-hover-effect {
  background-image: linear-gradient(to bottom right, rgba(30, 30, 30, 0.01), rgba(15, 15, 15, 0.1));
}

.dark .card-hover-effect:hover {
  background-image: linear-gradient(to bottom right, rgba(30, 30, 30, 0.05), rgba(15, 15, 15, 0.2));
}

/* Gradient text for headings */
.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)) 30%, hsl(var(--secondary)));
}

.dark .gradient-text {
  background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)) 30%, hsl(var(--secondary)));
}

/* Subtle gradient borders */
.gradient-border {
  position: relative;
  border: none;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)));
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Glassmorphism Effects */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
}

.dark .glass-card {
  background: rgba(30, 30, 40, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-panel {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
}

.dark .glass-panel {
  background: rgba(20, 20, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Enhanced glass effects for navigation */
.glass-nav-item {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.glass-nav-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glass-nav-item:hover::before {
  opacity: 1;
}

.glass-nav-item.active::before {
  opacity: 1;
  background: rgba(var(--primary-rgb), 0.2);
}

.glass-nav-item.active {
  box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.2);
}

/* Particle animation for glass effects */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  50% {
    transform: translateY(-5px) translateX(10px);
  }
  75% {
    transform: translateY(5px) translateX(-5px);
  }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-5000 {
  animation-delay: 5s;
}

/* Enhanced glass navbar */
.glass-navbar {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

.dark .glass-navbar {
  background: rgba(15, 15, 25, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* Enhanced glass sidebar */
.glass-sidebar {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.05);
}

.dark .glass-sidebar {
  background: rgba(15, 15, 25, 0.7);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

/* Enhanced glass dropdown */
.glass-dropdown {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dark .glass-dropdown {
  background: rgba(25, 25, 35, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-sidebar {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.dark .glass-sidebar {
  background: rgba(15, 15, 25, 0.7);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

/* Glass card hover effects */
.glass-card-hover {
  transition: all 0.3s ease;
}

.glass-card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.8);
}

.dark .glass-card-hover:hover {
  background: rgba(35, 35, 45, 0.8);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

/* Glass input fields */
.glass-input {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(var(--primary-rgb), 0.5);
  box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1);
}

.dark .glass-input {
  background: rgba(30, 30, 40, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.dark .glass-input:focus {
  background: rgba(40, 40, 50, 0.8);
}

/* Glass dropdown menus */
.glass-dropdown {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dark .glass-dropdown {
  background: rgba(25, 25, 35, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Glass badges */
.glass-badge {
  background: rgba(var(--primary-rgb), 0.15);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
}

.dark .glass-badge {
  background: rgba(var(--primary-rgb), 0.25);
  border: 1px solid rgba(var(--primary-rgb), 0.3);
}

/* Add CSS variable for primary color in RGB format for rgba usage */
:root {
  --primary-rgb: 79, 70, 229;
}

.dark {
  --primary-rgb: 99, 102, 241;
}
`
    document.head.appendChild(style)
    styleElement.current = style

    return () => {
      if (styleElement.current && styleElement.current.parentNode) {
        document.head.removeChild(styleElement.current)
      }
    }
  }, [])

  useEffect(() => {
    // Function to simulate page loading
    const simulatePageLoading = () => {
      setIsPageLoading(true)

      // Simulate loading time
      const timer = setTimeout(() => {
        setIsPageLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    }

    // Create a MutationObserver to watch for DOM changes that indicate page navigation
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          simulatePageLoading()
          break
        }
      }
    })

    // Start observing the main content area
    const mainContent = document.querySelector("main")
    if (mainContent) {
      observer.observe(mainContent, { childList: true, subtree: true })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Filter suggestions based on search input
  const filteredRecentSearches = recentSearches.filter(
    (search) => searchValue && search.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const filteredCandidates = suggestedCandidates.filter(
    (candidate) =>
      searchValue &&
      (candidate.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchValue.toLowerCase())),
  )

  const filteredJobs = suggestedJobs.filter(
    (job) =>
      searchValue &&
      (job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        job.department.toLowerCase().includes(searchValue.toLowerCase())),
  )

  // Determine if we should show suggestions
  const hasSuggestions = filteredRecentSearches.length > 0 || filteredCandidates.length > 0 || filteredJobs.length > 0

  return (
    <div className="flex min-h-screen flex-col">
      {isPageLoading && <PageTransitionLoader />}
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 px-4 sm:px-6 shadow-sm relative overflow-hidden">
        {/* Enhanced glass effect with layered backgrounds */}
        <div className="absolute inset-0 glass-navbar"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

        {/* Subtle animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-primary/20 animate-pulse"></div>
          <div className="absolute top-3/4 left-1/3 h-1 w-1 rounded-full bg-primary/20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-2/3 h-1 w-1 rounded-full bg-primary/20 animate-pulse animation-delay-4000"></div>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden relative z-10" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex items-center gap-2 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm"></div>
            <BriefcaseIcon className="h-6 w-6 relative" />
          </div>
          <span className="font-semibold">TalentHub</span>
        </div>

        <div ref={searchRef} className="hidden md:flex relative mx-auto max-w-xl flex-1 px-8 z-10">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder=""
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
              if (e.target.value) {
                setIsLoading(true)
                setShowSuggestions(true)

                // Simulate API call delay
                const timer = setTimeout(() => {
                  setIsLoading(false)
                }, 600)

                return () => clearTimeout(timer)
              } else {
                setShowSuggestions(false)
                setIsLoading(false)
              }
            }}
            onFocus={() => {
              if (searchValue) {
                setShowSuggestions(true)
              }
            }}
            className="pl-16 w-full max-w-xl glass-input typing-cursor transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]"
          />
          {!searchValue && <span className="typing-text">Search...</span>}

          {/* Search Suggestions Dropdown - Enhanced with glass effects */}
          {showSuggestions && searchValue && (
            <div className="absolute top-full left-8 right-0 mt-1 rounded-md glass-dropdown z-50 overflow-hidden max-h-[300px] overflow-y-auto border border-white/20 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
              {isLoading && (
                <div className="py-3 px-4 flex items-center justify-center border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                    <span className="text-sm text-muted-foreground">Searching...</span>
                  </div>
                </div>
              )}

              {!isLoading && !hasSuggestions && (
                <div className="py-6 text-center text-sm text-muted-foreground">No results found.</div>
              )}

              {filteredRecentSearches.length > 0 && (
                <div className="px-2 pt-2">
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">Recent Searches</div>
                  <div className="space-y-1">
                    {filteredRecentSearches.map((search, index) => (
                      <button
                        key={`recent-${index}`}
                        onClick={() => {
                          setSearchValue(search)
                          setShowSuggestions(false)
                        }}
                        className="flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                      >
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredCandidates.length > 0 && (
                <div className="px-2 pt-2">
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">Candidates</div>
                  <div className="space-y-1">
                    {filteredCandidates.map((candidate, index) => (
                      <button
                        key={`candidate-${index}`}
                        onClick={() => {
                          setSearchValue(candidate.name)
                          setShowSuggestions(false)
                        }}
                        className="flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                      >
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col items-start">
                          <span>{candidate.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {candidate.role} • {candidate.location}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredJobs.length > 0 && (
                <div className="px-2 pt-2 pb-2">
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">Jobs</div>
                  <div className="space-y-1">
                    {filteredJobs.map((job, index) => (
                      <button
                        key={`job-${index}`}
                        onClick={() => {
                          setSearchValue(job.title)
                          setShowSuggestions(false)
                        }}
                        className="flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                      >
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col items-start">
                          <span>{job.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {job.department} • {job.location}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-4 relative z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative group">
                <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 transition-transform duration-200 group-hover:scale-100"></span>
                <Bell className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span className="sr-only">Notifications</span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black dark:bg-black text-[10px] font-medium text-white animate-pulse shadow-sm">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80"
              sideOffset={8}
              className="w-80 overflow-hidden glass-dropdown border border-white/20 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)]"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] -z-10"></div>
              <DropdownMenuLabel className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent p-4">
                <span className="font-semibold">Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-default hover:bg-white/10 dark:hover:bg-white/5 transition-colors duration-200 border-l-2 border-transparent hover:border-primary animate-in slide-in-from-right-5 duration-300">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">New application received</span>
                    <span className="text-xs text-muted-foreground">10m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sarah Johnson applied for UI/UX Designer position</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-default hover:bg-white/10 dark:hover:bg-white/5 transition-colors duration-200 border-l-2 border-transparent hover:border-primary animate-in slide-in-from-right-5 duration-300 delay-100">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">Interview scheduled</span>
                    <span className="text-xs text-muted-foreground">1h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Michael Chen for Senior Developer position at 2:00 PM</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-default hover:bg-white/10 dark:hover:bg-white/5 transition-colors duration-200 border-l-2 border-primary/40 bg-white/5 animate-in slide-in-from-right-5 duration-300 delay-200">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">Offer accepted</span>
                    <span className="text-xs text-muted-foreground">3h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Emily Davis accepted Product Manager offer</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="flex justify-center text-sm text-primary p-3 hover:bg-white/10 dark:hover:bg-white/5 hover:text-primary/80 transition-all duration-200 font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative group">
                <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 transition-transform duration-200 group-hover:scale-100"></span>
                <Avatar className="h-8 w-8 ring-2 ring-white/10 transition-all duration-200 group-hover:ring-primary/20">
                  <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="glass-dropdown border border-white/20 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)]"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                <UserRound className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <Link href="/">
                <DropdownMenuItem className="hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden w-64 flex-col md:flex relative overflow-hidden">
          {/* Enhanced glass effect with layered backgrounds */}
          <div className="absolute inset-0 glass-sidebar"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5"></div>

          {/* Subtle animated particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 h-1 w-1 rounded-full bg-primary/20 animate-pulse"></div>
            <div className="absolute top-3/4 right-1/3 h-1 w-1 rounded-full bg-primary/20 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 right-2/3 h-1 w-1 rounded-full bg-primary/20 animate-pulse animation-delay-4000"></div>
          </div>

          <nav className="flex-1 space-y-1 p-4 pt-4 relative z-10">
            <AnimatePresence>
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <NavItem href={item.href} icon={item.icon} title={item.title} isActive={pathname === item.href} />
                </motion.div>
              ))}
            </AnimatePresence>
          </nav>
        </aside>

        {/* Mobile sidebar - custom implementation without Sheet component */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 left-0 w-64 shadow-lg overflow-hidden"
            >
              {/* Glass effect layers */}
              <div className="absolute inset-0 glass-sidebar"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5"></div>

              {/* Subtle animated particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 h-1 w-1 rounded-full bg-primary/20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/3 h-1 w-1 rounded-full bg-primary/20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 right-2/3 h-1 w-1 rounded-full bg-primary/20 animate-pulse animation-delay-4000"></div>
              </div>

              <div className="flex h-16 items-center justify-end border-b border-white/10 px-4 relative z-10">
                <X
                  className="h-5 w-5 cursor-pointer hover:text-muted-foreground transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                />
              </div>
              <nav className="flex-1 space-y-1 p-4 relative z-10">
                {navItems.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    title={item.title}
                    isActive={pathname === item.href}
                  />
                ))}
              </nav>
            </motion.div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 relative overflow-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/40 dark:from-gray-900/40 dark:via-gray-900 dark:to-indigo-950/30 -z-10 fixed"></div>

          {/* Animated gradient orbs */}
          <div className="fixed -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/5 to-purple-300/5 blur-3xl animate-blob opacity-70 -z-10"></div>
          <div className="fixed top-1/2 -right-48 h-96 w-96 rounded-full bg-gradient-to-br from-blue-300/5 to-cyan-300/5 blur-3xl animate-blob animation-delay-2000 opacity-70 -z-10"></div>
          <div className="fixed -bottom-24 left-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/5 to-indigo-300/5 blur-3xl animate-blob animation-delay-4000 opacity-70 -z-10"></div>

          {/* Subtle grid pattern overlay */}
          <div className="fixed inset-0 bg-grid-pattern opacity-[0.015] -z-10"></div>

          <Suspense fallback={<>Loading...</>}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto px-2 py-4 sm:px-4 sm:py-6 md:px-6"
            >
              {children}
            </motion.div>
          </Suspense>
        </main>
      </div>
    </div>
  )
}
