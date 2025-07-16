import { useState } from "react";
import Header from "@/components/header";
import TaskModal from "@/components/task-modal";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { format, isSameDay, parseISO } from "date-fns";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const { user } = useAuth();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["/api/tasks", { userId: user?.id }],
    queryFn: async () => {
      const response = await fetch(`/api/tasks?userId=${user?.id}`);
      return response.json();
    },
    enabled: !!user,
  });

  const handleNewTask = () => {
    setSelectedTask(null);
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

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task: any) => {
      if (!task.dueDate) return false;
      return isSameDay(parseISO(task.dueDate), date);
    });
  };

  const getTasksForSelectedDate = () => {
    if (!selectedDate) return [];
    return getTasksForDate(selectedDate);
  };

  const getDatesWithTasks = () => {
    const dates: Date[] = [];
    tasks.forEach((task: any) => {
      if (task.dueDate) {
        dates.push(parseISO(task.dueDate));
      }
    });
    return dates;
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Calendar" onNewTask={handleNewTask} />
        <main className="flex-1 overflow-auto p-6">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Calendar" onNewTask={handleNewTask} />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    hasTask: getDatesWithTasks(),
                  }}
                  modifiersClassNames={{
                    hasTask: "bg-primary/10 text-primary font-medium",
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Tasks for Selected Date */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  Tasks for {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Today"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getTasksForSelectedDate().length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">
                      No tasks scheduled for this date.
                    </p>
                  ) : (
                    getTasksForSelectedDate().map((task: any) => (
                      <div
                        key={task.id}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900">
                            {task.title}
                          </h4>
                          <Badge
                            variant="secondary"
                            className={priorityColors[task.priority as keyof typeof priorityColors]}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        
                        {task.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {task.status === 'todo' ? 'To Do' :
                             task.status === 'in-progress' ? 'In Progress' :
                             task.status === 'review' ? 'Review' :
                             task.status === 'done' ? 'Done' : task.status}
                          </Badge>
                          
                          {task.dueDate && (
                            <span className="text-xs text-gray-500">
                              Due: {format(parseISO(task.dueDate), "MMM d")}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks
                    .filter((task: any) => task.dueDate && new Date(task.dueDate) > new Date())
                    .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .slice(0, 5)
                    .map((task: any) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(parseISO(task.dueDate), "MMM d, yyyy")}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={priorityColors[task.priority as keyof typeof priorityColors]}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
      />
    </div>
  );
}
