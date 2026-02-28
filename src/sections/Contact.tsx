import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, CreditCard, Wallet } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDialog(true);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative w-full py-24 sm:py-32 bg-background overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`max-w-3xl mx-auto mb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm tracking-wider uppercase border rounded-full text-gold border-gold/30 bg-gold/5">
            Contacto
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl font-serif">
            Inicia tu <span className="text-gradient-gold">Transformación</span>
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Agenda una consulta técnica-estratégica. Valoramos nuestro tiempo y el tuyo:
            las consultas se abonan por adelantado y se descuentan del presupuesto final del proyecto.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="p-6 rounded-xl border border-gold/20 bg-background/50 hover:border-gold/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <p className="mt-1 text-gray-400">contacto@joanadelfabro.com</p>
                    <p className="text-gray-400">urgente@joanadelfabro.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-gold/20 bg-background/50 hover:border-gold/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Teléfono</h3>
                    <p className="mt-1 text-gray-400">+34 900 123 456</p>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-gold/20 bg-background/50 hover:border-gold/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Oficinas</h3>
                    <p className="mt-1 text-gray-400">Madrid, España</p>
                    <p className="text-gray-400">Nueva York, USA</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-4 rounded-xl border border-gold/20 text-gold hover:bg-gold/10 hover:border-gold/40 transition-all"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-4 rounded-xl border border-gold/20 text-gold hover:bg-gold/10 hover:border-gold/40 transition-all"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-gold/20 bg-background/50">
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50 border-gold/30 text-white placeholder:text-gray-600 focus:border-gold focus:ring-gold/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50 border-gold/30 text-white placeholder:text-gray-600 focus:border-gold focus:ring-gold/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-300">
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    placeholder="Nombre de tu empresa"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-background/50 border-gold/30 text-white placeholder:text-gray-600 focus:border-gold focus:ring-gold/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[150px] bg-background/50 border-gold/30 text-white placeholder:text-gray-600 focus:border-gold focus:ring-gold/20 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group bg-gold text-black hover:bg-gold-light hover:shadow-gold transition-all duration-300"
                >
                  Enviar Mensaje
                  <Send className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Global Wallet / Payment Section */}
      <div className="mt-20 pt-12 border-t border-white/5">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <Wallet className="w-5 h-5 text-gold" />
            <h3 className="text-xl font-serif text-white tracking-tight">Canales de Pago & Billeteras Oficiales</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                <span className="text-blue-500 font-bold text-lg">P</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Cuentas Globales</p>
                <p className="text-white font-serif group-hover:text-gold transition-colors">PayPal Joana Del Fabro</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-sky-blue/50 transition-colors">
                <span className="text-sky-blue font-bold text-lg">M</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Operaciones Locales</p>
                <p className="text-white font-serif group-hover:text-sky-blue transition-colors">Mercado Pago AR</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                <CreditCard className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Web3 Payment</p>
                <p className="text-white font-serif group-hover:text-gold transition-colors">Crypto Wallets (ETH / USDT)</p>
              </div>
            </div>
          </div>

          <p className="mt-12 text-[10px] text-gray-600 uppercase tracking-[0.3em] font-medium text-center">
            Joana Del Fabro Global Institutional Node • 2026
          </p>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-background border-gold/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-gold">
              ¡Mensaje Enviado!
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Gracias por contactarnos. Nuestro equipo de IA ya está analizando tu consulta
              y te responderemos en menos de 24 horas.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 rounded-lg bg-sky-blue/10 border border-sky-blue/30">
            <p className="text-sky-blue text-sm">
              En breve recibirás un link de pago (PayPal / Mercado Pago) para confirmar la sesión oficial.
              Recuerda que este monto se acredita a tu cuenta para el desarrollo final.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section >
  );
}
