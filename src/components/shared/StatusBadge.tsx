import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "arriving" | "in-transit" | "clearing" | "available" | "reserved" | "sold" | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, { variant: "default" | "secondary" | "outline"; label: string; className: string }> = {
    arriving: { variant: "outline", label: "Arriving", className: "border-blue text-blue" },
    "in-transit": { variant: "outline", label: "In Transit", className: "border-gold text-gold" },
    clearing: { variant: "outline", label: "Clearing", className: "border-gold text-gold" },
    available: { variant: "default", label: "Available", className: "bg-green text-white" },
    reserved: { variant: "secondary", label: "Reserved", className: "bg-muted text-white" },
    sold: { variant: "secondary", label: "Sold", className: "bg-muted text-white" },
  };

  const config = variants[status] || { variant: "secondary", label: status, className: "" };

  return (
    <Badge variant={config.variant} className={`${config.className} font-bold text-xs uppercase tracking-wider`}>
      {config.label}
    </Badge>
  );
}
