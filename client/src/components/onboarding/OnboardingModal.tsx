import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  CheckCircle, 
  ArrowRight, 
  Zap,
  Users,
  Target
} from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("My First Project");
  const [firstTask, setFirstTask] = useState("Welcome to Doabli!");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const setupMutation = useMutation({
    mutationFn: async (data: any) => {
      // Create default project
      const project = await apiRequest("/api/projects", "POST", {
        name: data.projectName,
        description: "Your first project to get started with Doabli",
        color: "#3b82f6"
      });

      // Create welcome task
      await apiRequest("/api/tasks", "POST", {
        title: data.firstTask,
        description: "Complete this task to learn the basics of task management",
        status: "todo",
        priority: "medium",
        projectId: project.id
      });

      return project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Welcome to Doabli!",
        description: "Your workspace is ready. Let's start managing tasks!",
      });
      onComplete();
    },
    onError: (error: any) => {
      toast({
        title: "Setup Error",
        description: error.message || "Failed to set up your workspace",
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setupMutation.mutate({ projectName, firstTask });
    }
  };

  const handleSkip = () => {
    setupMutation.mutate({ 
      projectName: "My First Project", 
      firstTask: "Get started with Doabli" 
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Doabli!</h2>
              <p className="text-gray-600">
                Your simple task management solution. We'll show you the three core actions 
                you need to get started.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-left p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <div className="font-medium">Create Tasks</div>
                  <div className="text-sm text-gray-600">Click + to add new tasks</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-left p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <div className="font-medium">Move Tasks</div>
                  <div className="text-sm text-gray-600">Drag between To Do, In Progress, Complete</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-left p-3 bg-purple-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <div className="font-medium">Stay Organized</div>
                  <div className="text-sm text-gray-600">Watch your progress in real-time</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Create Your First Project</h2>
              <p className="text-gray-600">
                Projects help you organize related tasks together.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name</label>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Website Redesign, Marketing Campaign"
                  className="text-center"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Add Your First Task</h2>
              <p className="text-gray-600">
                Tasks are the building blocks of your projects.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Task Title</label>
                <Input
                  value={firstTask}
                  onChange={(e) => setFirstTask(e.target.value)}
                  placeholder="e.g., Research competitors, Design homepage"
                  className="text-center"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-sm text-gray-500">
              Step {step} of 3
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600"
            >
              Skip setup
            </Button>
          </div>
        </DialogHeader>

        <div className="py-6">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <div className="flex space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i <= step ? "bg-primary" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            disabled={setupMutation.isPending}
            className="bg-primary hover:bg-primary/90"
          >
            {step === 3 ? (
              setupMutation.isPending ? "Setting up..." : "Complete Setup"
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}