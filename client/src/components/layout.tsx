import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Terminal, Box, Layers, Cpu } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground">
      {/* Navbar */}
      <header className="border-b border-white/10 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="p-2 bg-primary/10 rounded-md border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <span className="font-mono font-bold text-lg tracking-tight">
                Code<span className="text-primary">Visual</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" active={location === "/"}>Início</NavLink>
            <NavLink href="/lesson/functions" active={location.includes("functions")}>Funções</NavLink>
            <NavLink href="/lesson/objects" active={location.includes("objects")}>Objetos</NavLink>
            <NavLink href="/lesson/classes" active={location.includes("classes")}>Classes</NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none blueprint-grid -z-10 opacity-30" />
        
        {children}
      </main>

      <footer className="border-t border-white/5 py-8 mt-auto bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Feito para ajudar você a entender o "código-fonte" do código.</p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <span className={cn(
        "cursor-pointer text-sm font-medium transition-colors hover:text-primary",
        active ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
      )}>
        {children}
      </span>
    </Link>
  );
}
