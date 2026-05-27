import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Progress } from "../ui/progress";
import { api } from "../utils/api";
import { 
  Search, 
  Filter,
  Download,
  Send,
  Settings2,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { motion } from "motion/react";
import { toast } from "sonner";



interface Training {
  id: number;
  name: string;
  trainer: string;
  batch: string;
  startDate: string;
  endDate: string;
  participants: number;
  completed: number;
  pending: number;
  status: string;
}







const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
    case "active":
      return "bg-[#4F46E5]/10 text-[#4F46E5] border-[#4F46E5]/20";
    case "upcoming":
      return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-4 h-4" />;
    case "active":
      return <Clock className="w-4 h-4" />;
    case "upcoming":
      return <Calendar className="w-4 h-4" />;
    default:
      return null;
  }
};

export function AdminPanelScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trainings from API
  useEffect(() => {
    async function fetchTrainings() {
      try {
        const data = await api.get<Training[]>("/trainings");
        setTrainings(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrainings();
  }, []);

  // Loading and error UI
  if (loading) {
    return <div className="p-6">Loading trainings...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch = training.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.trainer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || training.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendReminder = async (programId: number) => {
    try {
      const response = await api.post<{ message: string }>(`/programs/${programId}/reminder`, {});
      toast.success(response.message || "Reminder sent successfully!");
    } catch (e: any) {
      toast.error(e.message || "Failed to send reminder.");
    }
  };

  const handleSendReminderToAllPending = async () => {
    // For bulk actions, trigger reminder for all active programs that have pending feedback
    const activePrograms = trainings.filter(t => t.status === "active" && t.pending > 0);
    if (activePrograms.length === 0) {
      toast.info("No active programs with pending feedback.");
      return;
    }
    
    let successCount = 0;
    for (const prog of activePrograms) {
      try {
        await api.post(`/programs/${prog.id}/reminder`, {});
        successCount++;
      } catch (e) {
        console.error(`Failed to send reminder for program ${prog.id}`, e);
      }
    }
    toast.success(`Dispatched reminders for ${successCount} programs!`);
  };

  const handleExport = () => {
    // Export live data in JSON format dynamically
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trainings, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "training_programs_report.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success("Export started! Download will begin shortly.");
    } catch (e: any) {
      toast.error("Failed to export data.");
    }
  };


  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Admin Panel
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage training programs, track feedback, and monitor completion
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="rounded-xl h-10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-xl h-10 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 transition-opacity">
                <Settings2 className="w-4 h-4 mr-2" />
                Bulk Actions
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Bulk Actions</DialogTitle>
                <DialogDescription>
                  Perform actions on multiple training programs
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl"
                  onClick={handleSendReminderToAllPending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Reminder to All Pending
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Set Deadline for All Active
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export All Reports
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-xl border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Programs
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {trainings.length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#4F46E5]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-xl border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Active Training
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {trainings.filter(t => t.status === "active").length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-xl border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Participants
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {trainings.reduce((sum, t) => sum + t.participants, 0)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                  <Send className="w-6 h-6 text-[#14B8A6]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-xl border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Pending Feedback
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {trainings.reduce((sum, t) => sum + t.pending, 0)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by training name or trainer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl h-11"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-xl h-11">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Training Programs Table */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>
            Overview of all training programs and feedback status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Training Name</TableHead>
                  <TableHead>Trainer</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrainings.map((training) => {
                  const completionPercentage = (training.completed / training.participants) * 100;
                  return (
                    <TableRow key={training.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {training.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {training.participants} participants
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground">{training.trainer}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {training.batch}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-foreground">
                            {new Date(training.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                          <p className="text-muted-foreground">
                            to {new Date(training.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2 min-w-[180px]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-foreground font-medium">
                              {training.completed}/{training.participants}
                            </span>
                            <span className="text-muted-foreground">
                              {completionPercentage.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={completionPercentage} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(training.status)}>
                          <span className="mr-1">{getStatusIcon(training.status)}</span>
                          {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => setSelectedTraining(training)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendReminder(training.id)}>
                              <Send className="w-4 h-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="w-4 h-4 mr-2" />
                              Set Deadline
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleExport}>
                              <Download className="w-4 h-4 mr-2" />
                              Export Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Training Details Dialog */}
      <Dialog open={!!selectedTraining} onOpenChange={() => setSelectedTraining(null)}>
        <DialogContent className="rounded-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTraining?.name}</DialogTitle>
            <DialogDescription>
              Training program details and feedback status
            </DialogDescription>
          </DialogHeader>
          {selectedTraining && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Trainer</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedTraining.trainer}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Batch</p>
                  <Badge variant="outline">{selectedTraining.batch}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(selectedTraining.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">End Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(selectedTraining.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-accent space-y-3">
                <h4 className="font-medium text-foreground">Feedback Status</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl font-semibold text-foreground">
                      {selectedTraining.participants}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Participants</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#10B981]">
                      {selectedTraining.completed}
                    </p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#F59E0B]">
                      {selectedTraining.pending}
                    </p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
                <Progress 
                  value={(selectedTraining.completed / selectedTraining.participants) * 100} 
                  className="h-2 mt-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTraining(null)} className="rounded-xl">
              Close
            </Button>
            <Button 
              onClick={() => {
                if (selectedTraining) {
                  handleSendReminder(selectedTraining.id);
                }
              }}
              className="rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
