import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Scale, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  {
    label: 'Servicios',
    href: '/#servicios',
    sublinks: [
      { label: 'Asesoramiento Legal', href: '/servicio/asesoria' },
      { label: 'Asesoramiento Financiero', href: '/servicio/asesoria-financiera' },
      { label: 'Innovación & Automatización', href: '/servicio/automatizacion' },
      { label: 'Gestor de Bloques', href: '/servicio/gestor-bloques' },
    ]
  },
  { label: 'Eventos', href: '/#eventos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);

    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-background/90 backdrop-blur-lg border-b border-gold/20'
        : 'bg-transparent'
        }`}
    >
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-all duration-300 ${isScrolled ? 'bg-gold/10' : 'bg-gold/5'
              }`}>
              <Scale className="w-6 h-6 text-gold" />
            </div>
            <span className="text-2xl font-bold font-serif">
              <span className="text-white">Lex</span>
              <span className="text-gold">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.sublinks ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-gold transition-colors outline-none">
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background/90 border-gold/20 backdrop-blur-lg">
                    {link.sublinks.map((sub) => (
                      <DropdownMenuItem key={sub.label} className="focus:bg-gold/10">
                        <Link
                          to={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="w-full text-sm text-gray-300 hover:text-gold transition-colors"
                        >
                          {sub.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium text-gray-300 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            <Button
              className="bg-gold text-black hover:bg-gold-light hover:shadow-gold transition-all duration-300"
            >
              Consulta Estratégica
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
              className="w-full sm:w-80 bg-background border-l border-gold/20"
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
                    <div key={link.label} className="flex flex-col gap-2">
                      <Link
                        to={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-lg font-medium text-gold transition-colors py-2"
                      >
                        {link.label}
                      </Link>
                      {link.sublinks && (
                        <div className="flex flex-col gap-2 pl-4 border-l border-gold/20">
                          {link.sublinks.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              onClick={() => setIsOpen(false)}
                              className="text-base text-gray-400 hover:text-gold transition-colors py-1"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-auto pb-8">
                  <Button
                    className="w-full bg-gold text-black hover:bg-gold-light"
                  >
                    Consulta Estratégica
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
