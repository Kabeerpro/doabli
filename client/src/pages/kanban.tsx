import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import FloatingActionButton from "@/components/FloatingActionButton";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import SuccessAnimation from "@/components/SuccessAnimation";
import { 
  Plus, 
  MoreHorizontal, 
  Calendar,
  User,
  AlertCircle,
  Clock,
  CheckCircle2,
  GripVertical
} from "lucide-react";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "bg-gray-100" },
  { id: "in_progress", title: "In Progress", color: "bg-blue-100" },
  { id: "completed", title: "Completed", color: "bg-green-100" }
];

const PRIORITY_COLORS = {
  low: "bg-gray-500",
  medium: "bg-yellow-500", 
  high: "bg-red-500"
};

export default function KanbanPage() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["/api/tasks"],
    enabled: !!user,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["/api/projects"],
    enabled: !!user,
  });

  // Show onboarding for completely new users
  useEffect(() => {
    if (user && projects.length === 0 && tasks.length === 0) {
      const hasSeenOnboarding = localStorage.getItem('doabli-onboarding-completed');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [user, projects, tasks]);

  const createTaskMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/tasks", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setNewTaskTitle("");
      setActiveColumn(null);
      setSuccessMessage("Task created!");
      setShowSuccess(true);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, ...data }: any) => apiRequest(`/api/tasks/${id}`, "PATCH", data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      if (variables.status === "completed") {
        setSuccessMessage("Task completed!");
        setShowSuccess(true);
      }
    },
  });

  const handleCreateTask = (status: string) => {
    if (!newTaskTitle.trim()) return;
    
    createTaskMutation.mutate({
      title: newTaskTitle.trim(),
      status,
      priority: "medium"
    });
  };

  const handleMoveTask = (taskId: number, newStatus: string) => {
    updateTaskMutation.mutate({ id: taskId, status: newStatus });
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('doabli-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  const handleFloatingActionClick = () => {
    setActiveColumn("todo");
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task: any) => task.status === status);
  };

  const [draggedTask, setDraggedTask] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("taskId", taskId.toString());
    setDraggedTask(taskId);
    // Add visual feedback
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    handleMoveTask(taskId, status);
    setDraggedTask(null);
    setDragOverColumn(null);
    
    // Remove visual feedback
    document.querySelectorAll('[draggable="true"]').forEach(el => {
      el.classList.remove("opacity-50");
    });
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
    // Remove visual feedback
    document.querySelectorAll('[draggable="true"]').forEach(el => {
      el.classList.remove("opacity-50");
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold mb-2">Task Board</h1>
          <p className="text-gray-600 text-sm md:text-base">Drag tasks between columns to update their status</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {COLUMNS.map((column) => (
          <div
            key={column.id}
            className={`bg-white rounded-lg border shadow-sm transition-all duration-200 ${
              dragOverColumn === column.id ? "ring-2 ring-primary ring-opacity-50 bg-blue-50" : ""
            }`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className={`p-4 border-b ${column.color} rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {getTasksByStatus(column.id).length}
                </Badge>
              </div>
            </div>

            {/* Tasks */}
            <div className="p-3 md:p-4 space-y-3 min-h-[300px] md:min-h-[400px]">
              {getTasksByStatus(column.id).map((task: any) => (
                <Card
                  key={task.id}
                  className={`cursor-move hover:shadow-md transition-all duration-200 group ${
                    draggedTask === task.id ? "opacity-50 scale-95" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2 flex-1">
                          <GripVertical className="w-4 h-4 text-gray-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <h4 className="font-medium text-sm line-clamp-2 flex-1">
                            {task.title}
                          </h4>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Task options</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {task.description && (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {task.priority && (
                            <div className="flex items-center space-x-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  PRIORITY_COLORS[task.priority as keyof typeof PRIORITY_COLORS]
                                }`}
                              />
                              <span className="text-xs capitalize text-gray-500">
                                {task.priority}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          {task.dueDate && (
                            <>
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {task.assignedTo && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          <span>{task.assignedTo.firstName || 'Assigned'}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Task - Simplified */}
              {activeColumn === column.id ? (
                <div className="border-dashed border-2 border-gray-300 rounded-lg p-3 bg-gray-50">
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="mb-3 border-0 bg-white shadow-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateTask(column.id);
                      }
                      if (e.key === 'Escape') {
                        setActiveColumn(null);
                        setNewTaskTitle("");
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleCreateTask(column.id)}
                      disabled={createTaskMutation.isPending || !newTaskTitle.trim()}
                      className="bg-primary hover:bg-primary/90 text-xs px-3 py-1"
                    >
                      {createTaskMutation.isPending ? "Adding..." : "Add"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setActiveColumn(null);
                        setNewTaskTitle("");
                      }}
                      className="text-xs px-3 py-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full border-dashed border-2 border-gray-300 h-10 md:h-12 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all"
                      onClick={() => setActiveColumn(column.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="text-sm">Add task</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to create a new task in {column.title}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        ))}
      </div>

        {/* Mobile FAB */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <FloatingActionButton 
                onCreateTask={handleFloatingActionClick}
                className="md:hidden"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create new task</p>
          </TooltipContent>
        </Tooltip>

        <OnboardingModal
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
        />

        <SuccessAnimation
          show={showSuccess}
          message={successMessage}
          onComplete={() => setShowSuccess(false)}
        />
      </div>
    </TooltipProvider>
  );
}