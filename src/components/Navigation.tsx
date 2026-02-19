import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Scale } from 'lucide-react';

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-lg border-b border-gold/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isScrolled ? 'bg-gold/10' : 'bg-gold/5'
            }`}>
              <Scale className="w-6 h-6 text-gold" />
            </div>
            <span className="text-2xl font-bold font-serif">
              <span className="text-white">Lex</span>
              <span className="text-gold">AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-gray-300 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="bg-gold text-black hover:bg-gold-light hover:shadow-gold transition-all duration-300"
            >
              Consulta Gratis
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gold">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 bg-black border-l border-gold/20"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between py-4 border-b border-gold/20">
                  <span className="text-xl font-bold font-serif">
                    <span className="text-white">Lex</span>
                    <span className="text-gold">AI</span>
                  </span>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col gap-4 py-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-lg font-medium text-gray-300 hover:text-gold transition-colors py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-auto pb-8">
                  <Button
                    className="w-full bg-gold text-black hover:bg-gold-light"
                  >
                    Consulta Gratis
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
