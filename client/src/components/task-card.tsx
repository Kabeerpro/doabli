import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Paperclip, MessageSquare, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description?: string;
    status: string;
    priority: string;
    dueDate?: string;
    assignee?: {
      id: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      profileImageUrl?: string;
    };
    attachmentCount?: number;
    commentCount?: number;
    progress?: number;
  };
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export default function TaskCard({ 
  task, 
  onClick, 
  draggable = true,
  onDragStart,
  onDragEnd
}: TaskCardProps) {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    review: "bg-purple-100 text-purple-800",
    done: "bg-green-100 text-green-800",
  };

  const getInitials = (firstName?: string, lastName?: string, email?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <Card 
      className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h5 className="text-sm font-medium text-gray-900 line-clamp-2">
            {task.title}
          </h5>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
        
        {task.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {task.progress !== undefined && task.progress > 0 && (
          <div className="mb-3">
            <Progress value={task.progress} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className={priorityColors[task.priority as keyof typeof priorityColors]}
            >
              {task.priority}
            </Badge>
            
            {task.dueDate && (
              <div className={`flex items-center space-x-1 text-xs ${
                isOverdue ? 'text-red-600' : 'text-gray-500'
              }`}>
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(task.dueDate), 'MMM d')}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {task.attachmentCount && task.attachmentCount > 0 && (
                <div className="flex items-center space-x-1">
                  <Paperclip className="w-3 h-3" />
                  <span>{task.attachmentCount}</span>
                </div>
              )}
              
              {task.commentCount && task.commentCount > 0 && (
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{task.commentCount}</span>
                </div>
              )}
            </div>
          </div>
          
          {task.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignee.profileImageUrl} />
              <AvatarFallback className="text-xs">
                {getInitials(task.assignee.firstName, task.assignee.lastName, task.assignee.email)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
