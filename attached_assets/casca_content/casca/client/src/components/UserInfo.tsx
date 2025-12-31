import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Clock, User } from "lucide-react";

interface UserInfoProps {
  variant?: "light" | "dark";
  compact?: boolean;
}

export default function UserInfo({ variant = "dark", compact = false }: UserInfoProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [loginTime] = useState(() => {
    const stored = sessionStorage.getItem("loginTime");
    if (stored) return new Date(stored);
    const now = new Date();
    sessionStorage.setItem("loginTime", now.toISOString());
    return now;
  });
  const [minutesLoggedIn, setMinutesLoggedIn] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.removeItem("loginTime");
      return;
    }

    const updateTime = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - loginTime.getTime()) / 60000);
      setMinutesLoggedIn(diff);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated, loginTime]);

  const handleLogout = () => {
    sessionStorage.removeItem("loginTime");
    window.location.href = "/api/logout";
  };

  const getTimeDisplay = () => {
    if (minutesLoggedIn < 1) return "Agora";
    if (minutesLoggedIn === 1) return "1 min";
    if (minutesLoggedIn < 60) return `${minutesLoggedIn} min`;
    const hours = Math.floor(minutesLoggedIn / 60);
    const mins = minutesLoggedIn % 60;
    if (hours === 1) return mins > 0 ? `1h ${mins}min` : "1h";
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || "U";
  };

  const getUserName = () => {
    if (!user) return "Usuario";
    if (user.firstName || user.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user.email?.split("@")[0] || "Usuario";
  };

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const textColor = variant === "light" ? "text-white" : "text-foreground";
  const mutedColor = variant === "light" ? "text-white/70" : "text-muted-foreground";

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className={variant === "light" ? "hover:bg-white/10" : ""}
            data-testid="button-user-menu"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.profileImageUrl || undefined} alt={getUserName()} />
              <AvatarFallback className="text-xs">{getUserInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.profileImageUrl || undefined} alt={getUserName()} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium" data-testid="text-user-name">{getUserName()}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span data-testid="text-login-time">{getTimeDisplay()}</span>
              </span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="text-destructive focus:text-destructive cursor-pointer"
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${textColor}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.profileImageUrl || undefined} alt={getUserName()} />
        <AvatarFallback className="text-xs">{getUserInitials()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium" data-testid="text-user-name">{getUserName()}</span>
        <span className={`text-xs ${mutedColor} flex items-center gap-1`}>
          <Clock className="h-3 w-3" />
          <span data-testid="text-login-time">{getTimeDisplay()}</span>
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className={variant === "light" ? "text-white/80 hover:text-white hover:bg-white/10" : ""}
        data-testid="button-logout"
      >
        <LogOut className="h-4 w-4 mr-1" />
        Sair
      </Button>
    </div>
  );
}
