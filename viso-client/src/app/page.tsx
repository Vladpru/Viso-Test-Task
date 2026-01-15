import { Card } from "@/components/ui/card";
import { Clock, BarChart3, Calendar } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 pt-10 ">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Track Your Time Efficiently
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TimeTracker
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional time tracking solution for teams and individuals. 
            Monitor projects, analyze productivity, and optimize your workflow.
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Simple Time Tracking</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track time with one click. Start, stop, and log your hours effortlessly across multiple projects.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visualize your productivity with detailed analytics and generate comprehensive reports.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Organize time entries by projects and see where your time is being invested.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
}
