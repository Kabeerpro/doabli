import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import Header from "@/components/header";
import StatsCards from "@/components/stats-cards";
import KanbanBoard from "@/components/kanban-board";
import RecentActivity from "@/components/recent-activity";
import QuickActions from "@/components/quick-actions";
import TaskModal from "@/components/task-modal";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckSquare } from "lucide-react";

export default function Dashboard() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user } = useAuth();

  const { data: projects = [] } = useQuery({
    queryKey: ["/api/projects"],
    enabled: !!user,
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["/api/tasks"],
    enabled: !!user,
  });

  // Show onboarding for new users
  useEffect(() => {
    if (user && projects.length === 0 && tasks.length === 0) {
      const hasSeenOnboarding = localStorage.getItem('doabli-onboarding-completed');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [user, projects, tasks]);

  const handleNewTask = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('doabli-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  // Simple welcome screen for new users
  if (user && projects.length === 0 && tasks.length === 0 && !showOnboarding) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Welcome to Doabli" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto text-center py-12">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Ready to get organized?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600">
                  Start by creating your first project or jump straight into task management.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setShowOnboarding(true)}
                    className="bg-primary hover:bg-primary/90 p-6 h-auto flex-col"
                  >
                    <div className="text-lg font-semibold mb-2">Quick Setup</div>
                    <div className="text-sm opacity-90">3-step guided setup</div>
                  </Button>
                  
                  <Link href="/kanban">
                    <Button 
                      variant="outline"
                      className="w-full p-6 h-auto flex-col"
                    >
                      <CheckSquare className="w-6 h-6 mb-2" />
                      <div className="text-lg font-semibold mb-2">Task Board</div>
                      <div className="text-sm opacity-70">Start with Kanban</div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <OnboardingModal
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        title="Dashboard" 
        onNewTask={handleNewTask}
      />
      
      <main className="flex-1 overflow-auto p-6">
        <StatsCards />
        
        <div className="mb-8">
          <KanbanBoard />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          
          <div>
            <QuickActions onNewTask={handleNewTask} />
          </div>
        </div>
      </main>
      
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}
