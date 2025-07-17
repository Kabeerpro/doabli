import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ProjectModal from "@/components/modals/ProjectModal";
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  FileText, 
  Database, 
  Settings, 
  Plus,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const { data: projects = [] } = useQuery({
    queryKey: ["/api/projects"],
    enabled: !!user,
  });

  const navigationItems = [
    { href: "/", icon: CheckSquare, label: "Task Board", exact: true },
    { href: "/pages", icon: FileText, label: "Pages" },
    { href: "/automations", icon: Settings, label: "Automations" },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return location === href;
    }
    return location.startsWith(href);
  };

  return (
    <>
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Doabli</h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    active 
                      ? "bg-primary/10 text-primary hover:bg-primary/20" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Projects Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between px-3 py-2 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Projects
            </h3>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600"
              onClick={() => setIsProjectModalOpen(true)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="space-y-1">
            {projects.map((project: any) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="truncate">{project.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={user.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
              alt="User Avatar" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.firstName && user.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user.email
                }
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-100"
          onClick={() => window.location.href = '/api/logout'}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>

    <ProjectModal
      isOpen={isProjectModalOpen}
      onClose={() => setIsProjectModalOpen(false)}
    />
    </>
  );
}
