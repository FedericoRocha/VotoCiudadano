import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  text?: string;
}

export function LoadingSpinner({
  className,
  size = 32,
  text,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Loader2
        className="animate-spin text-primary"
        style={{ width: size, height: size }}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
