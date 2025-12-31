import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { PiggyBank, TrendingUp, Clock, Leaf, Zap, ArrowRight, Sun, LayoutGrid, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function ROICalculator() {
  const [monthlyBill, setMonthlyBill] = useState(500);
  const [useMicroinverter, setUseMicroinverter] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedResults, setDisplayedResults] = useState({
    monthlySavings: 0,
    annualSavings: 0,
    paybackYears: 0,
    co2Saved: 0,
    savings25Years: 0,
    panelCount: 0,
    systemPower: 0,
    inverterPower: 0
  });

  const calculateSavings = () => {
    const annualBill = monthlyBill * 12;
    const savingsPercent = 0.90;
    const annualSavings = annualBill * savingsPercent;
    
    // Cálculo do consumo mensal em kWh (tarifa média de R$ 0,70/kWh)
    const tariffPerKwh = 0.70;
    const monthlyConsumptionKwh = monthlyBill / tariffPerKwh;
    
    // Geração média mensal por kWp instalado (considerando irradiação média do Brasil: ~4.5 kWh/m²/dia)
    const avgMonthlyGenerationPerKwp = 130; // kWh/mês por kWp
    
    // Potência do sistema necessária (kWp)
    const systemPowerKwp = monthlyConsumptionKwh / avgMonthlyGenerationPerKwp;
    
    // Quantidade de painéis (600Wp = 0.6 kWp por painel)
    const panelWattage = 600; // Wp
    const panelCount = Math.ceil((systemPowerKwp * 1000) / panelWattage);
    
    // Potência real do sistema baseada nos painéis
    const actualSystemPower = (panelCount * panelWattage) / 1000; // kWp
    
    // Potência do inversor (com margem de 10-20%)
    // Microinversor: 1 por painel ou 1 para cada 2 painéis
    // Inversor string: potência única para o sistema
    let inverterPower: number;
    if (useMicroinverter) {
      // Microinversor típico de 600W ou 1200W (para 2 painéis)
      const microinverterPower = 600; // W
      inverterPower = (panelCount * microinverterPower) / 1000; // kWp
    } else {
      // Inversor string com margem de 15%
      inverterPower = Math.ceil(actualSystemPower * 1.15 * 10) / 10; // kW
    }
    
    // Custo do sistema (R$/Wp instalado)
    const costPerWp = useMicroinverter ? 4.50 : 4.00; // Microinversor é mais caro
    const systemCost = actualSystemPower * 1000 * costPerWp;
    
    const paybackYears = systemCost / annualSavings;
    const savings25Years = (annualSavings * 25) - systemCost;
    const co2Saved = (annualSavings / tariffPerKwh) * 0.084;

    return {
      monthlySavings: monthlyBill * savingsPercent,
      annualSavings,
      systemCost,
      paybackYears: Math.round(paybackYears * 10) / 10,
      savings25Years,
      co2Saved: Math.round(co2Saved),
      panelCount,
      systemPower: Math.round(actualSystemPower * 100) / 100,
      inverterPower: Math.round(inverterPower * 100) / 100
    };
  };

  useEffect(() => {
    setIsAnimating(true);
    const results = calculateSavings();
    
    const duration = 800;
    const steps = 30;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setDisplayedResults({
        monthlySavings: results.monthlySavings * easeOut,
        annualSavings: results.annualSavings * easeOut,
        paybackYears: results.paybackYears * easeOut,
        co2Saved: results.co2Saved * easeOut,
        savings25Years: results.savings25Years * easeOut,
        panelCount: Math.round(results.panelCount * easeOut),
        systemPower: results.systemPower * easeOut,
        inverterPower: results.inverterPower * easeOut
      });
      
      if (step >= steps) {
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [monthlyBill, useMicroinverter]);

  return (
    <section id="calculadora" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-chart-4/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Calculadora Interativa
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            Quanto Você Pode Economizar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra em segundos o potencial de economia para sua casa ou empresa.
            Ajuste o valor da sua conta mensal e veja os resultados.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-card-border h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Sun className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Sua Conta de Luz</h3>
                  <p className="text-sm text-muted-foreground">Valor médio mensal</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3 text-center mb-6" data-testid="text-bill-value">
                    R$ {monthlyBill.toLocaleString('pt-BR')}
                  </div>
                  <Slider
                    min={100}
                    max={5000}
                    step={50}
                    value={[monthlyBill]}
                    onValueChange={(value) => setMonthlyBill(value[0])}
                    className="py-4"
                    data-testid="slider-monthly-bill"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>R$ 100</span>
                    <span>R$ 5.000</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Label htmlFor="custom-value" className="text-sm text-muted-foreground mb-3 block">
                    Ou digite um valor específico:
                  </Label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">R$</span>
                      <Input
                        id="custom-value"
                        type="number"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                        className="pl-12 py-6 text-lg"
                        data-testid="input-custom-bill"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Cpu className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label htmlFor="microinverter" className="text-sm font-medium">
                          Usar Microinversor
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Maior eficiência por painel
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="microinverter"
                      checked={useMicroinverter}
                      onCheckedChange={setUseMicroinverter}
                      data-testid="switch-microinverter"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-card-border h-full bg-gradient-to-br from-card to-card/50">
              <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
                <Zap className="h-6 w-6 text-primary" />
                Sua Economia Estimada
              </h3>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-chart-1/10 to-chart-1/5 border border-chart-1/10"
                  animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
                >
                  <div className="flex items-center gap-2 text-chart-1 mb-3">
                    <LayoutGrid className="h-5 w-5" />
                    <span className="text-sm font-semibold">Painéis (600Wp)</span>
                  </div>
                  <div className="text-3xl font-bold text-foreground" data-testid="text-panel-count">
                    {displayedResults.panelCount}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">unidades</div>
                </motion.div>

                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-chart-5/10 to-chart-5/5 border border-chart-5/10"
                  animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
                  transition={{ delay: 0.05 }}
                >
                  <div className="flex items-center gap-2 text-chart-5 mb-3">
                    <Sun className="h-5 w-5" />
                    <span className="text-sm font-semibold">Potência Sistema</span>
                  </div>
                  <div className="text-3xl font-bold text-foreground" data-testid="text-system-power">
                    {displayedResults.systemPower.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">kWp</div>
                </motion.div>

                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-chart-2/10 to-chart-2/5 border border-chart-2/10"
                  animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 text-chart-2 mb-3">
                    <Cpu className="h-5 w-5" />
                    <span className="text-sm font-semibold">{useMicroinverter ? 'Microinversor' : 'Inversor'}</span>
                  </div>
                  <div className="text-3xl font-bold text-foreground" data-testid="text-inverter-power">
                    {displayedResults.inverterPower.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">kW</div>
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10"
                  animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <PiggyBank className="h-5 w-5" />
                    <span className="text-sm font-semibold">Economia Mensal</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground" data-testid="text-monthly-savings">
                    R$ {displayedResults.monthlySavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </div>
                </motion.div>

                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-chart-2/10 to-chart-2/5 border border-chart-2/10"
                  animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-chart-2 mb-3">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-semibold">Economia Anual</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground" data-testid="text-annual-savings">
                    R$ {displayedResults.annualSavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </div>
                </motion.div>

                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-chart-4/10 to-chart-4/5 border border-chart-4/10"
                  animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="flex items-center gap-2 text-chart-4 mb-3">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm font-semibold">Tempo de Retorno</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground" data-testid="text-payback">
                    {displayedResults.paybackYears.toFixed(1)} anos
                  </div>
                </motion.div>

                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-chart-3/10 to-chart-3/5 border border-chart-3/10"
                  animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-chart-3 mb-3">
                    <Leaf className="h-5 w-5" />
                    <span className="text-sm font-semibold">CO2 Evitado/Ano</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground" data-testid="text-co2-saved">
                    {displayedResults.co2Saved.toLocaleString('pt-BR')} kg
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-chart-3/10 border border-primary/20 mb-6"
                animate={{ scale: isAnimating ? [1, 1.01, 1] : 1 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Economia Total em 25 anos</div>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3" data-testid="text-25year-savings">
                      R$ {displayedResults.savings25Years.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">Investimento estimado</div>
                    <div className="text-xl font-semibold text-foreground" data-testid="text-investment">
                      R$ {((displayedResults.systemPower * 1000 * (useMicroinverter ? 4.50 : 4.00))).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
              </motion.div>

              <Button className="w-full py-6 text-lg group" size="lg" data-testid="button-get-proposal">
                Receber Proposta Personalizada
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
