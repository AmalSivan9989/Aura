import { useState, useEffect } from "react";
import { api } from "../utils/api";

interface TrainerData {
  ai_insights: {
    strengths: Array<{ title: string; desc: string }>;
    improvements: Array<{ title: string; desc: string }>;
    recommendations: Array<{ title: string; desc: string }>;
  };
  radar: Array<{ category: string; value: number }>;
  skills: Array<{ skill: string; score: number; maxScore: number }>;
  sentiment_breakdown: Array<{ aspect: string; positive: number; neutral: number; negative: number }>;
  trends: Array<{ month: string; rating: number; confidence: number }>;
}

export function TrainerInsightsScreen() {
  const [data, setData] = useState<TrainerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const userString = localStorage.getItem("user");
        const currentUser = userString ? JSON.parse(userString) : { id: "2" }; // Default seed trainer Sarah Mitchell has ID 2
        // Use currentUser.id if they are a trainer, else fall back to trainer ID 2
        const trainerId = currentUser.role === "trainer" ? currentUser.id : "2";
        
        const response = await api.get<TrainerData>(`/insights/trainer/${trainerId}`);
        setData(response);
      } catch (err: any) {
        setError(err.message || "Failed to load trainer insights");
      } finally {
        setLoading(false);
      }
    }
    fetchInsights();
  }, []);

  if (loading) {
    return <div className="p-6">Loading live trainer analytics...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!data) return null;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            AI-Powered Trainer Insights
          </h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive analysis based on live feedback database records
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
              {data.ai_insights?.strengths?.map((str, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {str.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {str.desc}
                    </p>
                  </div>
                </div>
              ))}
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
              {data.ai_insights?.improvements?.map((imp, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {imp.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {imp.desc}
                    </p>
                  </div>
                </div>
              ))}
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
              {data.ai_insights?.recommendations?.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[#4F46E5] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {rec.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {rec.desc}
                    </p>
                  </div>
                </div>
              ))}
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
                {data.skills.map((skill) => (
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
                  <RadarChart data={data.radar}>
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
              {data.sentiment_breakdown.map((item) => (
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
                <LineChart data={data.trends}>
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

const placeholderTrainerInsightsScreen = () => {
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
