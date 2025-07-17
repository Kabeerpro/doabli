import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Users, 
  FileText, 
  Settings, 
  Clock,
  AlertCircle,
  CheckCircle 
} from "lucide-react";
import PageModal from "@/components/modals/PageModal";
import InviteTeamModal from "@/components/modals/InviteTeamModal";

interface QuickActionsProps {
  onNewTask?: () => void;
}

export default function QuickActions({ onNewTask }: QuickActionsProps) {
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const quickActions = [
    { 
      icon: Plus, 
      label: 'Create Task', 
      onClick: onNewTask,
      color: 'text-primary'
    },
    { 
      icon: Users, 
      label: 'Invite Team', 
      onClick: () => setIsInviteModalOpen(true),
      color: 'text-primary'
    },
    { 
      icon: FileText, 
      label: 'New Page', 
      onClick: () => setIsPageModalOpen(true),
      color: 'text-primary'
    },
    { 
      icon: Settings, 
      label: 'Automation', 
      onClick: () => {
        // TODO: Implement automation modal
        console.log('Automation coming soon');
      },
      color: 'text-primary'
    },
  ];

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      id: '1',
      title: 'Design review',
      dueDate: 'Due today',
      priority: 'high',
      color: 'bg-red-500'
    },
    {
      id: '2',
      title: 'Client presentation',
      dueDate: 'Due tomorrow',
      priority: 'medium',
      color: 'bg-yellow-500'
    },
    {
      id: '3',
      title: 'Sprint review',
      dueDate: 'Due in 3 days',
      priority: 'low',
      color: 'bg-green-500'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="ghost"
                className="w-full justify-start bg-gray-50 hover:bg-gray-100"
                onClick={action.onClick}
              >
                <Icon className={`w-4 h-4 mr-3 ${action.color}`} />
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${deadline.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {deadline.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {deadline.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PageModal
        isOpen={isPageModalOpen}
        onClose={() => setIsPageModalOpen(false)}
      />

      <InviteTeamModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}
