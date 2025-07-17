import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onCreateTask: () => void;
  className?: string;
}

export default function FloatingActionButton({ onCreateTask, className }: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    onCreateTask();
    setIsExpanded(false);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Button
        size="lg"
        className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-200"
        onClick={handleClick}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}