import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessAnimationProps {
  show: boolean;
  message: string;
  onComplete?: () => void;
}

export default function SuccessAnimation({ show, message, onComplete }: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">{message}</span>
        </div>
      </div>
    </div>
  );
}