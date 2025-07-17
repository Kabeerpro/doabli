import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { 
  Settings, 
  Plus, 
  Search, 
  Calendar,
  User,
  ChevronRight,
  Edit,
  Trash2,
  Zap,
  Play,
  Pause
} from "lucide-react";
import { format } from "date-fns";

export default function AutomationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const { data: automations = [], isLoading } = useQuery({
    queryKey: ["/api/automations"],
    enabled: !!user,
  });

  const handleNewAutomation = () => {
    // TODO: Implement automation creation
    console.log("Create new automation");
  };

  const handleEditAutomation = (automation: any) => {
    // TODO: Implement automation editing
    console.log("Edit automation:", automation);
  };

  const handleToggleAutomation = (automation: any) => {
    // TODO: Implement automation toggle
    console.log("Toggle automation:", automation);
  };

  const filteredAutomations = automations.filter((automation: any) => {
    return automation.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Automations" />
        <main className="flex-1 overflow-auto p-6">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Automations" />
      
      <main className="flex-1 overflow-auto p-6">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <Input
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button onClick={handleNewAutomation} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Automation
          </Button>
        </div>

        {/* Coming Soon Notice */}
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Automations Coming Soon</h3>
              <p className="text-sm mb-4">
                Powerful workflow automation features are currently in development. 
                Stay tuned for automated task assignments, notifications, and custom triggers.
              </p>
              <div className="flex justify-center space-x-4 text-xs text-gray-400">
                <span>• Custom Triggers</span>
                <span>• Automated Actions</span>
                <span>• Workflow Optimization</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Automations Grid */}
        {filteredAutomations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No automations found</h3>
                <p className="text-sm mb-4">
                  {searchQuery 
                    ? "Try adjusting your search query."
                    : "Create your first automation to streamline your workflow."}
                </p>
                {!searchQuery && (
                  <Button onClick={handleNewAutomation} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Automation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAutomations.map((automation: any) => (
              <Card key={automation.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <CardTitle className="text-lg line-clamp-1">{automation.name}</CardTitle>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAutomation(automation)}
                        className="h-8 w-8 p-0"
                      >
                        {automation.isActive ? (
                          <Pause className="w-4 h-4 text-green-600" />
                        ) : (
                          <Play className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditAutomation(automation)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {/* Automation description */}
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {automation.description || "No description provided"}
                    </div>
                    
                    {/* Status badge */}
                    <Badge 
                      variant={automation.isActive ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {automation.isActive ? "Active" : "Inactive"}
                    </Badge>
                    
                    {/* Automation metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{automation.createdBy?.firstName || "Unknown"}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{format(new Date(automation.createdAt), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Edit automation button */}
                  <Button
                    variant="ghost"
                    className="w-full mt-4 justify-between"
                    onClick={() => handleEditAutomation(automation)}
                  >
                    <span>Configure</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}