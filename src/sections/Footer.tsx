import { Scale, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  servicios: [
    { label: 'Tokenización', href: '/servicio/tokenizacion' },
    { label: 'Automatización', href: '/servicio/automatizacion' },
    { label: 'Smart Contracts', href: '/servicio/smart-contracts' },
    { label: 'Asesoría Legal', href: '/servicio/asesoria-legal' },
    { label: 'Trazabilidad', href: '/servicio/trazabilidad' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '#nosotros' },
    { label: 'Equipo', href: '#nosotros' },
    { label: 'Carreras', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  legal: [
    { label: 'Términos de Servicio', href: '#' },
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Aviso Legal', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative w-full bg-black border-t border-gold/20">
      {/* Main Footer */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gold/10">
                <Scale className="w-6 h-6 text-gold" />
              </div>
              <span className="text-2xl font-bold font-serif">
                <span className="text-white">Lex</span>
                <span className="text-gold">AI</span>
              </span>
            </div>
            <p className="max-w-sm mb-6 text-gray-400 leading-relaxed">
              Fusionamos la excelencia legal tradicional con inteligencia artificial
              para ofrecer soluciones jurídicas y financieras disruptivas.
            </p>
            <div className="flex items-center gap-2 text-sm text-sky-blue">
              <div className="w-2 h-2 rounded-full bg-sky-blue animate-pulse-glow" />
              Sistema operativo con IA
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-gold">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-gold">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-gold">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-gold transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} LexAI. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-500">
                Diseñado con
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <div className="w-2 h-2 rounded-full bg-sky-blue" />
              </div>
              <span className="text-sm text-gray-500">
                en Madrid & Nueva York
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
