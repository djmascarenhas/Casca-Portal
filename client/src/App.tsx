import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import NotFound from "@/pages/not-found";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { History } from "@/pages/History";
import { Attractions } from "@/pages/Attractions";
import { Gallery } from "@/pages/Gallery";
import { Blog } from "@/pages/Blog";
import { BlogPost } from "@/pages/BlogPost";
import { Contact } from "@/pages/Contact";
import { Projetos } from "@/pages/Projetos";
import { ProjetoDetalhe } from "@/pages/ProjetoDetalhe";
import { Santuario } from "@/pages/Santuario";
import { PatrocinadorPedraFurada } from "@/pages/PatrocinadorPedraFurada";
import { PatrocinadorBarDoLeo } from "@/pages/PatrocinadorBarDoLeo";
import { PatrocinadorMercearia } from "@/pages/PatrocinadorMercearia";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre" component={About} />
      <Route path="/historia" component={History} />
      <Route path="/atracoes" component={Attractions} />
      <Route path="/galeria" component={Gallery} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contato" component={Contact} />
      <Route path="/projetos" component={Projetos} />
      <Route path="/projetos/:slug" component={ProjetoDetalhe} />
      <Route path="/santuario" component={Santuario} />
      <Route path="/patrocinadores/pedra-furada" component={PatrocinadorPedraFurada} />
      <Route path="/patrocinadores/bar-do-leo" component={PatrocinadorBarDoLeo} />
      <Route path="/patrocinadores/mercearia" component={PatrocinadorMercearia} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AnalyticsProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AnalyticsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
