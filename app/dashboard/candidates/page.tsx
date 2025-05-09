"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpDown,
  Filter,
  MoreHorizontal,
  Search,
  X,
  Database,
  Download,
  FileSpreadsheet,
  Upload,
  UserRound,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for candidates
const candidatesData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Senior Frontend Developer",
    stage: "Interview",
    applied: "2 weeks ago",
    location: "San Francisco, CA",
    source: "LinkedIn",
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    id: 2,
    name: "Samantha Lee",
    email: "samantha.lee@example.com",
    role: "Product Designer",
    stage: "Offer",
    applied: "3 weeks ago",
    location: "Remote",
    source: "Referral",
    avatar: "/number-two-graphic.png",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Backend Engineer",
    stage: "Applied",
    applied: "5 days ago",
    location: "New York, NY",
    source: "Indeed",
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Product Manager",
    stage: "Hired",
    applied: "1 month ago",
    location: "Chicago, IL",
    source: "Internal",
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "DevOps Engineer",
    stage: "Technical Test",
    applied: "1 week ago",
    location: "Austin, TX",
    source: "LinkedIn",
    avatar: "/abstract-geometric-composition-5.png",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    role: "UX Researcher",
    stage: "Interview",
    applied: "2 weeks ago",
    location: "Seattle, WA",
    source: "Glassdoor",
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    id: 7,
    name: "David Thompson",
    email: "david.thompson@example.com",
    role: "Data Analyst",
    stage: "Applied",
    applied: "3 days ago",
    location: "Boston, MA",
    source: "Indeed",
    avatar: "/abstract-geometric-seven.png",
  },
  {
    id: 8,
    name: "Sophia Garcia",
    email: "sophia.garcia@example.com",
    role: "Marketing Manager",
    stage: "Rejected",
    applied: "3 weeks ago",
    location: "Los Angeles, CA",
    source: "Referral",
    avatar: "/abstract-geometric-sculpture.png",
  },
]

