"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Download, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for charts
const applicantsData = [
  { month: "Jan", count: 35 },
  { month: "Feb", count: 28 },
  { month: "Mar", count: 42 },
  { month: "Apr", count: 50 },
  { month: "May", count: 65 },
  { month: "Jun", count: 78 },
  { month: "Jul", count: 90 },
  { month: "Aug", count: 102 },
  { month: "Sep", count: 85 },
  { month: "Oct", count: 75 },
  { month: "Nov", count: 80 },
  { month: "Dec", count: 70 },
]

const stageConversionData = [
  { name: "Applied", value: 100 },
  { name: "Screened", value: 70 },
  { name: "Interview", value: 40 },
  { name: "Technical", value: 25 },
  { name: "Offer", value: 15 },
  { name: "Hired", value: 10 },
]

const sourcingChannelData = [
  { name: "LinkedIn", value: 45 },
  { name: "Referrals", value: 25 },
  { name: "Indeed", value: 15 },
  { name: "Glassdoor", value: 10 },
  { name: "Other", value: 5 },
]

const popularRolesData = [
  { name: "Frontend Developer", count: 28 },
  { name: "Backend Developer", count: 22 },
  { name: "Product Designer", count: 16 },
  { name: "Data Analyst", count: 12 },
  { name: "Product Manager", count: 10 },
  { name: "DevOps Engineer", count: 8 },
]

// Mock data for hiring tab
const hiringVelocityData = [
  { stage: "Screening", days: 2, color: "#10b981" },
  { stage: "Interview", days: 5, color: "#3b82f6" },
  { stage: "Technical", days: 8, color: "#f59e0b" },
  { stage: "Decision", days: 6, color: "#8b5cf6" },
  { stage: "Offer", days: 3, color: "#ec4899" },
]

const offerDeclineData = [
  { reason: "Compensation", percentage: 42, color: "#ef4444" },
  { reason: "Competing Offer", percentage: 28, color: "#f59e0b" },
  { reason: "Remote Work Policy", percentage: 18, color: "#8b5cf6" },
  { reason: "Benefits Package", percentage: 8, color: "#3b82f6" },
  { reason: "Other", percentage: 4, color: "#6b7280" },
]

const monthlyHiringData = [
  { month: "Jan", hired: 8, target: 10 },
  { month: "Feb", hired: 6, target: 8 },
  { month: "Mar", hired: 9, target: 8 },
  { month: "Apr", hired: 12, target: 10 },
  { month: "May", hired: 15, target: 12 },
  { month: "Jun", hired: 14, target: 15 },
  { month: "Jul", hired: 18, target: 15 },
  { month: "Aug", hired: 20, target: 18 },
  { month: "Sep", hired: 16, target: 18 },
  { month: "Oct", hired: 14, target: 15 },
  { month: "Nov", hired: 12, target: 12 },
  { month: "Dec", hired: 10, target: 10 },
]

