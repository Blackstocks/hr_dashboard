"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, MapPin, Plus, Search, Users } from "lucide-react"
import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for jobs
const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Open",
    applicants: 24,
    posted: "2 weeks ago",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    status: "Open",
    applicants: 18,
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    status: "Open",
    applicants: 12,
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    status: "Open",
    applicants: 8,
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "Customer Support",
    location: "Chicago, IL",
    type: "Full-time",
    status: "Closed",
    applicants: 15,
    posted: "1 month ago",
  },
  {
    id: 6,
    title: "Data Analyst",
    department: "Data",
    location: "Remote",
    type: "Contract",
    status: "Open",
    applicants: 10,
    posted: "1 week ago",
  },
  {
    id: 7,
    title: "Backend Developer",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Full-time",
    status: "Open",
    applicants: 16,
    posted: "2 weeks ago",
  },
  {
    id: 8,
    title: "UX Researcher",
    department: "Design",
    location: "Los Angeles, CA",
    type: "Part-time",
    status: "Open",
    applicants: 7,
    posted: "4 days ago",
  },
]

export default function JobsPage() {
  const [view, setView] = useState<"grid" | "table">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Add filter state
  const [filters, setFilters] = useState({
    status: "all",
    department: "all",
    location: "all",
    type: "all",
  })

  // Calculate active filters count
  const activeFilters = Object.values(filters).filter((value) => value !== "all").length

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      status: "all",
      department: "all",
      location: "all",
      type: "all",
    })
  }

  const filteredJobs = jobsData.filter((job) => {
    // Search query filter
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = filters.status === "all" || job.status === filters.status

    // Department filter
    const matchesDepartment = filters.department === "all" || job.department === filters.department

    // Location filter
    const matchesLocation = filters.location === "all" || job.location === filters.location

    // Type filter
    const matchesType = filters.type === "all" || job.type === filters.type

    // Return true only if all conditions are met
    return matchesSearch && matchesStatus && matchesDepartment && matchesLocation && matchesType
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
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300 ease-in-out">
      <div className="flex flex-col gap-3 bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground">Manage and track all your current job openings</p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-background/80 p-4 rounded-lg border border-border/40 shadow-sm hover:border-border/70 transition-all duration-300">
        <div className="relative w-full max-w-sm group">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="pl-8 border-border/50 hover:border-primary/50 focus:border-primary transition-colors duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors duration-200">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {activeFilters > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {activeFilters}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter Jobs</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                <div className="space-y-2 mb-2">
                  <Label htmlFor="department-filter">Department</Label>
                  <Select value={filters.department} onValueChange={(value) => handleFilterChange("department", value)}>
                    <SelectTrigger id="department-filter">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Data">Data</SelectItem>
                      <SelectItem value="Customer Support">Customer Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 mb-2">
                  <Label htmlFor="location-filter">Location</Label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                    <SelectTrigger id="location-filter">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                      <SelectItem value="New York, NY">New York, NY</SelectItem>
                      <SelectItem value="Austin, TX">Austin, TX</SelectItem>
                      <SelectItem value="Chicago, IL">Chicago, IL</SelectItem>
                      <SelectItem value="Seattle, WA">Seattle, WA</SelectItem>
                      <SelectItem value="Los Angeles, CA">Los Angeles, CA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type-filter">Job Type</Label>
                  <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                    <SelectTrigger id="type-filter">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 flex justify-between">
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
                <Button size="sm" onClick={() => document.body.click()}>
                  Apply
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="w-[130px] sm:w-[160px] border-border/50 hover:border-primary/50 transition-colors duration-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center rounded-md border border-border/50 hover:border-primary/50 transition-colors duration-200">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setView("grid")}
            >
              Grid
            </Button>
            <Button
              variant={view === "table" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setView("table")}
            >
              Table
            </Button>
          </div>

          <Button size="sm" className="bg-primary hover:bg-primary/90 transition-colors duration-200">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Job</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredJobs.map((job) => (
            <motion.div key={job.id} variants={item}>
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <Badge
                      variant={job.status === "Open" ? "default" : "secondary"}
                      className="transition-colors duration-200 hover:bg-primary/20"
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <CardDescription>{job.department}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {job.applicants} applicants
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline" className="hover:bg-primary/10 transition-colors duration-200">
                      {job.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 bg-muted/30">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="overflow-auto rounded-md border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="min-w-[150px] font-medium">Job Title</TableHead>
                <TableHead className="min-w-[120px]">Department</TableHead>
                <TableHead className="min-w-[120px]">Location</TableHead>
                <TableHead className="min-w-[100px]">Type</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[100px]">Applicants</TableHead>
                <TableHead className="min-w-[100px]">Posted</TableHead>
                <TableHead className="min-w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/30 transition-colors duration-200">
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={job.status === "Open" ? "default" : "secondary"}
                      className="transition-colors duration-200 hover:bg-primary/20"
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.applicants}</TableCell>
                  <TableCell>{job.posted}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
