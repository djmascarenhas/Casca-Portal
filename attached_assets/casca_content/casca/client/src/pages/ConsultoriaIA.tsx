import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, UserPlus, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/landing/Header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ConsultoriaIA() {
  const [isDark, setIsDark] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Olá! Sou a Solara, sua especialista em energia solar. Estou aqui para responder suas dúvidas sobre sistemas fotovoltaicos, economia de energia, instalação, financiamento e tudo relacionado à energia solar. Como posso ajudar você hoje?"
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  // Lead capture state
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const [hasShownDialog, setHasShownDialog] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
    
    // Check if lead was already captured in this session
    const captured = localStorage.getItem("solarlink_lead_captured");
    if (captured === "true") {
      setLeadCaptured(true);
      setHasShownDialog(true);
    }
  }, []);

  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const leadCaptureMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; phone: string }) => {
      const response = await apiRequest("POST", "/api/chat/capture-lead", data);
      return response.json();
    },
    onSuccess: (data) => {
      setLeadCaptured(true);
      setShowLeadDialog(false);
      localStorage.setItem("solarlink_lead_captured", "true");
      toast({
        title: data.exists ? "Que bom ver voce novamente!" : "Cadastro realizado!",
        description: data.message,
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Nao foi possivel processar seu cadastro. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message: userMessage,
        history: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
      });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.message
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Increment response count and show dialog after first AI response
      const newCount = responseCount + 1;
      setResponseCount(newCount);
      
      if (newCount === 1 && !hasShownDialog && !leadCaptured) {
        // Show dialog after a small delay to let the message appear
        setTimeout(() => {
          setShowLeadDialog(true);
          setHasShownDialog(true);
        }, 1500);
      }
    },
    onError: (error: Error) => {
      let errorContent = "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.";
      
      try {
        const parsed = JSON.parse(error.message.split(": ").slice(1).join(": "));
        if (parsed.error) {
          errorContent = parsed.error;
        }
      } catch {
        // Use default error message
      }

      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: errorContent
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(input.trim());
    setInput("");
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadEmail.trim() || !leadPhone.trim()) {
      toast({
        title: "Campos obrigatorios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    leadCaptureMutation.mutate({
      name: leadName.trim(),
      email: leadEmail.trim(),
      phone: leadPhone.trim()
    });
  };

  const formatPhoneNumber = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "");
    // Format as (XX) XXXXX-XXXX
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setLeadPhone(formatted);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onThemeToggle={handleThemeToggle} isDark={isDark} />
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-24">
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-chart-3">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-xl" data-testid="text-page-title">
                Consultoria IA
              </h1>
              <p className="text-sm text-muted-foreground">
                Converse com a Solara
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-12">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Online</span>
            {leadCaptured && (
              <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                Cadastrado
              </span>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${message.role}-${message.id}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <Card
                  className={`max-w-[80%] px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </Card>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex gap-3 justify-start" data-testid="message-loading">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <Card className="bg-muted px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Solara está digitando...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t bg-background p-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua pergunta sobre energia solar..."
              className="min-h-[44px] max-h-[150px] resize-none"
              rows={1}
              disabled={chatMutation.isPending}
              data-testid="input-chat-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || chatMutation.isPending}
              size="icon"
              className="flex-shrink-0"
              data-testid="button-send-message"
            >
              {chatMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-3">
            A Solara é especializada em energia solar e responde apenas sobre este tema.
          </p>
        </div>
      </main>
      {/* Lead Capture Dialog */}
      <Dialog open={showLeadDialog} onOpenChange={setShowLeadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Vamos nos conhecer melhor?
            </DialogTitle>
            <DialogDescription>Para uma conversa mais franca e humanizada, compartilhe seus dados. Assim podemos personalizar nossas recomendações e, se desejar, conectar você com as melhores empresas do setor e próximas de você.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lead-name">Nome completo</Label>
              <Input
                id="lead-name"
                placeholder="Seu nome"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                data-testid="input-lead-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-email">E-mail</Label>
              <Input
                id="lead-email"
                type="email"
                placeholder="seu@email.com"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                data-testid="input-lead-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-phone">WhatsApp</Label>
              <Input
                id="lead-phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={leadPhone}
                onChange={handlePhoneChange}
                maxLength={16}
                data-testid="input-lead-phone"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setShowLeadDialog(false)}
                data-testid="button-skip-lead"
              >
                Agora não
              </Button>
              <Button 
                type="submit" 
                disabled={leadCaptureMutation.isPending}
                data-testid="button-submit-lead"
              >
                {leadCaptureMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Continuar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
