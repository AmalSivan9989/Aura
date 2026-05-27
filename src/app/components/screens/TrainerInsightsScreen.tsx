import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  Lightbulb,
  Target,
  Users,
  Star,
  Info
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "motion/react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const skillsData = [
  { skill: "Communication", score: 4.5, maxScore: 5 },
  { skill: "Technical Knowledge", score: 4.8, maxScore: 5 },
  { skill: "Engagement", score: 4.2, maxScore: 5 },
  { skill: "Time Management", score: 3.8, maxScore: 5 },
  { skill: "Materials Quality", score: 4.6, maxScore: 5 },
  { skill: "Responsiveness", score: 4.4, maxScore: 5 },
];

const trendData = [
  { month: "Jan", rating: 4.2, confidence: 85 },
  { month: "Feb", rating: 4.3, confidence: 87 },
  { month: "Mar", rating: 4.5, confidence: 89 },
  { month: "Apr", rating: 4.4, confidence: 88 },
  { month: "May", rating: 4.6, confidence: 92 },
];

const radarData = [
  { category: "Content", value: 4.5 },
  { category: "Delivery", value: 4.3 },
  { category: "Materials", value: 4.6 },
  { category: "Engagement", value: 4.2 },
  { category: "Organization", value: 4.4 },
  { category: "Follow-up", value: 3.9 },
];

const sentimentBreakdown = [
  { aspect: "Presentation Style", positive: 92, neutral: 6, negative: 2 },
  { aspect: "Content Depth", positive: 88, neutral: 10, negative: 2 },
  { aspect: "Practical Examples", positive: 85, neutral: 12, negative: 3 },
  { aspect: "Session Pace", positive: 78, neutral: 18, negative: 4 },
];

export function TrainerInsightsScreen() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            AI-Powered Trainer Insights
          </h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive analysis based on 248 feedback submissions
          </p>
        </div>
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger asChild>
              <button className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors">
                <Info className="w-4 h-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">AI insights are generated using advanced<br />natural language processing and sentiment analysis</p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
      </div>

      {/* AI Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-xl border-border shadow-sm h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#10B981]/10 to-transparent rounded-bl-full"></div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                </div>
                <Badge variant="secondary" className="bg-[#10B981]/10 text-[#10B981] border-none">
                  AI-Generated
                </Badge>
              </div>
              <CardTitle className="text-[#10B981]">Top Strengths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Exceptional Technical Expertise
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    93% of participants praised deep subject knowledge
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Clear Communication
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Consistently mentioned as easy to understand
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    High-Quality Materials
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Well-structured presentations and resources
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Improvement Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-xl border-border shadow-sm h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F59E0B]/10 to-transparent rounded-bl-full"></div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <Badge variant="secondary" className="bg-[#F59E0B]/10 text-[#F59E0B] border-none">
                  AI-Generated
                </Badge>
              </div>
              <CardTitle className="text-[#F59E0B]">Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Time Management
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    22% noted sessions sometimes run over time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Interactive Activities
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Participants want more hands-on exercises
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Follow-up Resources
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Request for post-training materials and summaries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-xl border-border shadow-sm h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4F46E5]/10 via-[#7C3AED]/10 to-transparent rounded-bl-full"></div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <Badge variant="secondary" className="bg-gradient-to-r from-[#4F46E5]/10 to-[#7C3AED]/10 text-[#4F46E5] border-none">
                  AI-Generated
                </Badge>
              </div>
              <CardTitle className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                Smart Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-[#4F46E5] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Add Q&A Buffer Time
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Allocate 15-20 minutes for questions at the end
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-[#4F46E5] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Include Case Studies
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Incorporate 2-3 real-world examples per session
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-[#4F46E5] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Provide Resource Library
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Create a shared folder with supplementary materials
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="bg-accent rounded-xl p-1">
          <TabsTrigger value="performance" className="rounded-lg">
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="rounded-lg">
            Sentiment Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg">
            Trends & Patterns
          </TabsTrigger>
        </TabsList>

        {/* Performance Metrics Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills Breakdown */}
            <Card className="rounded-xl border-border shadow-sm">
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Average ratings across key competencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillsData.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {skill.skill}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {skill.score}/{skill.maxScore}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={(skill.score / skill.maxScore) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Radar Chart */}
            <Card className="rounded-xl border-border shadow-sm">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Multidimensional skill analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: "#6B7280", fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "#6B7280", fontSize: 12 }} />
                    <Radar
                      name="Rating"
                      dataKey="value"
                      stroke="#4F46E5"
                      fill="#4F46E5"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sentiment Analysis Tab */}
        <TabsContent value="sentiment" className="space-y-6">
          <Card className="rounded-xl border-border shadow-sm">
            <CardHeader>
              <CardTitle>Sentiment Breakdown by Aspect</CardTitle>
              <CardDescription>Detailed sentiment analysis across different training aspects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {sentimentBreakdown.map((item) => (
                <div key={item.aspect} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {item.aspect}
                    </span>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[#10B981]">{item.positive}% Positive</span>
                      <span className="text-[#F59E0B]">{item.neutral}% Neutral</span>
                      <span className="text-[#EF4444]">{item.negative}% Negative</span>
                    </div>
                  </div>
                  <div className="flex h-3 rounded-lg overflow-hidden">
                    <div
                      className="bg-[#10B981]"
                      style={{ width: `${item.positive}%` }}
                    ></div>
                    <div
                      className="bg-[#F59E0B]"
                      style={{ width: `${item.neutral}%` }}
                    ></div>
                    <div
                      className="bg-[#EF4444]"
                      style={{ width: `${item.negative}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="rounded-xl border-border shadow-sm">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Rating evolution and AI confidence levels over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} domain={[0, 5]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="rating"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ fill: "#4F46E5", r: 5 }}
                    name="Average Rating"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="confidence"
                    stroke="#7C3AED"
                    strokeWidth={3}
                    dot={{ fill: "#7C3AED", r: 5 }}
                    name="AI Confidence %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
