import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Search, Grid3X3, Calendar, List } from "lucide-react";

interface HeaderProps {
  title: string;
  onNewTask?: () => void;
  viewMode?: 'board' | 'calendar' | 'list';
  onViewModeChange?: (mode: 'board' | 'calendar' | 'list') => void;
}

export default function Header({ 
  title, 
  onNewTask, 
  viewMode = 'board',
  onViewModeChange 
}: HeaderProps) {
  const viewButtons = [
    { mode: 'board' as const, icon: Grid3X3, label: 'Board' },
    { mode: 'calendar' as const, icon: Calendar, label: 'Calendar' },
    { mode: 'list' as const, icon: List, label: 'List' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          
          {onViewModeChange && (
            <div className="flex items-center space-x-2">
              {viewButtons.map((view) => {
                const Icon = view.icon;
                const isActive = viewMode === view.mode;
                
                return (
                  <Button
                    key={view.mode}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onViewModeChange(view.mode)}
                    className={
                      isActive 
                        ? "bg-primary/10 text-primary hover:bg-primary/20" 
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {view.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search tasks, projects..."
              className="w-64 pl-10"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          {onNewTask && (
            <Button 
              onClick={onNewTask}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          )}
          
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
