import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
