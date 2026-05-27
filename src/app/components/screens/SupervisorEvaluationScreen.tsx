import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { CheckCircle2, XCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const trainees = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Sales Associate",
    department: "Sales",
    training: "Advanced Sales Techniques",
    completionDate: "May 20, 2026",
  },
  {
    id: 2,
    name: "Jamie Martinez",
    role: "Customer Support",
    department: "Support",
    training: "Customer Service Excellence",
    completionDate: "May 22, 2026",
  },
];

export function SupervisorEvaluationScreen() {
  const [selectedTrainee, setSelectedTrainee] = useState(trainees[0]);
  const [readiness, setReadiness] = useState("ready");
  const [effectiveness, setEffectiveness] = useState("effective");
  const [canApply, setCanApply] = useState(true);
  const [needsSupport, setNeedsSupport] = useState(false);
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    toast.success("Evaluation submitted successfully!");
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Supervisor Evaluation
        </h2>
        <p className="text-muted-foreground mt-1">
          Evaluate trainee readiness and training effectiveness
        </p>
      </div>

      {/* Trainee Selection */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Select Trainee</CardTitle>
          <CardDescription>Choose a trainee to evaluate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainees.map((trainee) => (
              <motion.div
                key={trainee.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTrainee(trainee)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTrainee.id === trainee.id
                    ? "border-primary bg-accent"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {trainee.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {trainee.role} • {trainee.department}
                    </p>
                  </div>
                  {selectedTrainee.id === trainee.id && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">
                    {trainee.training}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Completed: {trainee.completionDate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Evaluation for {selectedTrainee.name}</CardTitle>
            <CardDescription>
              {selectedTrainee.training} - Completed on {selectedTrainee.completionDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Readiness Assessment */}
            <div className="space-y-3">
              <Label className="text-base">
                Is the trainee ready to apply what they learned?
              </Label>
              <RadioGroup value={readiness} onValueChange={setReadiness}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="ready" id="ready" />
                    <Label htmlFor="ready" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        <span className="font-medium">Yes, Ready</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Can immediately apply the training in their role
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="partially" id="partially" />
                    <Label htmlFor="partially" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-[#F59E0B] bg-[#F59E0B]/20"></div>
                        <span className="font-medium">Partially Ready</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Needs some additional support or practice
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="not-ready" id="not-ready" />
                    <Label htmlFor="not-ready" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-[#EF4444]" />
                        <span className="font-medium">Not Yet Ready</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Requires additional training or resources
                      </p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Effectiveness Rating */}
            <div className="space-y-3">
              <Label className="text-base">
                How effective was the training?
              </Label>
              <RadioGroup value={effectiveness} onValueChange={setEffectiveness}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="effective" id="effective" />
                    <Label htmlFor="effective" className="cursor-pointer">
                      <div className="font-medium text-[#10B981]">Highly Effective</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Excellent results
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="cursor-pointer">
                      <div className="font-medium text-[#F59E0B]">Moderately Effective</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Good results
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="limited" id="limited" />
                    <Label htmlFor="limited" className="cursor-pointer">
                      <div className="font-medium text-[#EF4444]">Limited Effectiveness</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Needs improvement
                      </p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Quick Toggles */}
            <div className="space-y-4 p-4 rounded-xl bg-accent">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Can apply skills immediately</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Trainee demonstrates ability to use new skills
                  </p>
                </div>
                <Switch checked={canApply} onCheckedChange={setCanApply} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Needs additional support</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Requires mentoring or follow-up sessions
                  </p>
                </div>
                <Switch checked={needsSupport} onCheckedChange={setNeedsSupport} />
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-base">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="comments"
                placeholder="Share specific observations, examples, or recommendations..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[120px] rounded-xl resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Provide context to help improve training programs
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="rounded-xl h-11 px-8 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Evaluation
        </Button>
      </div>
    </div>
  );
}
