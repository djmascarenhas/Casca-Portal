import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Section } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Smile, Camera, Share2, Check, MapPin } from "lucide-react";
import waterfallImg from "@assets/generated_images/waterfall_at_usina_da_casca.png";

const emotions = [
  { id: "amei", label: "Amei", icon: Heart, color: "bg-red-500" },
  { id: "inesquecivel", label: "Inesquecível", icon: Star, color: "bg-amber-500" },
  { id: "maravilhoso", label: "Maravilhoso", icon: Sparkles, color: "bg-purple-500" },
  { id: "incrivel", label: "Incrível", icon: Smile, color: "bg-green-500" },
];

export function TestimonialSubmit() {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "share" | "success">("form");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    authorName: "",
    authorCity: "",
    message: "",
    instagramHandle: "",
    authorEmail: "",
  });

  const { data: countData } = useQuery({
    queryKey: ["testimonials-count"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials/count?attraction=pedra-furada");
      return res.json();
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao enviar");
      return res.json();
    },
    onSuccess: () => {
      setStep("share");
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível enviar seu testemunho. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmotion) {
      toast({
        title: "Selecione uma emoção",
        description: "Como você se sentiu visitando a Pedra Furada?",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate({
      ...formData,
      emotion: selectedEmotion,
      attraction: "pedra-furada",
    });
  };

  const shareMessage = `Acabei de visitar a Cachoeira da Pedra Furada! Uma das cachoeiras mais bonitas da Chapada dos Guimarães. #PedraFurada #ChapadadosGuimaraes #RiodaCasca`;

  const handleShare = async (platform: string) => {
    const url = window.location.origin + "/patrocinadores/pedra-furada";
    
    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + " " + url)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareMessage)}`, "_blank");
    } else if (platform === "copy") {
      await navigator.clipboard.writeText(shareMessage + " " + url);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
    }
  };

  const handleFinish = () => {
    setStep("success");
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${waterfallImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-4"
          >
            <MapPin size={16} />
            <span>Você está na Pedra Furada</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-2"
          >
            Conte sua Experiência
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80"
          >
            {countData?.count || 0} visitantes já compartilharam sua história
          </motion.p>
        </div>
      </div>

      <Section className="py-8">
        <div className="max-w-xl mx-auto">
          {step === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-none shadow-xl">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Emotion Selection */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        Como você se sentiu? *
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {emotions.map((emotion) => {
                          const Icon = emotion.icon;
                          const isSelected = selectedEmotion === emotion.id;
                          return (
                            <button
                              key={emotion.id}
                              type="button"
                              onClick={() => setSelectedEmotion(emotion.id)}
                              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                                isSelected
                                  ? "border-primary bg-primary/5 scale-105"
                                  : "border-muted hover:border-primary/50"
                              }`}
                              data-testid={`emotion-${emotion.id}`}
                            >
                              <div className={`p-3 rounded-full ${emotion.color} text-white`}>
                                <Icon size={24} />
                              </div>
                              <span className="font-medium">{emotion.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <Label htmlFor="name">Seu nome *</Label>
                      <Input
                        id="name"
                        placeholder="Como você gostaria de ser chamado?"
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        required
                        className="mt-1"
                        data-testid="input-name"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <Label htmlFor="city">De onde você veio?</Label>
                      <Input
                        id="city"
                        placeholder="Cidade / Estado"
                        value={formData.authorCity}
                        onChange={(e) => setFormData({ ...formData, authorCity: e.target.value })}
                        className="mt-1"
                        data-testid="input-city"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">Sua experiência *</Label>
                      <Textarea
                        id="message"
                        placeholder="Conte-nos como foi sua visita..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={4}
                        className="mt-1 resize-none"
                        data-testid="input-message"
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <Label htmlFor="instagram">Instagram (opcional)</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                        <Input
                          id="instagram"
                          placeholder="seu.usuario"
                          value={formData.instagramHandle}
                          onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value.replace("@", "") })}
                          className="pl-8"
                          data-testid="input-instagram"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email (opcional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Para receber novidades"
                        value={formData.authorEmail}
                        onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                        className="mt-1"
                        data-testid="input-email"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-6 text-lg"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit"
                    >
                      {submitMutation.isPending ? "Enviando..." : "Enviar Testemunho"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "share" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-none shadow-xl text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-green-600" size={32} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                    Obrigado!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Seu testemunho foi enviado e será publicado em breve.
                  </p>

                  <div className="bg-muted/50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Share2 size={18} className="text-primary" />
                      <span className="font-semibold">Compartilhe sua visita!</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ajude mais pessoas a descobrir a Pedra Furada
                    </p>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleShare("whatsapp")}
                        className="flex-col h-auto py-3"
                        data-testid="share-whatsapp"
                      >
                        <span className="text-2xl mb-1">📱</span>
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare("facebook")}
                        className="flex-col h-auto py-3"
                        data-testid="share-facebook"
                      >
                        <span className="text-2xl mb-1">📘</span>
                        <span className="text-xs">Facebook</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare("copy")}
                        className="flex-col h-auto py-3"
                        data-testid="share-copy"
                      >
                        <span className="text-2xl mb-1">📋</span>
                        <span className="text-xs">Copiar</span>
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleFinish} className="w-full" data-testid="button-finish">
                    Concluir
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-none shadow-xl text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="text-primary" size={40} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                    Você faz parte da nossa história!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Obrigado por compartilhar sua experiência na Pedra Furada.
                    Seu testemunho ajuda a preservar e divulgar este lugar especial.
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-4 text-white mb-6">
                    <p className="text-sm opacity-90 mb-1">Visitante verificado</p>
                    <p className="font-bold text-lg">{formData.authorName}</p>
                    <p className="text-sm opacity-75">{formData.authorCity || "Brasil"}</p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => window.location.href = "/patrocinadores/pedra-furada"}
                    className="w-full"
                  >
                    Ver todos os testemunhos
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </Section>
    </Layout>
  );
}
