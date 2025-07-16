import { useState } from "react";
import Header from "@/components/header";
import StatsCards from "@/components/stats-cards";
import KanbanBoard from "@/components/kanban-board";
import RecentActivity from "@/components/recent-activity";
import QuickActions from "@/components/quick-actions";
import TaskModal from "@/components/task-modal";

export default function Dashboard() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleNewTask = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
  };

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
    </div>
  );
}
