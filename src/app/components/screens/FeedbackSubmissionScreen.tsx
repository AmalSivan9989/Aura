import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Save, Send, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { api } from "../utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PendingProgram {
  enrollment_id: number;
  program_id: number;
  program_name: string;
  trainer_name: string;
  batch: string;
  start_date: string;
  end_date: string;
  status: string;
}

const ratingCategories = [
  { id: "content", label: "Content Quality", description: "Relevance and depth of material" },
  { id: "delivery", label: "Delivery Style", description: "Presentation and engagement" },
  { id: "materials", label: "Training Materials", description: "Quality of resources provided" },
  { id: "pace", label: "Session Pace", description: "Speed and flow of training" },
  { id: "interaction", label: "Interaction Level", description: "Q&A and participation" },
];

export function FeedbackSubmissionScreen() {
  const [ratings, setRatings] = useState<Record<string, number>>({
    content: 4,
    delivery: 4,
    materials: 3,
    pace: 4,
    interaction: 5,
  });
  const [pendingPrograms, setPendingPrograms] = useState<PendingProgram[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [general, setGeneral] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPending() {
      try {
        const response = await api.get<PendingProgram[]>("/feedback/pending");
        setPendingPrograms(response);
        if (response.length > 0) {
          setSelectedProgramId(String(response[0].program_id));
        }
      } catch (err: any) {
        setError(err.message || "Failed to load pending courses");
      } finally {
        setLoading(false);
      }
    }
    fetchPending();
  }, []);

  const handleRatingChange = (category: string, value: number[]) => {
    setRatings({ ...ratings, [category]: value[0] });
  };

  const handleSaveDraft = async () => {
    if (!selectedProgramId) {
      toast.error("Please select a training program first.");
      return;
    }
    try {
      await api.post("/feedback", {
        program_id: Number(selectedProgramId),
        rating_content: ratings.content,
        rating_delivery: ratings.delivery,
        rating_materials: ratings.materials,
        rating_pace: ratings.pace,
        rating_interaction: ratings.interaction,
        strengths,
        improvements,
        general,
        is_anonymous: isAnonymous,
        is_draft: true,
      });
      toast.success("Draft saved successfully!");
    } catch (e: any) {
      toast.error(e.message || "Failed to save draft.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedProgramId) {
      toast.error("Please select a training program first.");
      return;
    }
    try {
      await api.post("/feedback", {
        program_id: Number(selectedProgramId),
        rating_content: ratings.content,
        rating_delivery: ratings.delivery,
        rating_materials: ratings.materials,
        rating_pace: ratings.pace,
        rating_interaction: ratings.interaction,
        strengths,
        improvements,
        general,
        is_anonymous: isAnonymous,
        is_draft: false,
      });
      toast.success("Feedback submitted successfully!");
      // Filter out the submitted program
      setPendingPrograms(pendingPrograms.filter(p => String(p.program_id) !== selectedProgramId));
      if (pendingPrograms.length > 1) {
        const remaining = pendingPrograms.filter(p => String(p.program_id) !== selectedProgramId);
        setSelectedProgramId(String(remaining[0].program_id));
      } else {
        setSelectedProgramId("");
      }
      setStrengths("");
      setImprovements("");
      setGeneral("");
    } catch (e: any) {
      toast.error(e.message || "Failed to submit feedback.");
    }
  };

  const averageRating = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length;

  if (loading) {
    return <div className="p-6">Loading active training details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (pendingPrograms.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Submit Training Feedback</h2>
        <Card className="rounded-xl border-border shadow-sm p-8 text-center text-muted-foreground">
          You do not have any pending training programs to evaluate at this time. 🎉
        </Card>
      </div>
    );
  }

  const selectedProg = pendingPrograms.find(p => String(p.program_id) === selectedProgramId);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Submit Training Feedback
        </h2>
        <p className="text-muted-foreground mt-1">
          Share your experience and help improve future training sessions
        </p>
      </div>

      {/* Program Selector */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Select Training Program</CardTitle>
          <CardDescription>Select which course you are providing feedback for</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedProgramId} onValueChange={setSelectedProgramId}>
            <SelectTrigger className="w-full rounded-xl h-11">
              <SelectValue placeholder="Choose a training program" />
            </SelectTrigger>
            <SelectContent>
              {pendingPrograms.map((p) => (
                <SelectItem key={p.program_id} value={String(p.program_id)}>
                  {p.program_name} ({p.batch})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Training Details */}
      {selectedProg && (
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedProg.program_name}</CardTitle>
                <CardDescription className="mt-2">
                  Trainer: {selectedProg.trainer_name} • Batch: {selectedProg.batch} • Period: {new Date(selectedProg.start_date).toLocaleDateString()} to {new Date(selectedProg.end_date).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">
                {selectedProg.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Rating Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Rate Your Experience</CardTitle>
            <CardDescription>
              Please rate each aspect of the training on a scale of 1-5
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {ratingCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Label className="text-base">{category.label}</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-accent px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="font-semibold text-foreground">
                      {ratings[category.id]}/5
                    </span>
                  </div>
                </div>
                <Slider
                  value={[ratings[category.id]]}
                  onValueChange={(value) => handleRatingChange(category.id, value)}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </motion.div>
            ))}

            {/* Overall Rating Display */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Overall Rating
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average across all categories
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? "text-[#F59E0B] fill-[#F59E0B]"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="text-xl font-semibold text-foreground ml-2">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Open Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Additional Feedback</CardTitle>
            <CardDescription>
              Share specific comments, suggestions, or observations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="strengths">What did you like most?</Label>
              <Textarea
                id="strengths"
                placeholder="Describe the strongest aspects of this training session..."
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                className="min-h-[100px] rounded-xl resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="improvements">What could be improved?</Label>
              <Textarea
                id="improvements"
                placeholder="Share your suggestions for improvement..."
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                className="min-h-[100px] rounded-xl resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="general">General Comments</Label>
              <Textarea
                id="general"
                placeholder="Any other thoughts or feedback..."
                value={general}
                onChange={(e) => setGeneral(e.target.value)}
                className="min-h-[120px] rounded-xl resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {general.length} / 1000 characters
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          className="rounded-xl h-11"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button
          onClick={handleSubmit}
          className="rounded-xl h-11 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Feedback
        </Button>
      </div>
    </div>
  );
}
