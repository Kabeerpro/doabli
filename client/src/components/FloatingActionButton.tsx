import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onCreateTask: () => void;
  className?: string;
}

export default function FloatingActionButton({ onCreateTask, className }: FloatingActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onCreateTask();
    // Reset animation state
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Button
        size="lg"
        className={cn(
          "rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-110 active:scale-95",
          isPressed && "scale-95"
        )}
        onClick={handleClick}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}