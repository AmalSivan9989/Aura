import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock,
  Sparkles,
  ArrowUpRight,
  Calendar
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "motion/react";

const kpiData = [
  {
    title: "Feedback Completion",
    value: "87%",
    change: "+12%",
    icon: CheckCircle2,
    color: "#10B981",
    trend: "up",
  },
  {
    title: "Pending Submissions",
    value: "24",
    change: "-8",
    icon: Clock,
    color: "#F59E0B",
    trend: "down",
  },
  {
    title: "Training Progress",
    value: "92%",
    change: "+5%",
    icon: TrendingUp,
    color: "#4F46E5",
    trend: "up",
  },
  {
    title: "Active Participants",
    value: "156",
    change: "+23",
    icon: Users,
    color: "#14B8A6",
    trend: "up",
  },
];

const sentimentData = [
  { name: "Positive", value: 65, color: "#10B981" },
  { name: "Neutral", value: 25, color: "#F59E0B" },
  { name: "Negative", value: 10, color: "#EF4444" },
];

const trainingTrendData = [
  { month: "Jan", feedback: 45, completion: 78 },
  { month: "Feb", feedback: 52, completion: 82 },
  { month: "Mar", feedback: 61, completion: 85 },
  { month: "Apr", feedback: 58, completion: 87 },
  { month: "May", feedback: 72, completion: 92 },
];

const recentActivities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "Submitted feedback",
    training: "Leadership Skills Workshop",
    time: "2 hours ago",
    type: "feedback",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "Completed evaluation",
    training: "Technical Training Q2",
    time: "4 hours ago",
    type: "evaluation",
  },
  {
    id: 3,
    user: "AI Assistant",
    action: "Generated insights",
    training: "Sales Training Batch 5",
    time: "5 hours ago",
    type: "ai",
  },
  {
    id: 4,
    user: "Emma Wilson",
    action: "Submitted feedback",
    training: "Customer Service Excellence",
    time: "1 day ago",
    type: "feedback",
  },
];

export function DashboardScreen() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome back, John! 👋
          </h2>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your training feedback activities
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-xl border-border shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {kpi.title}
                      </p>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {kpi.value}
                      </h3>
                      <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight
                          className={`w-4 h-4 ${
                            kpi.trend === "up" ? "text-[#10B981]" : "text-[#EF4444] rotate-90"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            kpi.trend === "up" ? "text-[#10B981]" : "text-[#EF4444]"
                          }`}
                        >
                          {kpi.change}
                        </span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${kpi.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* AI Insights Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="rounded-xl border-border shadow-sm overflow-hidden relative">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/5 via-[#7C3AED]/5 to-transparent pointer-events-none"></div>
          
          <CardHeader className="relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-gradient-to-r from-[#4F46E5]/10 to-[#7C3AED]/10 text-[#4F46E5] border-none">
                    AI-Generated Insights
                  </Badge>
                </div>
                <CardTitle>Weekly AI Summary</CardTitle>
                <CardDescription>
                  Generated using advanced AI analysis of 127 feedback submissions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-border">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                  Top Strengths
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Clear communication skills</li>
                  <li>• Strong technical knowledge</li>
                  <li>• Engaging presentation style</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white border border-border">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                  Areas for Improvement
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Time management in sessions</li>
                  <li>• More interactive activities</li>
                  <li>• Follow-up materials</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white border border-border">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4F46E5]"></div>
                  Recommendations
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Incorporate more Q&A time</li>
                  <li>• Provide detailed handouts</li>
                  <li>• Add practical exercises</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Trends */}
        <Card className="rounded-xl border-border shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Training Trends</CardTitle>
            <CardDescription>Feedback submissions and completion rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="feedback"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: "#4F46E5" }}
                  name="Feedback Count"
                />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  dot={{ fill: "#7C3AED" }}
                  name="Completion %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Distribution */}
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Overall feedback sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 mt-4">
              {sentimentData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest feedback and evaluation submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent transition-colors cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "ai"
                      ? "bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]"
                      : activity.type === "evaluation"
                      ? "bg-[#F59E0B]/10"
                      : "bg-[#10B981]/10"
                  }`}
                >
                  {activity.type === "ai" ? (
                    <Sparkles className="w-5 h-5 text-white" />
                  ) : activity.type === "evaluation" ? (
                    <CheckCircle2 className="w-5 h-5 text-[#F59E0B]" />
                  ) : (
                    <Users className="w-5 h-5 text-[#10B981]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.user}{" "}
                    <span className="text-muted-foreground font-normal">
                      {activity.action}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.training}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