const candidateFeedbackData = [
  { category: "Interview Process", score: 4.2, maxScore: 5 },
  { category: "Communication", score: 4.5, maxScore: 5 },
  { category: "Recruiter Knowledge", score: 4.3, maxScore: 5 },
  { category: "Company Culture", score: 4.0, maxScore: 5 },
  { category: "Overall Experience", score: 4.1, maxScore: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [activeTab, setActiveTab] = useState("overview")

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

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground">Analytics and metrics for your recruitment process</p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="overview" className="w-full max-w-md" onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="overview" className="flex-1 sm:flex-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="applicants" className="flex-1 sm:flex-none">
              Applicants
            </TabsTrigger>
            <TabsTrigger value="hiring" className="flex-1 sm:flex-none">
              Hiring
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px] sm:w-[160px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {activeTab === "overview" && (
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="text-2xl font-bold">1,482</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+12.5%</span> from previous period
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="text-2xl font-bold">8.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+1.3%</span> from previous period
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Time to Hire</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="text-2xl font-bold">24 days</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-rose-500">+2 days</span> from previous period
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cost per Hire</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="text-2xl font-bold">$3,200</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">-$450</span> from previous period
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {activeTab === "overview" && (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    <path d="M17 6h6v6" />
                  </svg>
                </div>
                Applicants Over Time
              </CardTitle>
              <CardDescription>Monthly applicant volume with growth trend analysis</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Monthly Application Trends</h3>

                <div className="flex flex-col justify-end" style={{ height: "calc(100% - 3rem)" }}>
                  <div className="grid grid-cols-12 gap-1 h-[180px]">
                    {applicantsData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center justify-end h-full group">
                        <div className="text-xs font-medium mb-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.count}
                        </div>
                        <div
                          className="w-full rounded-t-md shadow-md border border-gray-100 dark:border-gray-700 bg-blue-500 hover:bg-blue-600 transition-all"
                          style={{
                            height: `${Math.max((item.count / 120) * 80, 10)}%`,
                          }}
                        >
                          {/* Empty div to ensure height */}
                          <div className="w-full h-full"></div>
                        </div>
                        <div className="text-xs mt-2 font-medium text-center w-full truncate px-1">{item.month}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                  Values shown: applicant count
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                  <p className="text-xs text-muted-foreground">Average monthly</p>
                  <p className="text-lg font-semibold">62 applicants</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>+12.4% vs. last year</span>
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                  <p className="text-xs text-muted-foreground">Peak month</p>
                  <p className="text-lg font-semibold">August (102)</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>+24.8% vs. last year</span>
                  </div>
                </div>
                <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
                  <p className="text-xs text-muted-foreground">Q4 projection</p>
                  <p className="text-lg font-semibold">+15% growth</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>Based on 3-year trend</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                  <svg
                    className="h-4 w-4 text-amber-600 dark:text-amber-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 21h10" />
                    <path d="M12 21v-8" />
                    <path d="M3 7l9-4 9 4" />
                    <path d="M3 7v2" />
                    <path d="M21 7v2" />
                    <path d="M12 13V7" />
                    <path d="M8 13v-3" />
                    <path d="M16 13v-3" />
                  </svg>
                </div>
                Recruitment Funnel
              </CardTitle>
              <CardDescription>Conversion rates between hiring stages</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Recruitment Pipeline Stages</h3>

                <div className="flex flex-col justify-end" style={{ height: "calc(100% - 3rem)" }}>
                  <div className="grid grid-cols-6 gap-3 h-[180px]">
                    {stageConversionData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center justify-end h-full">
                        <div className="text-xs font-medium mb-1 text-center">{item.value}</div>
                        <div
                          className="w-full rounded-t-md shadow-md border border-gray-100 dark:border-gray-700"
                          style={{
                            height: `${Math.max((item.value / 100) * 80, 10)}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        >
                          {/* Empty div to ensure height */}
                          <div className="w-full h-full"></div>
                        </div>
                        <div className="text-xs mt-2 font-medium text-center w-full truncate px-1">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                  Values shown: actual candidate count
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Funnel Efficiency Score</span>
                  <span className="text-sm font-bold">72/100</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-full rounded-full bg-green-500" style={{ width: "72%" }}></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-900/30">
                    <p className="font-medium">30%</p>
                    <p className="text-xs text-muted-foreground">Applied → Interview</p>
                  </div>
                  <div className="rounded-md bg-amber-50 p-2 dark:bg-amber-900/30">
                    <p className="font-medium">37.5%</p>
                    <p className="text-xs text-muted-foreground">Interview → Offer</p>
                  </div>
                  <div className="rounded-md bg-green-50 p-2 dark:bg-green-900/30">
                    <p className="font-medium">66.7%</p>
                    <p className="text-xs text-muted-foreground">Offer → Hired</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <svg
                    className="h-4 w-4 text-green-600 dark:text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                Sourcing Channels
              </CardTitle>
              <CardDescription>Distribution of applicants by source with ROI analysis</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative">
                {/* Fallback visualization since chart components are null */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    {sourcingChannelData.map((item, index, arr) => {
                      // Calculate each segment's position in the pie
                      const total = arr.reduce((sum, i) => sum + i.value, 0)
                      const startAngle = (arr.slice(0, index).reduce((sum, i) => sum + i.value, 0) / total) * 360
                      const angle = (item.value / total) * 360

                      return (
                        <div
                          key={index}
                          className="absolute inset-0 group"
                          style={{
                            clipPath: `conic-gradient(from ${startAngle}deg, transparent ${angle}deg, transparent 0)`,
                          }}
                        >
                          <div
                            className="w-full h-full rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full w-24 h-24"></div>
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.name}: {item.value}%
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="absolute bottom-0 w-full">
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {sourcingChannelData.map((item, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <div
                          className="w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">Channel Effectiveness</div>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-[#0088FE] mr-2"></div>
                        <span>LinkedIn</span>
                      </div>
                      <span className="font-medium">High ROI</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-full rounded-full bg-[#0088FE]" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-[#00C49F] mr-2"></div>
                        <span>Referrals</span>
                      </div>
                      <span className="font-medium">Best ROI</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-full rounded-full bg-[#00C49F]" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-[#FFBB28] mr-2"></div>
                        <span>Indeed</span>
                      </div>
                      <span className="font-medium">Medium ROI</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-full rounded-full bg-[#FFBB28]" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                  <svg
                    className="h-4 w-4 text-purple-600 dark:text-purple-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                Popular Roles
              </CardTitle>
              <CardDescription>Most applied-to positions with time-to-fill metrics</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative">
                {/* Fallback visualization since chart components are null */}
                <div className="absolute inset-0 flex flex-col justify-center gap-3 px-4 py-6">
                  {popularRolesData.map((item, index) => {
                    const maxCount = Math.max(...popularRolesData.map((d) => d.count))
                    const percentage = (item.count / maxCount) * 100

                    return (
                      <div key={index} className="flex items-center gap-2 group">
                        <div className="w-24 min-w-24 text-xs truncate" title={item.name}>
                          {item.name}
                        </div>
                        <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm relative group"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          >
                            <div className="absolute inset-y-0 right-1 flex items-center text-xs text-white font-medium">
                              {percentage > 30 ? item.count : ""}
                            </div>
                          </div>
                        </div>
                        <div className="w-8 text-xs text-right">{percentage <= 30 ? item.count : ""}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">Role Insights</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                        <svg
                          className="h-3 w-3 text-blue-600 dark:text-blue-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium">Hardest to Fill</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">Data Analyst</p>
                      <p className="text-xs text-muted-foreground">32 days avg. time</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                        <svg
                          className="h-3 w-3 text-green-600 dark:text-green-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium">Most Competitive</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">Frontend Dev</p>
                      <p className="text-xs text-muted-foreground">28:1 applicant ratio</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "applicants" && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                Applicant Demographics
              </CardTitle>
              <CardDescription>Diversity metrics and candidate distribution</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Gender & Age Distribution</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[200px]">
                  {/* Gender distribution pie chart */}
                  <div className="relative flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-0 bg-blue-500"
                          style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}
                        ></div>
                        <div
                          className="absolute inset-0 bg-pink-500"
                          style={{ clipPath: "polygon(50% 50%, 0% 0%, 50% 0%, 50% 100%, 0% 100%)" }}
                        ></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center">
                        <span className="text-xs font-medium">Gender</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 w-full">
                      <div className="flex flex-col items-center gap-1 mt-4">
                        <div className="flex items-center text-xs">
                          <div className="w-3 h-3 rounded-full mr-1 bg-blue-500"></div>
                          <span>Male (52%)</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="w-3 h-3 rounded-full mr-1 bg-pink-500"></div>
                          <span>Female (48%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Age distribution bar chart */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-full max-w-[200px]">
                      <div className="text-xs font-medium text-center mb-2">Age Groups</div>
                      <div className="flex h-[120px] items-end justify-between gap-2">
                        <div className="flex flex-col items-center flex-1">
                          <div className="w-full bg-indigo-500 rounded-t-sm" style={{ height: "30%" }}>
                            <div className="w-full h-full"></div>
                          </div>
                          <div className="mt-1 text-xs">18-24</div>
                          <div className="text-xs font-medium">15%</div>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <div className="w-full bg-indigo-500 rounded-t-sm" style={{ height: "70%" }}>
                            <div className="w-full h-full"></div>
                          </div>
                          <div className="mt-1 text-xs">25-34</div>
                          <div className="text-xs font-medium">35%</div>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <div className="w-full bg-indigo-500 rounded-t-sm" style={{ height: "60%" }}>
                            <div className="w-full h-full"></div>
                          </div>
                          <div className="mt-1 text-xs">35-44</div>
                          <div className="text-xs font-medium">30%</div>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <div className="w-full bg-indigo-500 rounded-t-sm" style={{ height: "40%" }}>
                            <div className="w-full h-full"></div>
                          </div>
                          <div className="mt-1 text-xs">45+</div>
                          <div className="text-xs font-medium">20%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                  <p className="text-xs text-muted-foreground">Gender ratio</p>
                  <p className="text-lg font-semibold">48:52</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>+4% women YoY</span>
                  </div>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
                  <p className="text-xs text-muted-foreground">Largest age group</p>
                  <p className="text-lg font-semibold">25-34 (35%)</p>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <span>Consistent with industry</span>
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                  <p className="text-xs text-muted-foreground">Diversity score</p>
                  <p className="text-lg font-semibold">78/100</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>+12 points YoY</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                  <svg
                    className="h-4 w-4 text-purple-600 dark:text-purple-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" y1="22" x2="12" y2="12" />
                  </svg>
                </div>
                Applicant Skills
              </CardTitle>
              <CardDescription>Most common skills among applicants</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Technical Skills Distribution</h3>

                <div className="h-[200px] flex flex-col justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Left column - Programming Languages */}
                    <div className="space-y-3">
                      <div className="text-xs font-medium text-center mb-2">Programming Languages</div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>JavaScript</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-yellow-500" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>TypeScript</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>Python</span>
                          <span className="font-medium">52%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-green-500" style={{ width: "52%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>Java</span>
                          <span className="font-medium">38%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-red-500" style={{ width: "38%" }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Right column - Frameworks */}
                    <div className="space-y-3">
                      <div className="text-xs font-medium text-center mb-2">Frameworks & Libraries</div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>React</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-cyan-500" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>Node.js</span>
                          <span className="font-medium">58%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-green-500" style={{ width: "58%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>Next.js</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-gray-900 dark:bg-gray-400"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>Angular</span>
                          <span className="font-medium">32%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-red-500" style={{ width: "32%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                  Based on 1,482 applicant profiles
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">Skill Gap Analysis</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                      <span>High demand, low supply</span>
                    </div>
                    <span className="font-medium text-red-500">DevOps, AI/ML</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                      <span>Emerging skills</span>
                    </div>
                    <span className="font-medium text-amber-500">Web3, AR/VR</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Well-supplied skills</span>
                    </div>
                    <span className="font-medium text-green-500">React, JavaScript</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <svg
                    className="h-4 w-4 text-green-600 dark:text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                Geographic Distribution
              </CardTitle>
              <CardDescription>Where applicants are located globally</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Applicant Locations</h3>

                <div className="h-[200px] flex flex-col justify-center items-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {/* World map visualization placeholder */}
                    <div className="flex items-center justify-center">
                      <div className="w-full h-[140px] bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-2">Global Distribution</div>
                          <div className="flex flex-wrap justify-center gap-2">
                            <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded text-xs">
                              North America
                            </div>
                            <div className="px-2 py-1 bg-green-100 dark:bg-green-900/40 rounded text-xs">Europe</div>
                            <div className="px-2 py-1 bg-red-100 dark:bg-red-900/40 rounded text-xs">Asia</div>
                            <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 rounded text-xs">Other</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top regions bar chart */}
                    <div className="space-y-3">
                      <div className="text-xs font-medium mb-2">Top Regions</div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>North America</span>
                          <span className="font-medium">42%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>Europe</span>
                          <span className="font-medium">28%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-green-500" style={{ width: "28%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>Asia</span>
                          <span className="font-medium">18%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-red-500" style={{ width: "18%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span>Other regions</span>
                          <span className="font-medium">12%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div className="h-full rounded-full bg-purple-500" style={{ width: "12%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                  <p className="text-xs text-muted-foreground">Remote applicants</p>
                  <p className="text-lg font-semibold">68%</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>+15% YoY</span>
                  </div>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
                  <p className="text-xs text-muted-foreground">Relocation willing</p>
                  <p className="text-lg font-semibold">42%</p>
                  <div className="mt-1 flex items-center text-xs text-rose-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    <span>-8% YoY</span>
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                  <p className="text-xs text-muted-foreground">Countries</p>
                  <p className="text-lg font-semibold">42 total</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>+7 countries YoY</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                  <svg
                    className="h-4 w-4 text-amber-600 dark:text-amber-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                Experience Levels
              </CardTitle>
              <CardDescription>Years of experience and seniority distribution</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Experience Distribution</h3>

                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {/* Simplified donut chart for experience levels */}
                    <div className="relative h-40 w-40 mx-auto">
                      <div className="absolute inset-0 rounded-full border-[20px] border-amber-500 opacity-60"></div>
                      <div className="absolute inset-0 rounded-full border-[20px] border-transparent border-t-blue-500 border-r-blue-500 border-b-blue-500 rotate-[35deg] opacity-80"></div>
                      <div className="absolute inset-0 rounded-full border-[20px] border-transparent border-t-green-500 rotate-[280deg] opacity-80"></div>

                      {/* Center circle */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center">
                        <span className="text-xs font-medium">Experience</span>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 rounded-full mr-1 bg-amber-500"></div>
                        <span>Junior (35%)</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 rounded-full mr-1 bg-blue-500"></div>
                        <span>Mid-level (45%)</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 rounded-full mr-1 bg-green-500"></div>
                        <span>Senior (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">Experience Insights</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                        <svg
                          className="h-3 w-3 text-blue-600 dark:text-blue-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium">Most experienced</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">Backend Devs</p>
                      <p className="text-xs text-muted-foreground">8.2 years avg.</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                        <svg
                          className="h-3 w-3 text-amber-600 dark:text-amber-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium">Fastest growing</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">DevOps</p>
                      <p className="text-xs text-muted-foreground">+42% YoY</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "hiring" && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <svg
                    className="h-4 w-4 text-green-600 dark:text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                Hiring Velocity
              </CardTitle>
              <CardDescription>Time-to-hire metrics and bottlenecks</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Time Spent in Each Hiring Stage</h3>

                <div className="h-[200px] flex flex-col justify-center">
                  <div className="space-y-4 w-full max-w-[95%] mx-auto">
                    {hiringVelocityData.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium">{item.stage}</span>
                          <span className="font-medium">{item.days} days</span>
                        </div>
                        <div className="h-7 w-full bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm flex items-center pl-2"
                            style={{
                              width: `${(item.days / 24) * 100}%`,
                              backgroundColor: item.color,
                              minWidth: "40px",
                            }}
                          >
                            <span className="text-xs text-white font-medium">{item.days}d</span>
                          </div>
                        </div>
                        {item.stage === "Technical" && (
                          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                            <div className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-sm border border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                              Bottleneck
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-xs text-muted-foreground">Average time: 24 days total</div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                  <p className="text-xs text-muted-foreground">Avg. time to hire</p>
                  <p className="text-lg font-semibold">24 days</p>
                  <div className="mt-1 flex items-center text-xs text-rose-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    <span>+2 days vs. last year</span>
                  </div>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
                  <p className="text-xs text-muted-foreground">Bottleneck</p>
                  <p className="text-lg font-semibold">Technical</p>
                  <div className="mt-1 flex items-center text-xs text-rose-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    <span>8 days avg.</span>
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                  <p className="text-xs text-muted-foreground">Fastest stage</p>
                  <p className="text-lg font-semibold">Screening</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>2 days avg.</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-red-100 p-1 dark:bg-red-900">
                  <svg
                    className="h-4 w-4 text-red-600 dark:text-red-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                Offer Decline Reasons
              </CardTitle>
              <CardDescription>Why candidates decline job offers</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Top Reasons for Declining Offers</h3>

                <div className="h-[200px] flex flex-col justify-center">
                  <div className="space-y-4 w-full max-w-[95%] mx-auto">
                    {offerDeclineData.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium">{item.reason}</span>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                        <div className="h-7 w-full bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm flex items-center pl-2"
                            style={{
                              width: `${item.percentage}%`,
                              backgroundColor: item.color,
                              minWidth: "30px",
                            }}
                          >
                            {item.percentage >= 10 && (
                              <span className="text-xs text-white font-medium">{item.percentage}%</span>
                            )}
                          </div>
                        </div>
                        {item.reason === "Compensation" && (
                          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                            <div className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-sm border border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                              Primary issue
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-xs text-muted-foreground">Based on 124 declined offers</div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">Improvement Opportunities</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-red-100 p-1 dark:bg-red-900">
                        <svg
                          className="h-3 w-3 text-red-600 dark:text-red-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium">Primary Issue</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">Compensation</p>
                      <p className="text-xs text-muted-foreground">42% of declines</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                        <svg
                          className="h-3 w-3 text-amber-600 dark:text-amber-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium">Recommendation</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">Salary Benchmarking</p>
                      <p className="text-xs text-muted-foreground">Review market rates</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                </div>
                Monthly Hiring Trends
              </CardTitle>
              <CardDescription>Actual vs. target hiring metrics</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Monthly Hiring Performance</h3>

                <div className="h-[200px] flex flex-col justify-end">
                  <div className="grid grid-cols-12 gap-1 h-[180px] px-2">
                    {monthlyHiringData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center justify-end h-full group">
                        {/* Always visible data label */}
                        <div className="text-xs font-medium mb-1 text-center">{item.hired}</div>
                        <div className="relative w-full">
                          {/* Target line with label */}
                          <div
                            className="absolute w-full flex flex-col items-center"
                            style={{ bottom: `${(item.target / 20) * 100}%` }}
                          >
                            <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-600 z-10"></div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400 absolute -top-3">
                              {item.target}
                            </div>
                          </div>
                          {/* Actual bar */}
                          <div
                            className={`w-full rounded-t-md shadow-md border border-gray-100 dark:border-gray-700 ${
                              item.hired >= item.target ? "bg-green-500" : "bg-amber-500"
                            }`}
                            style={{
                              height: `${Math.max((item.hired / 20) * 100, 5)}%`,
                            }}
                          >
                            {/* Empty div to ensure height */}
                            <div className="w-full h-full"></div>
                          </div>
                        </div>
                        <div className="text-xs mt-2 font-medium text-center w-full truncate px-1">{item.month}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-xs text-muted-foreground flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-0.5 bg-gray-400 dark:bg-gray-600 mr-1"></div>
                    <span>Target</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 mr-1"></div>
                    <span>Actual</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                  <p className="text-xs text-muted-foreground">Annual target</p>
                  <p className="text-lg font-semibold">154 hires</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>+12% vs. last year</span>
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                  <p className="text-xs text-muted-foreground">YTD performance</p>
                  <p className="text-lg font-semibold">92%</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>On track to meet goal</span>
                  </div>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
                  <p className="text-xs text-muted-foreground">Best month</p>
                  <p className="text-lg font-semibold">August</p>
                  <div className="mt-1 flex items-center text-xs text-emerald-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    <span>111% of target</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                  <svg
                    className="h-4 w-4 text-purple-600 dark:text-purple-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
                Candidate Feedback
              </CardTitle>
              <CardDescription>Satisfaction scores from the hiring process</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="h-[250px] sm:h-[300px] relative bg-white dark:bg-gray-900 p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4 text-center">Candidate Experience Ratings</h3>

                <div className="h-[200px] flex flex-col justify-center">
                  <div className="space-y-5 w-full max-w-[95%] mx-auto">
                    {candidateFeedbackData.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium">{item.category}</span>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {item.score}/{item.maxScore}
                            </span>
                            {/* Star rating */}
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.round(item.score) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  stroke="none"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="h-5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full flex items-center justify-end pr-2"
                            style={{
                              width: `${(item.score / item.maxScore) * 100}%`,
                              backgroundColor: getScoreColor(item.score, item.maxScore),
                            }}
                          >
                            <span className="text-xs text-white font-medium">{item.score}</span>
                          </div>
                        </div>
                        {item.category === "Communication" && (
                          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                            <div className="bg-green-100 text-green-600 text-xs px-1.5 py-0.5 rounded-sm border border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
                              Best
                            </div>
                          </div>
                        )}
                        {item.category === "Company Culture" && (
                          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                            <div className="bg-amber-100 text-amber-600 text-xs px-1.5 py-0.5 rounded-sm border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400">
                              Improve
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                  Based on 328 candidate surveys
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium">Feedback Insights</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                        <svg
                          className="h-3 w-3 text-green-600 dark:text-green-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium">Highest Rated</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">Communication</p>
                      <p className="text-xs text-muted-foreground">4.5/5 average</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                        <svg
                          className="h-3 w-3 text-amber-600 dark:text-amber-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium">Needs Improvement</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">Company Culture</p>
                      <p className="text-xs text-muted-foreground">4.0/5 average</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "hiring" && (
        <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1 dark:bg-teal-900">
                <svg
                  className="h-4 w-4 text-teal-600 dark:text-teal-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="M9 14l2 2 4-4"></path>
                </svg>
              </div>
              Hiring Efficiency Metrics
            </CardTitle>
            <CardDescription>Key performance indicators for the hiring process</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                    <svg
                      className="h-3 w-3 text-blue-600 dark:text-blue-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Interview to Offer</span>
                </div>
                <p className="text-xl font-bold">37.5%</p>
                <div className="mt-1 flex items-center text-xs text-emerald-600">
                  <svg
                    className="mr-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                  <span>+5.2% vs last year</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                    <svg
                      className="h-3 w-3 text-green-600 dark:text-green-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Offer Acceptance</span>
                </div>
                <p className="text-xl font-bold">78.4%</p>
                <div className="mt-1 flex items-center text-xs text-rose-600">
                  <svg
                    className="mr-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  <span>-3.6% vs last year</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                    <svg
                      className="h-3 w-3 text-purple-600 dark:text-purple-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Cost per Hire</span>
                </div>
                <p className="text-xl font-bold">$3,200</p>
                <div className="mt-1 flex items-center text-xs text-emerald-600">
                  <svg
                    className="mr-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                  <span>-$450 vs last year</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                    <svg
                      className="h-3 w-3 text-amber-600 dark:text-amber-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">90-day Retention</span>
                </div>
                <p className="text-xl font-bold">94.2%</p>
                <div className="mt-1 flex items-center text-xs text-emerald-600">
                  <svg
                    className="mr-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                  <span>+2.1% vs last year</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Helper function to get color based on score
function getScoreColor(score, maxScore) {
  const percentage = (score / maxScore) * 100
  if (percentage >= 90) return "#10b981" // green-500
  if (percentage >= 75) return "#3b82f6" // blue-500
  if (percentage >= 60) return "#f59e0b" // amber-500
  return "#ef4444" // red-500
}
