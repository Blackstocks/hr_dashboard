"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Briefcase, Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PencilIcon, Trash2Icon } from "lucide-react"

// Mock data for job details
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
    salary: "$120,000 - $150,000",
    experience: "5+ years",
    deadline: "June 30, 2023",
    overview:
      "We are looking for a Senior Frontend Developer to join our engineering team. You will be responsible for building and maintaining our web applications, working closely with our design and backend teams.",
    responsibilities: [
      "Develop and maintain our web applications using React, Next.js, and TypeScript",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and efficient code",
      "Optimize applications for maximum speed and scalability",
      "Implement responsive design and ensure cross-browser compatibility",
      "Participate in code reviews and mentor junior developers",
    ],
    qualifications: [
      "5+ years of experience in frontend development",
      "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
      "Experience with React, Next.js, and TypeScript",
      "Familiarity with RESTful APIs and GraphQL",
      "Understanding of server-side rendering and its benefits",
      "Experience with responsive and adaptive design",
      "Knowledge of modern authorization mechanisms, such as JSON Web Token",
      "Familiarity with code versioning tools, such as Git",
    ],
    perks: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Generous vacation policy",
      "Parental leave",
      "Modern equipment and tools",
    ],
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
    salary: "$100,000 - $130,000",
    experience: "3+ years",
    deadline: "July 15, 2023",
    overview:
      "We are seeking a talented Product Designer to join our design team. You will be responsible for creating user-centered designs for our products, working closely with product managers and engineers.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback",
      "Design flows, prototypes, and high-fidelity mockups",
      "Create and maintain design systems",
      "Collaborate with product managers and engineers",
      "Conduct user research and usability testing",
      "Iterate on designs based on feedback",
    ],
    qualifications: [
      "3+ years of experience in product design",
      "Strong portfolio demonstrating your design process and solutions",
      "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
      "Experience with design systems and component libraries",
      "Understanding of user-centered design principles",
      "Excellent communication and collaboration skills",
      "Ability to work in a fast-paced environment",
    ],
    perks: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Generous vacation policy",
      "Parental leave",
      "Modern equipment and tools",
    ],
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
    salary: "$90,000 - $120,000",
    experience: "4+ years",
    deadline: "July 30, 2023",
    overview:
      "We are looking for a Marketing Manager to lead our marketing efforts. You will be responsible for developing and implementing marketing strategies to promote our products and services.",
    responsibilities: [
      "Develop and implement marketing strategies",
      "Manage marketing campaigns from concept to execution",
      "Create and manage content for our website and social media channels",
      "Analyze campaign performance and optimize marketing efforts",
      "Collaborate with sales and product teams",
      "Manage marketing budget and resources",
    ],
    qualifications: [
      "4+ years of experience in marketing",
      "Experience with digital marketing, content marketing, and social media marketing",
      "Strong analytical skills and experience with marketing analytics tools",
      "Excellent communication and writing skills",
      "Experience with marketing automation tools",
      "Bachelor's degree in Marketing, Business, or related field",
    ],
    perks: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Generous vacation policy",
      "Parental leave",
      "Modern equipment and tools",
    ],
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
    salary: "$110,000 - $140,000",
    experience: "3+ years",
    deadline: "August 15, 2023",
    overview:
      "We are seeking a DevOps Engineer to join our engineering team. You will be responsible for building and maintaining our infrastructure, CI/CD pipelines, and deployment processes.",
    responsibilities: [
      "Design, implement, and maintain our infrastructure",
      "Build and maintain CI/CD pipelines",
      "Automate deployment processes",
      "Monitor system performance and troubleshoot issues",
      "Implement security best practices",
      "Collaborate with development teams to improve development workflows",
    ],
    qualifications: [
      "3+ years of experience in DevOps or similar role",
      "Experience with cloud platforms such as AWS, GCP, or Azure",
      "Experience with containerization technologies such as Docker and Kubernetes",
      "Experience with infrastructure as code tools such as Terraform or CloudFormation",
      "Experience with CI/CD tools such as Jenkins, CircleCI, or GitHub Actions",
      "Strong scripting skills in languages such as Bash, Python, or Ruby",
      "Understanding of networking and security concepts",
    ],
    perks: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Generous vacation policy",
      "Parental leave",
      "Modern equipment and tools",
    ],
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
    salary: "$80,000 - $100,000",
    experience: "2+ years",
    deadline: "Position filled",
    overview:
      "We are looking for a Customer Success Manager to join our customer support team. You will be responsible for ensuring our customers are successful with our products and services.",
    responsibilities: [
      "Onboard new customers and ensure they are successful with our products",
      "Build and maintain relationships with customers",
      "Identify upsell and cross-sell opportunities",
      "Resolve customer issues and escalate when necessary",
      "Collect and analyze customer feedback",
      "Collaborate with product and engineering teams to improve our products",
    ],
    qualifications: [
      "2+ years of experience in customer success or similar role",
      "Strong communication and interpersonal skills",
      "Experience with CRM tools such as Salesforce or HubSpot",
      "Problem-solving skills and ability to work under pressure",
      "Bachelor's degree in Business, Communications, or related field",
    ],
    perks: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Generous vacation policy",
      "Parental leave",
      "Modern equipment and tools",
    ],
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
    salary: "$40 - $60 per hour",
    experience: "2+ years",
    deadline: "August 30, 2023",
    overview:
      "We are seeking a Data Analyst to join our data team on a contract basis. You will be responsible for analyzing data and providing insights to help us make data-driven decisions.",
    responsibilities: [
      "Collect, process, and analyze data from various sources",
      "Create reports and visualizations to communicate insights",
      "Identify trends and patterns in data",
      "Collaborate with product and business teams to define metrics",
      "Build and maintain dashboards",
      "Recommend improvements based on data analysis",
    ],
    qualifications: [
      "2+ years of experience in data analysis",
      "Proficiency in SQL and data analysis tools",
      "Experience with data visualization tools such as Tableau or Power BI",
      "Strong analytical and problem-solving skills",
      "Excellent communication skills",
      "Bachelor's degree in Statistics, Mathematics, Computer Science, or related field",
    ],
    perks: [
      "Competitive hourly rate",
      "Flexible work hours",
      "Remote work",
      "Professional development opportunities",
      "Access to modern tools and technologies",
    ],
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
    salary: "$110,000 - $140,000",
    experience: "3+ years",
    deadline: "July 30, 2023",
    overview:
      "We are looking for a Backend Developer to join our engineering team. You will be responsible for building and maintaining our server-side applications, APIs, and databases.",
    responsibilities: [
      "Design, build, and maintain efficient, reusable, and reliable server-side code",
      "Implement security and data protection measures",
      "Integrate data storage solutions",
      "Create and maintain APIs",
      "Collaborate with frontend developers and other team members",
      "Troubleshoot and debug issues",
    ],
    qualifications: [
      "3+ years of experience in backend development",
      "Proficiency in one or more backend languages such as Node.js, Python, Ruby, or Java",
      "Experience with databases such as MySQL, PostgreSQL, or MongoDB",
      "Experience with RESTful APIs and GraphQL",
      "Understanding of server-side templating languages",
      "Familiarity with version control systems such as Git",
      "Knowledge of security best practices",
    ],
    perks: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Generous vacation policy",
      "Parental leave",
      "Modern equipment and tools",
    ],
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
    salary: "$50 - $70 per hour",
    experience: "2+ years",
    deadline: "August 15, 2023",
    overview:
      "We are seeking a UX Researcher to join our design team on a part-time basis. You will be responsible for conducting user research to inform our product design decisions.",
    responsibilities: [
      "Plan and conduct user research studies",
      "Analyze research data and identify insights",
      "Create personas, user journeys, and other research artifacts",
      "Present research findings to stakeholders",
      "Collaborate with designers and product managers",
      "Advocate for user-centered design principles",
    ],
    qualifications: [
      "2+ years of experience in UX research",
      "Experience with various research methods such as interviews, surveys, and usability testing",
      "Strong analytical and problem-solving skills",
      "Excellent communication and presentation skills",
      "Ability to work independently and manage multiple projects",
      "Bachelor's degree in Human-Computer Interaction, Psychology, or related field",
    ],
    perks: [
      "Competitive hourly rate",
      "Flexible work hours",
      "Remote work options",
      "Professional development opportunities",
      "Access to modern tools and technologies",
    ],
  },
]

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = Number(params.id)

  // Find the job with the matching ID
  const job = jobsData.find((job) => job.id === jobId)

  // If job not found, show a message
  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-bold mb-4">Job not found</h1>
        <p className="text-muted-foreground mb-6">The job you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard/jobs")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/jobs")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <CardDescription className="text-base">{job.department}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={job.status === "Open" ? "default" : "secondary"} className="text-sm px-3 py-1">
                  {job.status}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {job.type}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{job.experience} experience</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {job.posted}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{job.applicants} applicants</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>Apply by {job.deadline}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="text-muted-foreground">{job.overview}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Qualifications</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {job.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Perks & Benefits</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {job.perks.map((perk, index) => (
                  <li key={index}>{perk}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="flex-1" size="lg" variant="outline">
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit Post
              </Button>
              <Button variant="destructive" className="flex-1" size="lg">
                <Trash2Icon className="mr-2 h-4 w-4" />
                Delete Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
