import { Link } from "wouter";

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/">
            <h1 className="text-2xl font-bold text-foreground cursor-pointer" data-testid="link-home">
              Rio da Casca
            </h1>
          </Link>
          <nav className="flex items-center gap-4 flex-wrap">
            <Link href="/">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-nav-home">
                Inicio
              </span>
            </Link>
            <Link href="/sobre">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-nav-about">
                Sobre
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Rio da Casca</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Portal de conteudo historico e cultural sobre a regiao de Rio da Casca
          </p>
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Rio da Casca. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
