import { Button } from "@/components/ui/button";
import { SiFacebook, SiX, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { Share2 } from "lucide-react";

interface SocialShareProps {
  type: "consumer" | "integrator";
  siteUrl?: string;
}

export default function SocialShare({ type, siteUrl = "https://solarlink.com.br" }: SocialShareProps) {
  const messages = {
    consumer: {
      text: "Acabei de solicitar meu orçamento de energia solar na SolarLink! Reduza sua conta de luz em até 95%. Faça como eu e peça seu orçamento grátis!",
      hashtags: "EnergiaSolar,SolarLink,Sustentabilidade,EconomiaDeEnergia"
    },
    integrator: {
      text: "Minha empresa agora faz parte da SolarLink! Somos integradores certificados prontos para instalar seu sistema solar. Conectando você à energia limpa!",
      hashtags: "EnergiaSolar,SolarLink,IntegradorSolar,EnergiaSustentavel"
    }
  };

  const message = messages[type];
  const fullMessage = `${message.text} ${siteUrl}`;

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(message.text)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message.text)}&url=${encodeURIComponent(siteUrl)}&hashtags=${message.hashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400,noopener,noreferrer");
  };

  return (
    <div className="mt-6 pt-6 border-t">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Share2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-medium">Compartilhe nas redes sociais</span>
      </div>
      <div className="flex justify-center gap-3 flex-wrap">
        <Button
          size="icon"
          variant="outline"
          className="bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] dark:bg-[#25D366]/20 dark:border-[#25D366]/40"
          onClick={() => handleShare("whatsapp")}
          data-testid="button-share-whatsapp"
        >
          <SiWhatsapp className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-[#1877F2]/10 border-[#1877F2]/30 text-[#1877F2] dark:bg-[#1877F2]/20 dark:border-[#1877F2]/40"
          onClick={() => handleShare("facebook")}
          data-testid="button-share-facebook"
        >
          <SiFacebook className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-foreground/10 border-foreground/30 text-foreground dark:bg-foreground/20 dark:border-foreground/40"
          onClick={() => handleShare("twitter")}
          data-testid="button-share-twitter"
        >
          <SiX className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-[#0A66C2]/10 border-[#0A66C2]/30 text-[#0A66C2] dark:bg-[#0A66C2]/20 dark:border-[#0A66C2]/40"
          onClick={() => handleShare("linkedin")}
          data-testid="button-share-linkedin"
        >
          <SiLinkedin className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Eu me cadastrei na SolarLink!
      </p>
    </div>
  );
}
