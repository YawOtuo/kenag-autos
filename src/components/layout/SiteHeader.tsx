import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white/95 border-b border-[#eee] backdrop-blur-sm">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid w-8 h-8 place-items-center bg-red text-white text-sm font-black">
            K
          </span>
          <span className="leading-tight">
            <strong className="block text-sm tracking-tight text-ink">KENAG</strong>
            <small className="block text-[0.7rem] text-muted">Spare Parts & Motors</small>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/#inventory", label: "Inventory" },
            { href: "/arriving-soon", label: "Arriving Soon" },
            { href: "/#sourcing", label: "Request Import" },
            { href: "/#process", label: "How It Works" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-semibold text-muted hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <nav className="flex flex-col gap-1 mt-8">
                {[
                  { href: "/#inventory", label: "Inventory" },
                  { href: "/arriving-soon", label: "Arriving Soon" },
                  { href: "/#sourcing", label: "Request Import" },
                  { href: "/#process", label: "How It Works" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-3 text-sm font-semibold text-muted hover:text-ink hover:bg-[#f5f5f5] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