// Helper function to get badge variant based on stage
const getStageBadgeVariant = (stage: string) => {
  switch (stage) {
    case "Applied":
      return "secondary"
    case "Technical Test":
      return "outline"
    case "Interview":
      return "default"
    case "Offer":
      return "warning"
    case "Hired":
      return "success"
    case "Rejected":
      return "destructive"
    default:
      return "outline"
  }
}

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  // First, add a new state for role filtering
  const [roleFilter, setRoleFilter] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Add these state variables after the existing state declarations
  const [stageFilter, setStageFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false)
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    source: "Direct Application",
  })

  // Handle viewing a candidate's profile
  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate)
    setIsProfileModalOpen(true)
    toast({
      title: "Profile Opened",
      description: `Viewing ${candidate.name}'s profile`,
    })
  }

  // Handle scheduling an interview
  const handleScheduleInterview = (candidate: any) => {
    setSelectedCandidate(candidate)
    setIsScheduleModalOpen(true)
    toast({
      title: "Schedule Interview",
      description: `Scheduling interview for ${candidate.name}`,
    })
  }

  // Handle moving a candidate to the next stage
  const handleMoveToNextStage = (candidate: any) => {
    const stages = ["Applied", "Technical Test", "Interview", "Offer", "Hired"]
    const currentIndex = stages.indexOf(candidate.stage)

    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1]

      // Update the candidate's stage in our local state
      const updatedCandidates = candidatesData.map((c) => {
        if (c.id === candidate.id) {
          return { ...c, stage: nextStage }
        }
        return c
      })

      // In a real app, you would update this in your database
      // For now, we'll update our mock data
      candidatesData.forEach((c, i) => {
        if (c.id === candidate.id) {
          candidatesData[i].stage = nextStage
        }
      })

      toast({
        title: "Candidate Advanced",
        description: `${candidate.name} moved to ${nextStage} stage`,
        variant: "default",
      })

      // Force a re-render
      setSearchQuery(searchQuery)
    } else {
      toast({
        title: "Already at Final Stage",
        description: `${candidate.name} is already at the final stage`,
        variant: "destructive",
      })
    }
  }

  // Handle rejecting a candidate
  const handleRejectCandidate = (candidate: any) => {
    if (candidate.stage === "Rejected") {
      toast({
        title: "Already Rejected",
        description: `${candidate.name} has already been rejected`,
        variant: "destructive",
      })
      return
    }

    // Store the previous stage in case user wants to undo
    const previousStage = candidate.stage

    // Update the candidate's stage in our local state
    candidatesData.forEach((c, i) => {
      if (c.id === candidate.id) {
        candidatesData[i].stage = "Rejected"
      }
    })

    // Force a re-render
    setSearchQuery(searchQuery)

    // Show toast with undo option
    toast({
      title: "Candidate Rejected",
      description: (
        <div className="flex items-center justify-between">
          <span>{candidate.name} has been rejected</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Restore previous stage
              candidatesData.forEach((c, i) => {
                if (c.id === candidate.id) {
                  candidatesData[i].stage = previousStage
                }
              })
              // Force a re-render
              setSearchQuery(searchQuery)
              toast({
                title: "Action Undone",
                description: `${candidate.name} restored to ${previousStage} stage`,
              })
            }}
          >
            Undo
          </Button>
        </div>
      ),
      variant: "destructive",
      duration: 5000,
    })
  }

  // Replace the existing filteredCandidates logic with this more comprehensive version
  const filteredCandidates = candidatesData.filter((candidate) => {
    const matchesSearch =
      searchQuery === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase())

    // Add role filtering
    const matchesRole = roleFilter === "all" || candidate.role.toLowerCase().includes(roleFilter.toLowerCase())

    // Add stage filtering
    const matchesStage = stageFilter === "all" || candidate.stage.toLowerCase() === stageFilter.toLowerCase()

    // Add location filtering
    const matchesLocation =
      locationFilter === "all" || candidate.location.toLowerCase().includes(locationFilter.toLowerCase())

    // Add source filtering
    const matchesSource = sourceFilter === "all" || candidate.source.toLowerCase() === sourceFilter.toLowerCase()

    // Add date filtering (simplified for demo)
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && candidate.applied.includes("day")) ||
      (dateFilter === "week" && (candidate.applied.includes("day") || candidate.applied.includes("week"))) ||
      (dateFilter === "month" &&
        (candidate.applied.includes("day") ||
          candidate.applied.includes("week") ||
          candidate.applied.includes("month")))

    return matchesSearch && matchesRole && matchesStage && matchesLocation && matchesSource && matchesDate
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">View and manage all candidates in your recruitment pipeline</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog open={isAddCandidateOpen} onOpenChange={setIsAddCandidateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto">
                <UserRound className="h-4 w-4" />
                Add Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Candidate</DialogTitle>
                <DialogDescription>
                  Enter the details of the new candidate to add them to your pipeline.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                    className="col-span-3"
                    placeholder="John Smith"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newCandidate.email}
                    onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                    className="col-span-3"
                    placeholder="john.smith@example.com"
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={newCandidate.role}
                    onChange={(e) => setNewCandidate({ ...newCandidate, role: e.target.value })}
                    className="col-span-3"
                    placeholder="Frontend Developer"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newCandidate.location}
                    onChange={(e) => setNewCandidate({ ...newCandidate, location: e.target.value })}
                    className="col-span-3"
                    placeholder="New York, NY"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="source" className="text-right">
                    Source
                  </Label>
                  <Select
                    value={newCandidate.source}
                    onValueChange={(value) => setNewCandidate({ ...newCandidate, source: value })}
                  >
                    <SelectTrigger id="source" className="col-span-3">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Direct Application">Direct Application</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Indeed">Indeed</SelectItem>
                      <SelectItem value="Glassdoor">Glassdoor</SelectItem>
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCandidateOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Validate form
                    if (!newCandidate.name || !newCandidate.email || !newCandidate.role) {
                      toast({
                        title: "Missing Information",
                        description: "Please fill in all required fields.",
                        variant: "destructive",
                      })
                      return
                    }

                    // Create a new candidate object
                    const newId = Math.max(...candidatesData.map((c) => c.id)) + 1
                    const candidateToAdd = {
                      id: newId,
                      name: newCandidate.name,
                      email: newCandidate.email,
                      role: newCandidate.role,
                      stage: "Applied",
                      applied: "Today",
                      location: newCandidate.location || "Remote",
                      source: newCandidate.source,
                      avatar: "/diverse-avatars.png",
                    }

                    // Add to the candidates data
                    candidatesData.push(candidateToAdd)

                    // Reset form and close dialog
                    setNewCandidate({
                      name: "",
                      email: "",
                      role: "",
                      location: "",
                      source: "Direct Application",
                    })
                    setIsAddCandidateOpen(false)

                    // Force a re-render
                    setSearchQuery(searchQuery)

                    toast({
                      title: "Candidate Added",
                      description: `${candidateToAdd.name} has been added to the pipeline`,
                    })
                  }}
                >
                  Add Candidate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Upload className="h-4 w-4" />
                  Bulk Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    <span>Import from CSV</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <Database className="h-4 w-4 mr-2" />
                    <span>Import from ATS</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    <span>Download Template</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Frontend">Frontend Developer</SelectItem>
              <SelectItem value="Backend">Backend Engineer</SelectItem>
              <SelectItem value="Product Designer">Product Designer</SelectItem>
              <SelectItem value="UX">UX Researcher</SelectItem>
              <SelectItem value="Data">Data Analyst</SelectItem>
              <SelectItem value="DevOps">DevOps Engineer</SelectItem>
              <SelectItem value="Product Manager">Product Manager</SelectItem>
              <SelectItem value="Marketing">Marketing Manager</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="technical test">Technical Test</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>More Filters</span>
                <Filter className="h-4 w-4 ml-2" />
                {(locationFilter !== "all" || sourceFilter !== "all" || dateFilter !== "all") && (
                  <Badge variant="secondary" className="ml-2 h-5 rounded-full px-2 text-xs">
                    {(locationFilter !== "all" ? 1 : 0) +
                      (sourceFilter !== "all" ? 1 : 0) +
                      (dateFilter !== "all" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px]">
              <DropdownMenuLabel>Additional Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="p-2">
                <Label htmlFor="location-filter" className="text-xs font-medium">
                  Location
                </Label>
                <Select value={locationFilter} onValueChange={setLocationFilter} className="mt-1">
                  <SelectTrigger id="location-filter">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Austin">Austin</SelectItem>
                    <SelectItem value="Seattle">Seattle</SelectItem>
                    <SelectItem value="Boston">Boston</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-2">
                <Label htmlFor="source-filter" className="text-xs font-medium">
                  Source
                </Label>
                <Select value={sourceFilter} onValueChange={setSourceFilter} className="mt-1">
                  <SelectTrigger id="source-filter">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Indeed">Indeed</SelectItem>
                    <SelectItem value="Glassdoor">Glassdoor</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-2">
                <Label htmlFor="date-filter" className="text-xs font-medium">
                  Applied Date
                </Label>
                <Select value={dateFilter} onValueChange={setDateFilter} className="mt-1">
                  <SelectTrigger id="date-filter">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DropdownMenuSeparator />
              <div className="p-2 flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLocationFilter("all")
                    setSourceFilter("all")
                    setDateFilter("all")
                  }}
                  disabled={locationFilter === "all" && sourceFilter === "all" && dateFilter === "all"}
                >
                  Reset All
                </Button>
                <Button size="sm">Apply Filters</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active filters display */}
        {(roleFilter !== "all" ||
          stageFilter !== "all" ||
          locationFilter !== "all" ||
          sourceFilter !== "all" ||
          dateFilter !== "all") && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {roleFilter !== "all" && (
              <Badge variant="secondary" className="flex gap-1 items-center">
                Role: {roleFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setRoleFilter("all")} />
              </Badge>
            )}
            {stageFilter !== "all" && (
              <Badge variant="secondary" className="flex gap-1 items-center">
                Stage: {stageFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setStageFilter("all")} />
              </Badge>
            )}
            {locationFilter !== "all" && (
              <Badge variant="secondary" className="flex gap-1 items-center">
                Location: {locationFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setLocationFilter("all")} />
              </Badge>
            )}
            {sourceFilter !== "all" && (
              <Badge variant="secondary" className="flex gap-1 items-center">
                Source: {sourceFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSourceFilter("all")} />
              </Badge>
            )}
            {dateFilter !== "all" && (
              <Badge variant="secondary" className="flex gap-1 items-center">
                Applied: {dateFilter === "today" ? "Today" : dateFilter === "week" ? "This Week" : "This Month"}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setDateFilter("all")} />
              </Badge>
            )}
            {(roleFilter !== "all" ||
              stageFilter !== "all" ||
              locationFilter !== "all" ||
              sourceFilter !== "all" ||
              dateFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  setRoleFilter("all")
                  setStageFilter("all")
                  setLocationFilter("all")
                  setSourceFilter("all")
                  setDateFilter("all")
                }}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Candidate</TableHead>
                  <TableHead className="min-w-[180px]">Role</TableHead>
                  <TableHead className="min-w-[120px]">
                    <div className="flex items-center">
                      Stage
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[120px]">Applied</TableHead>
                  <TableHead className="min-w-[150px]">Location</TableHead>
                  <TableHead className="min-w-[120px]">Source</TableHead>
                  <TableHead className="min-w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-xs text-muted-foreground">{candidate.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.role}</TableCell>
                    <TableCell>
                      <Badge variant={getStageBadgeVariant(candidate.stage) as any}>{candidate.stage}</Badge>
                    </TableCell>
                    <TableCell>{candidate.applied}</TableCell>
                    <TableCell>{candidate.location}</TableCell>
                    <TableCell>{candidate.source}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel className="flex items-center gap-2">
                            <span>Actions</span>
                            <Badge variant="outline" className="ml-auto text-xs">
                              {candidate.stage}
                            </Badge>
                          </DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewProfile(candidate)}>
                            <span>View Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleScheduleInterview(candidate)}>
                            <span>Schedule Interview</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleMoveToNextStage(candidate)}>
                            <span>
                              Move to {(() => {
                                const stages = ["Applied", "Technical Test", "Interview", "Offer", "Hired"]
                                const currentIndex = stages.indexOf(candidate.stage)
                                return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : "Next Stage"
                              })()}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRejectCandidate(candidate)}
                            className={`${candidate.stage === "Rejected" ? "opacity-50 cursor-not-allowed" : "text-destructive focus:text-destructive"}`}
                            disabled={candidate.stage === "Rejected"}
                          >
                            <span>{candidate.stage === "Rejected" ? "Already Rejected" : "Reject Candidate"}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="kanban">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <Badge variant="secondary" className="mr-2">
                    {candidatesData.filter((c) => c.stage === "Applied").length}
                  </Badge>
                  Applied
                </CardTitle>
                <CardDescription>New applications</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div className="space-y-2" variants={container} initial="hidden" animate="show">
                  {candidatesData
                    .filter((c) => c.stage === "Applied")
                    .map((candidate) => (
                      <motion.div
                        key={candidate.id}
                        variants={item}
                        className="flex items-center gap-3 rounded-md border p-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.role}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            setSelectedCandidate(candidate)
                            toast({
                              title: "Options Available",
                              description: "Click for more actions on this candidate",
                            })
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                </motion.div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <Badge className="mr-2">{candidatesData.filter((c) => c.stage === "Interview").length}</Badge>
                  Interview
                </CardTitle>
                <CardDescription>Scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div className="space-y-2" variants={container} initial="hidden" animate="show">
                  {candidatesData
                    .filter((c) => c.stage === "Interview")
                    .map((candidate) => (
                      <motion.div
                        key={candidate.id}
                        variants={item}
                        className="flex items-center gap-3 rounded-md border p-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.role}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            setSelectedCandidate(candidate)
                            toast({
                              title: "Options Available",
                              description: "Click for more actions on this candidate",
                            })
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {isProfileModalOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6 max-h-[75vh] min-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Candidate Profile</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsProfileModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedCandidate.avatar || "/placeholder.svg"} alt={selectedCandidate.name} />
                  <AvatarFallback>{selectedCandidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-bold">{selectedCandidate.name}</h4>
                  <p className="text-muted-foreground">{selectedCandidate.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getStageBadgeVariant(selectedCandidate.stage) as any}>
                      {selectedCandidate.stage}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Applied {selectedCandidate.applied}</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-3">Application Details</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Role Applied For</p>
                    <p className="text-sm text-muted-foreground">{selectedCandidate.role}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedCandidate.role.includes("Developer") || selectedCandidate.role.includes("Engineer")
                        ? "Engineering"
                        : selectedCandidate.role.includes("Design")
                          ? "Design"
                          : selectedCandidate.role.includes("Product")
                            ? "Product"
                            : selectedCandidate.role.includes("Marketing")
                              ? "Marketing"
                              : "Operations"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{selectedCandidate.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Source</p>
                    <p className="text-sm text-muted-foreground">{selectedCandidate.source}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Salary Expectation</p>
                    <p className="text-sm text-muted-foreground">
                      ${Math.floor(Math.random() * 50 + 80)},000 - ${Math.floor(Math.random() * 50 + 100)},000
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Notice Period</p>
                    <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 4 + 2)} weeks</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-3">Skills & Experience</h5>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Key Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        let skills = []
                        if (selectedCandidate.role.includes("Frontend")) {
                          skills = ["React", "JavaScript", "TypeScript", "HTML/CSS", "Next.js"]
                        } else if (selectedCandidate.role.includes("Backend")) {
                          skills = ["Node.js", "Python", "Java", "SQL", "AWS"]
                        } else if (selectedCandidate.role.includes("Design")) {
                          skills = ["Figma", "UI/UX", "Wireframing", "User Research", "Prototyping"]
                        } else if (selectedCandidate.role.includes("Data")) {
                          skills = ["SQL", "Python", "Data Visualization", "Statistics", "Machine Learning"]
                        } else if (selectedCandidate.role.includes("DevOps")) {
                          skills = ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux"]
                        } else if (selectedCandidate.role.includes("Product")) {
                          skills = ["Roadmapping", "User Stories", "Agile", "Market Research", "Analytics"]
                        } else if (selectedCandidate.role.includes("Marketing")) {
                          skills = ["Content Strategy", "SEO", "Social Media", "Analytics", "Campaign Management"]
                        } else {
                          skills = ["Communication", "Problem Solving", "Teamwork", "Project Management", "Leadership"]
                        }
                        return skills.map((skill, i) => (
                          <Badge key={i} variant="outline">
                            {skill}
                          </Badge>
                        ))
                      })()}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Experience</p>
                    <div className="space-y-3">
                      <div className="border-l-2 border-muted pl-4 py-1">
                        <p className="text-sm font-medium">Senior {selectedCandidate.role.split(" ").slice(-1)[0]}</p>
                        <p className="text-xs text-muted-foreground">Previous Company Inc. • 2020 - Present</p>
                        <p className="text-xs mt-1">
                          Led a team of {Math.floor(Math.random() * 5 + 2)} developers and delivered key projects on
                          time.
                        </p>
                      </div>
                      <div className="border-l-2 border-muted pl-4 py-1">
                        <p className="text-sm font-medium">{selectedCandidate.role.split(" ").slice(-1)[0]}</p>
                        <p className="text-xs text-muted-foreground">Tech Solutions Ltd. • 2017 - 2020</p>
                        <p className="text-xs mt-1">
                          Worked on multiple projects and improved system performance by 40%.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Education</p>
                    <div className="border-l-2 border-muted pl-4 py-1">
                      <p className="text-sm font-medium">BS in Computer Science</p>
                      <p className="text-xs text-muted-foreground">University of Technology • 2013 - 2017</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-3">Interview Feedback</h5>
                {selectedCandidate.stage === "Applied" ? (
                  <p className="text-sm text-muted-foreground">No interviews conducted yet.</p>
                ) : (
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">Technical Assessment</p>
                          <p className="text-xs text-muted-foreground">Conducted by: Alex Johnson • 2 days ago</p>
                        </div>
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                        </div>
                      </div>
                      <p className="text-sm mt-2">
                        Strong technical skills, especially in{" "}
                        {selectedCandidate.role.includes("Frontend")
                          ? "React and TypeScript"
                          : selectedCandidate.role.includes("Backend")
                            ? "Node.js and databases"
                            : "their area of expertise"}
                        . Would be a good addition to the team.
                      </p>
                    </div>

                    {selectedCandidate.stage !== "Technical Test" && (
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium">Cultural Fit</p>
                            <p className="text-xs text-muted-foreground">Conducted by: Sarah Miller • Yesterday</p>
                          </div>
                          <div className="flex items-center">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                          </div>
                        </div>
                        <p className="text-sm mt-2">
                          Excellent cultural fit. Demonstrates our company values and has a collaborative approach to
                          work.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsProfileModalOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsProfileModalOpen(false)
                    handleMoveToNextStage(selectedCandidate)
                  }}
                >
                  {(() => {
                    const stages = ["Applied", "Technical Test", "Interview", "Offer", "Hired"]
                    const currentIndex = stages.indexOf(selectedCandidate.stage)
                    if (currentIndex < stages.length - 1) {
                      return `Move to ${stages[currentIndex + 1]}`
                    } else if (selectedCandidate.stage === "Rejected") {
                      return "Candidate Rejected"
                    } else {
                      return "Already Hired"
                    }
                  })()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple schedule interview modal */}
      {isScheduleModalOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-background p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Schedule Interview</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsScheduleModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">Candidate</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedCandidate.avatar || "/placeholder.svg"} alt={selectedCandidate.name} />
                    <AvatarFallback>{selectedCandidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{selectedCandidate.name}</span>
                </div>
              </div>
              <div>
                <Label htmlFor="interview-date">Date</Label>
                <Input id="interview-date" type="date" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="interview-time">Time</Label>
                <Input id="interview-time" type="time" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="interview-type">Interview Type</Label>
                <Select defaultValue="technical">
                  <SelectTrigger id="interview-type" className="mt-1">
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="cultural">Cultural Fit</SelectItem>
                    <SelectItem value="final">Final Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsScheduleModalOpen(false)
                    toast({
                      title: "Interview Scheduled",
                      description: `Interview scheduled with ${selectedCandidate.name}`,
                    })
                  }}
                >
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
