import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, Shield, Clock, Zap } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo leva para instalar o sistema solar?",
    answer: "A instalação residencial típica leva de 1 a 3 dias úteis, dependendo do tamanho do sistema. Projetos comerciais maiores podem levar de 1 a 2 semanas. Todo o processo, desde a aprovação até a conexão com a rede, leva em média 30 a 60 dias.",
    icon: Clock
  },
  {
    question: "Qual é a garantia dos equipamentos?",
    answer: "Os painéis solares possuem garantia de 25 anos de performance (produzindo pelo menos 80% da capacidade original). Os inversores têm garantia de 5 a 12 anos, dependendo do fabricante. Oferecemos também garantia de instalação de 5 anos.",
    icon: Shield
  },
  {
    question: "Preciso trocar meu medidor de energia?",
    answer: "Sim, será necessário trocar para um medidor bidirecional, que mede tanto a energia consumida quanto a energia que você injeta na rede. A troca é feita pela distribuidora local sem custo adicional na maioria das regiões.",
    icon: Zap
  },
  {
    question: "E se eu gerar mais energia do que consumo?",
    answer: "A energia excedente é injetada na rede elétrica e você recebe créditos que podem ser usados em até 60 meses. Esses créditos podem ser usados na mesma unidade ou em outras propriedades no mesmo CPF/CNPJ.",
    icon: HelpCircle
  },
  {
    question: "Quanto custa um sistema solar residencial?",
    answer: "O custo varia de acordo com o consumo e região, mas sistemas residenciais típicos custam entre R$ 15.000 e R$ 50.000. A boa notícia é que o investimento se paga em 3 a 5 anos, e depois você economiza por mais 20+ anos.",
    icon: HelpCircle
  },
  {
    question: "O sistema funciona em dias nublados ou chuvosos?",
    answer: "Sim! Os painéis continuam gerando energia mesmo em dias nublados, apenas com eficiência reduzida (cerca de 10-25% da capacidade). O dimensionamento do sistema já considera as variações climáticas da sua região.",
    icon: HelpCircle
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre energia solar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-card-border rounded-xl px-6 data-[state=open]:bg-muted/30 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6" data-testid={`accordion-trigger-${index}`}>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <faq.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pl-14">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
