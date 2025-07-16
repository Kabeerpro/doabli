import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import TaskCard from "./task-card";
import TaskModal from "./task-modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useEffect } from "react";

interface KanbanBoardProps {
  projectId?: number;
}

export default function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { lastMessage } = useWebSocket();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["/api/tasks", { projectId }],
    queryFn: async () => {
      const response = await fetch(`/api/tasks${projectId ? `?projectId=${projectId}` : ''}`);
      return response.json();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, position, status }: { taskId: number; position: number; status: string }) => {
      return apiRequest("PUT", `/api/tasks/${taskId}/position`, { position, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      const { type, data } = lastMessage;
      
      if (type === 'task_created' || type === 'task_updated' || type === 'task_moved' || type === 'task_deleted') {
        queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      }
    }
  }, [lastMessage, queryClient]);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-400' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-500' },
    { id: 'review', title: 'Review', color: 'bg-purple-500' },
    { id: 'done', title: 'Done', color: 'bg-green-500' },
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task: any) => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, task: any) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    
    if (draggedTask && draggedTask.status !== status) {
      const tasksInColumn = getTasksByStatus(status);
      const position = tasksInColumn.length;
      
      updateTaskMutation.mutate({
        taskId: draggedTask.id,
        position,
        status,
      });
    }
    
    setDraggedTask(null);
  };

  const handleNewTask = (status: string) => {
    setSelectedTask({ status, projectId });
    setIsTaskModalOpen(true);
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="flex space-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-24 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Project Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {columns.map((column) => {
              const columnTasks = getTasksByStatus(column.id);
              
              return (
                <div key={column.id} className="flex-shrink-0 w-80">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {column.title}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {columnTasks.length}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNewTask(column.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div
                    className="space-y-3 min-h-[200px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.id)}
                  >
                    {columnTasks.map((task: any) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => handleTaskClick(task)}
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={() => setDraggedTask(null)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        projectId={projectId}
      />
    </>
  );
}
