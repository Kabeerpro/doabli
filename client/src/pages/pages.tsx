import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar,
  User,
  ChevronRight,
  Edit,
  Trash2
} from "lucide-react";
import { format } from "date-fns";

export default function PagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["/api/pages"],
    enabled: !!user,
  });

  const handleNewPage = () => {
    // TODO: Implement page creation
    console.log("Create new page");
  };

  const handleEditPage = (page: any) => {
    // TODO: Implement page editing
    console.log("Edit page:", page);
  };

  const handleDeletePage = (page: any) => {
    // TODO: Implement page deletion
    console.log("Delete page:", page);
  };

  const filteredPages = pages.filter((page: any) => {
    return page.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Pages" />
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
      <Header title="Pages" />
      
      <main className="flex-1 overflow-auto p-6">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button onClick={handleNewPage} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </div>

        {/* Pages Grid */}
        {filteredPages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No pages found</h3>
                <p className="text-sm mb-4">
                  {searchQuery 
                    ? "Try adjusting your search query."
                    : "Create your first page to start building your knowledge base."}
                </p>
                {!searchQuery && (
                  <Button onClick={handleNewPage} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Page
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page: any) => (
              <Card key={page.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <CardTitle className="text-lg line-clamp-1">{page.title}</CardTitle>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPage(page)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePage(page)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {/* Page content preview */}
                    <div className="text-sm text-gray-600 line-clamp-3">
                      {page.content?.blocks?.length > 0 
                        ? page.content.blocks[0].text || "Empty page"
                        : "Empty page"}
                    </div>
                    
                    {/* Page metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{page.createdBy?.firstName || "Unknown"}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{format(new Date(page.createdAt), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                    
                    {/* Project badge */}
                    {page.project && (
                      <Badge variant="secondary" className="text-xs">
                        {page.project.name}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Open page button */}
                  <Button
                    variant="ghost"
                    className="w-full mt-4 justify-between"
                    onClick={() => console.log("Open page:", page.id)}
                  >
                    <span>Open Page</span>
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
