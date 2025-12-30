import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import type { InsertNewsletterSubscriber } from "@shared/schema";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  const newsletterMutation = useMutation({
    mutationFn: async (data: InsertNewsletterSubscriber) => {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao processar inscrição");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inscrição confirmada!",
        description: "Você receberá novidades e histórias da região.",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate({ email });
    }
  };

  return (
    <div>
      <h4 className="font-ui font-bold uppercase tracking-wider mb-4 text-secondary">Newsletter</h4>
      <p className="text-xs text-primary-foreground/70 mb-2">Receba novidades e histórias da região.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="email" 
          placeholder="Seu email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-primary-foreground/10 border border-primary-foreground/20 rounded px-3 py-2 text-sm w-full placeholder:text-primary-foreground/50 focus:outline-none focus:border-secondary text-white"
          required
          data-testid="input-newsletter-email"
        />
        <Button 
          type="submit" 
          size="sm" 
          variant="secondary" 
          className="bg-secondary text-white hover:bg-secondary/90"
          disabled={newsletterMutation.isPending}
          data-testid="button-newsletter-submit"
        >
          {newsletterMutation.isPending ? "..." : "OK"}
        </Button>
      </form>
    </div>
  );
}
