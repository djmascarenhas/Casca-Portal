import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttractionCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  badges?: string[];
  onNavigate?: () => void;
}

export function AttractionCard({ image, title, description, link, badges, onNavigate }: AttractionCardProps) {
  const isAnchor = link.startsWith('#');
  
  const handleClick = (e: React.MouseEvent) => {
    if (isAnchor && onNavigate) {
      e.preventDefault();
      onNavigate();
    }
  };

  const linkContent = (
    <>
      Saiba mais <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
    </>
  );

  return (
    <Card className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300" data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          {badges && (
            <div className="flex gap-2 mb-2">
              {badges.map(b => (
                <span key={b} className="text-[10px] font-ui uppercase tracking-wider bg-secondary/80 px-2 py-1 rounded-sm text-white">{b}</span>
              ))}
            </div>
          )}
          <h3 className="text-xl font-serif font-bold text-white leading-tight">{title}</h3>
        </div>
      </div>
      <CardContent className="pt-6 pb-2">
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pb-6">
        {isAnchor ? (
          <button 
            onClick={handleClick}
            className={cn(
              buttonVariants({ variant: "link" }), 
              "p-0 h-auto text-primary font-ui font-semibold group-hover:text-secondary transition-colors cursor-pointer"
            )}
            data-testid={`link-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {linkContent}
          </button>
        ) : (
          <Link 
            href={link} 
            className={cn(
              buttonVariants({ variant: "link" }), 
              "p-0 h-auto text-primary font-ui font-semibold group-hover:text-secondary transition-colors"
            )}
            data-testid={`link-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {linkContent}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
