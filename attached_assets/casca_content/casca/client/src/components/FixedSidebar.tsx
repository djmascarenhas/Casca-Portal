import { Link, useLocation } from "wouter";
import { 
  FileText, 
  GraduationCap, 
  Users, 
  Newspaper, 
  MessageSquare, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const sidebarItems = [
  { icon: FileText, label: "Blog", href: "/blog" },
  { icon: GraduationCap, label: "Solar Academy", href: "/solar-academy" },
  { icon: Users, label: "CRM", href: "/crm" },
  { icon: Newspaper, label: "Notícias", href: "/noticias" },
  { icon: MessageSquare, label: "Comentários", href: "/comentarios" },
  { icon: ExternalLink, label: "Links Úteis", href: "/links-uteis" },
];

export function FixedSidebar() {
  const [location] = useLocation();

  return (
    <aside 
      className="fixed left-0 top-0 h-screen w-[6%] min-w-[60px] max-w-[80px] bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-2 z-50"
      data-testid="fixed-sidebar"
    >
      {sidebarItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Tooltip key={item.href} delayDuration={300}>
            <TooltipTrigger asChild>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`w-10 h-10 ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}
                  data-testid={`sidebar-btn-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {item.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </aside>
  );
}
