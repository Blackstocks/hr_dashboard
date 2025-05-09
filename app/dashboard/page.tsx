"use client"

import Link from "next/link"
import { useState } from "react"
import {
  BriefcaseIcon,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Users2Icon,
  Video,
  UserRound,
  CheckCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Interview type definition
type Interview = {
  id: string
  name: string
  role: string
  time: string
  date: string
  type: string
  round: string
  avatar: string
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newInterviews, setNewInterviews] = useState<Interview[]>([])
  const [formData, setFormData] = useState({
    candidateName: "",
    position: "frontend",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    type: "technical",
  })

  const [showApplications, setShowApplications] = useState(true)
  const [showShortlisted, setShowShortlisted] = useState(true)
  const [showRejected, setShowRejected] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [notes, setNotes] = useState([
    {
      id: 1,
      date: "July 15, 2025",
      content: "Applications increased by 15% this month compared to June.",
    },
    {
      id: 2,
      date: "July 10, 2025",
      content: "Rejection rate is higher for backend positions. Need to review requirements.",
    },
    {
      id: 3,
      date: "July 5, 2025",
      content: "Shortlisting process improved after implementing new screening questions.",
    },
  ])
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)
  const [newNote, setNewNote] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const stats = [
    {
      title: "Total Jobs",
      value: "24",
      description: "4 new this month",
      change: "+12.5%",
      trend: "up",
      icon: BriefcaseIcon,
      color: "bg-blue-500",
    },
    {
      title: "Active Candidates",
      value: "156",
      description: "12 new this week",
      change: "+8.3%",
      trend: "up",
      icon: Users2Icon,
      color: "bg-green-500",
    },
    {
      title: "Interviews Scheduled",
      value: "18",
      description: "3 today",
      change: "-5.2%",
      trend: "down",
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      title: "Positions Filled",
      value: "7",
      description: "2 this month",
      change: "+16.7%",
      trend: "up",
      icon: CheckCircle2,
      color: "bg-purple-500",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "New application received",
      description: "Sarah Johnson applied for UI/UX Designer",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "Interview scheduled",
      description: "Michael Chen for Senior Developer position",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Offer accepted",
      description: "Emily Davis accepted Product Manager offer",
      time: "3 hours ago",
    },
    {
      id: 4,
      title: "New job posted",
      description: "Marketing Specialist position is now live",
      time: "Yesterday",
    },
  ]

  // Default interviews
  const defaultInterviews: Interview[] = [
    {
      id: "1",
      name: "Alex Rivera",
      role: "Frontend Developer",
      time: "2:00 PM",
      date: "Today",
      type: "Technical",
      round: "Round 2",
      avatar: "/abstract-geometric-shapes.png",
    },
    {
      id: "2",
      name: "Taylor Kim",
      role: "Product Designer",
      time: "4:30 PM",
      date: "Today",
      type: "Portfolio",
      round: "Round 1",
      avatar: "/number-two-graphic.png",
    },
    {
      id: "3",
      name: "Jordan Patel",
      role: "Backend Engineer",
      time: "10:00 AM",
      date: "Tomorrow",
      type: "System Design",
      round: "Final",
      avatar: "/abstract-geometric-seven.png",
    },
  ]

  // Combine default and new interviews
  const allInterviews = [...defaultInterviews, ...newInterviews]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Function to handle scheduling a new interview
  const handleScheduleInterview = () => {
    // Get candidate name from input
    const candidateName = formData.candidateName.trim() || "New Candidate"
    const candidateAvatar = "/diverse-avatars.png"

    // Get position name based on selection
    let positionName = ""
    switch (formData.position) {
      case "frontend":
        positionName = "Frontend Developer"
        break
      case "backend":
        positionName = "Backend Engineer"
        break
      case "design":
        positionName = "Product Designer"
        break
      case "pm":
        positionName = "Product Manager"
        break
    }

    // Format date
    const dateObj = new Date(formData.date)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    let dateDisplay = ""
    if (dateObj.toDateString() === today.toDateString()) {
      dateDisplay = "Today"
    } else if (dateObj.toDateString() === tomorrow.toDateString()) {
      dateDisplay = "Tomorrow"
    } else {
      dateDisplay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }

    // Format time
    const [hours, minutes] = formData.time.split(":")
    const timeDisplay = `${Number.parseInt(hours) > 12 ? Number.parseInt(hours) - 12 : hours}:${minutes} ${
      Number.parseInt(hours) >= 12 ? "PM" : "AM"
    }`

    // Create new interview
    const newInterview: Interview = {
      id: Date.now().toString(),
      name: candidateName,
      role: positionName,
      time: timeDisplay,
      date: dateDisplay,
      type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
      round: "Round 1",
      avatar: candidateAvatar,
    }

    // Add to interviews list
    setNewInterviews((prev) => [newInterview, ...prev])

    // Close dialog
    setIsDialogOpen(false)

    // Show success toast
    toast({
      title: "Interview Scheduled",
      description: `${candidateName} for ${positionName} on ${dateDisplay} at ${timeDisplay}`,
    })
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    const newNoteObj = {
      id: Date.now(),
      date: formattedDate,
      content: newNote.trim(),
    }

    setNotes([newNoteObj, ...notes])
    setNewNote("")
    setIsNoteDialogOpen(false)

    toast({
      title: "Note Added",
      description: "Your note has been added successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your recruitment activities.</p>
      </div>

      <motion.div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full glass-card glass-card-hover overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} rounded-full p-2 text-white backdrop-blur-sm shadow-sm`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium glass-badge px-2 py-0.5 rounded-full ${
                      stat.trend === "up" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                    }`}
                  >
                    {stat.trend === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <p className="text-xs text-muted-foreground">vs. last month</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Statistics of active applications */}
      <div className="mt-8">
        <div className="border rounded-lg glass-panel p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-indigo-500">Statistics of active applications</h2>
                  <div className="flex items-center gap-4">
                    {/* Replace the toggle buttons with state-managed versions */}
                    <div className="flex items-center">
                      <button
                        className={`h-5 w-10 rounded-full transition-colors duration-200 flex items-center ${
                          showApplications ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"
                        } hover:bg-blue-600`}
                        onClick={() => {
                          setShowApplications(!showApplications)
                          const elems = document.querySelectorAll(".app-bar")
                          elems.forEach((elem) => {
                            elem.style.opacity = showApplications ? "0" : "1"
                          })
                        }}
                      >
                        <div className="h-4 w-4 rounded-full bg-white shadow-sm mx-1"></div>
                      </button>
                      <span
                        className={`ml-1.5 text-xs ${showApplications ? "text-blue-600 font-medium" : "text-gray-600"}`}
                      >
                        Applications
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className={`h-5 w-10 rounded-full transition-colors duration-200 flex items-center ${
                          showShortlisted ? "bg-amber-400 justify-end" : "bg-gray-300 justify-start"
                        } hover:bg-amber-500`}
                        onClick={() => {
                          setShowShortlisted(!showShortlisted)
                          const elems = document.querySelectorAll(".short-bar")
                          elems.forEach((elem) => {
                            elem.style.opacity = showShortlisted ? "0" : "1"
                          })
                        }}
                      >
                        <div className="h-4 w-4 rounded-full bg-white shadow-sm mx-1"></div>
                      </button>
                      <span
                        className={`ml-1.5 text-xs ${showShortlisted ? "text-amber-600 font-medium" : "text-gray-600"}`}
                      >
                        Shortlisted
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className={`h-5 w-10 rounded-full transition-colors duration-200 flex items-center ${
                          showRejected ? "bg-orange-500 justify-end" : "bg-gray-300 justify-start"
                        } hover:bg-orange-600`}
                        onClick={() => {
                          setShowRejected(!showRejected)
                          const elems = document.querySelectorAll(".reject-bar")
                          elems.forEach((elem) => {
                            elem.style.opacity = showRejected ? "0" : "1"
                          })
                        }}
                      >
                        <div className="h-4 w-4 rounded-full bg-white shadow-sm mx-1"></div>
                      </button>
                      <span
                        className={`ml-1.5 text-xs ${showRejected ? "text-orange-600 font-medium" : "text-gray-600"}`}
                      >
                        Rejected
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-[100px] h-9 rounded-full text-xs">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Months</SelectItem>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="february">February</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="may">May</SelectItem>
                        <SelectItem value="june">June</SelectItem>
                        <SelectItem value="july">July</SelectItem>
                        <SelectItem value="august">August</SelectItem>
                        <SelectItem value="september">September</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                        <SelectItem value="november">November</SelectItem>
                        <SelectItem value="december">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="h-[300px] relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
                    {[100, 80, 60, 40, 20, 0].map((value) => (
                      <div key={value} className="flex items-center h-0">
                        <span className="text-xs text-gray-500 -translate-y-1/2">{value}%</span>
                      </div>
                    ))}
                  </div>

                  {/* Horizontal grid lines */}
                  <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between">
                    {[100, 80, 60, 40, 20, 0].map((value) => (
                      <div key={value} className="w-full border-t border-gray-200 h-0"></div>
                    ))}
                  </div>

                  {/* Data visualization */}
                  <div className="absolute left-8 right-0 top-0 bottom-6 flex justify-between">
                    {[
                      { month: "january", label: "Jan", app: [0, 50], short: [55, 72], reject: [80, 95] },
                      { month: "february", label: "Feb", app: [0, 38], short: [45, 74], reject: [80, 110] },
                      { month: "march", label: "Mar", app: [0, 16], short: [22, 62], reject: [70, 80] },
                      { month: "april", label: "Apr", app: [0, 22], short: [30, 64], reject: [70, 85] },
                      { month: "may", label: "May", app: [0, 48], short: [54, 78], reject: [85, 105] },
                      { month: "june", label: "Jun", app: [0, 30], short: [37, 58], reject: [65, 82] },
                      { month: "july", label: "Jul", app: [0, 38], short: [45, 74], reject: [80, 110] },
                      { month: "august", label: "Aug", app: [0, 25], short: [32, 50], reject: [55, 78] },
                      { month: "september", label: "Sep", app: [0, 28], short: [35, 55], reject: [62, 85] },
                      { month: "october", label: "Oct", app: [0, 38], short: [45, 74], reject: [80, 105] },
                      { month: "november", label: "Nov", app: [0, 52], short: [60, 72], reject: [80, 98] },
                      { month: "december", label: "Dec", app: [0, 30], short: [38, 55], reject: [62, 110] },
                    ]
                      .filter((data) => selectedMonth === "all" || data.month === selectedMonth)
                      .map((data, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-end h-full group"
                          style={{ width: selectedMonth === "all" ? "7%" : "100%" }}
                        >
                          {/* Application bar (blue) */}
                          <div className="relative h-full flex items-end justify-center w-2">
                            <div
                              className="app-bar absolute w-2 bg-blue-500 rounded-full transition-opacity duration-300"
                              style={{
                                height: `${data.app[1]}%`,
                                bottom: `${data.app[0]}%`,
                                opacity: showApplications ? 1 : 0,
                              }}
                            ></div>

                            {/* Shortlisted bar (yellow) */}
                            <div
                              className="short-bar absolute w-2 bg-amber-400 rounded-full transition-opacity duration-300"
                              style={{
                                height: `${data.short[1] - data.short[0]}%`,
                                bottom: `${data.short[0]}%`,
                                opacity: showShortlisted ? 1 : 0,
                              }}
                            ></div>

                            {/* Rejected bar (orange) */}
                            <div
                              className="reject-bar absolute w-2 bg-orange-500 rounded-full transition-opacity duration-300"
                              style={{
                                height: `${Math.min(data.reject[1] - data.reject[0], 100 - data.reject[0])}%`,
                                bottom: `${data.reject[0]}%`,
                                opacity: showRejected ? 1 : 0,
                              }}
                            ></div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 bg-white border border-gray-200 rounded-md p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-32 -left-16 text-xs z-10">
                              <div className="flex justify-between">
                                <span>Applications:</span>
                                <span className="font-medium">{data.app[1]}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Shortlisted:</span>
                                <span className="font-medium">{data.short[1] - data.short[0]}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Rejected:</span>
                                <span className="font-medium">{data.reject[1] - data.reject[0]}%</span>
                              </div>
                            </div>
                          </div>
                          {selectedMonth !== "all" && <div className="text-xs text-gray-500 mt-2">{data.label}</div>}
                        </div>
                      ))}
                  </div>

                  {/* X-axis labels */}
                  {selectedMonth === "all" && (
                    <div className="absolute left-8 right-0 bottom-0 flex justify-between">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                        (month) => (
                          <div key={month} className="text-xs text-gray-500">
                            {month}
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="flex flex-col h-full">
                <div className="glass-panel rounded-lg p-4 flex-grow">
                  <h3 className="text-sm font-medium mb-3">Notes</h3>
                  <div className="h-[220px] overflow-y-auto space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="glass-card p-2 rounded border border-gray-200/50 text-xs">
                        <p className="font-medium text-gray-800">{note.date}</p>
                        <p className="text-gray-600 mt-1">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-sm transition-colors duration-200">
                      <Plus className="h-4 w-4" />
                      Add note
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Note</DialogTitle>
                      <DialogDescription>
                        Add a new note about recruitment activities or observations.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="note">Note</Label>
                        <textarea
                          id="note"
                          rows={4}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          placeholder="Enter your note here..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddNote}>Save Note</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <motion.div variants={item} className="col-span-1">
          <Card className="h-full overflow-hidden glass-card glass-card-hover">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest updates from your recruitment pipeline</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <motion.div className="divide-y" variants={container} initial="hidden" animate="show">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    variants={item}
                    className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 },
                    }}
                  >
                    <div
                      className={`rounded-full p-2 ${
                        activity.title.includes("application")
                          ? "bg-blue-100 text-blue-600"
                          : activity.title.includes("Interview")
                            ? "bg-amber-100 text-amber-600"
                            : activity.title.includes("Offer")
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {activity.title.includes("application") ? (
                        <UserRound className="h-4 w-4" />
                      ) : activity.title.includes("Interview") ? (
                        <Calendar className="h-4 w-4" />
                      ) : activity.title.includes("Offer") ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <BriefcaseIcon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
                <div className="p-3 text-center">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All Activity <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-1">
          <Card className="h-full overflow-hidden glass-card glass-card-hover">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    Upcoming Interviews
                  </CardTitle>
                  <CardDescription>Scheduled interviews for the next 48 hours</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                      <Plus className="h-3 w-3" /> Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Interview</DialogTitle>
                      <DialogDescription>
                        Set up a new interview with a candidate. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="candidateName" className="text-right">
                          Candidate
                        </Label>
                        <Input
                          id="candidateName"
                          placeholder="Enter candidate name"
                          value={formData.candidateName}
                          onChange={(e) => handleInputChange("candidateName", e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="position" className="text-right">
                          Position
                        </Label>
                        <Select
                          value={formData.position}
                          onValueChange={(value) => handleInputChange("position", value)}
                        >
                          <SelectTrigger id="position" className="col-span-3">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frontend">Frontend Developer</SelectItem>
                            <SelectItem value="backend">Backend Engineer</SelectItem>
                            <SelectItem value="design">Product Designer</SelectItem>
                            <SelectItem value="pm">Product Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          className="col-span-3"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                          Time
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          className="col-span-3"
                          value={formData.time}
                          onChange={(e) => handleInputChange("time", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Type
                        </Label>
                        <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                          <SelectTrigger id="type" className="col-span-3">
                            <SelectValue placeholder="Select interview type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="behavioral">Behavioral</SelectItem>
                            <SelectItem value="portfolio">Portfolio Review</SelectItem>
                            <SelectItem value="system">System Design</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={handleScheduleInterview}
                        className="relative overflow-hidden group"
                      >
                        <span className="relative z-10">Schedule Interview</span>
                        <span className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <motion.div className="divide-y" variants={container} initial="hidden" animate="show">
                <AnimatePresence>
                  {allInterviews.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      variants={item}
                      className="p-4 hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: index < defaultInterviews.length ? 0 : 0.2,
                      }}
                    >
                      {index === 0 && newInterviews.length > 0 && index < newInterviews.length && (
                        <motion.div
                          className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </motion.div>
                      )}
                      <div className="flex items-center gap-3">
                        <Avatar
                          className={`h-10 w-10 ${interview.id === newInterviews[0]?.id ? "border-2 border-green-500" : ""}`}
                        >
                          <AvatarImage src={interview.avatar || "/placeholder.svg"} alt={interview.name} />
                          <AvatarFallback>{interview.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{interview.name}</p>
                            <Badge
                              variant="outline"
                              className={`ml-2 glass-badge ${
                                interview.date === "Today"
                                  ? "bg-blue-50/50 text-blue-700 hover:bg-blue-50/60"
                                  : "bg-purple-50/50 text-purple-700 hover:bg-purple-50/60"
                              }`}
                            >
                              {interview.date}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-muted-foreground">{interview.role}</p>
                            <p className="text-sm font-medium">{interview.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex gap-1">
                            <Badge variant="secondary" className="text-xs px-2 py-0 glass-badge">
                              {interview.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs px-2 py-0 glass-badge">
                              {interview.round}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                              <Video className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                              <FileText className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="p-3 text-center">
                  <Link href="/dashboard/candidates">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View all scheduled interviews <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
