import { NeuralNetwork } from '@/components/NeuralNetwork';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scale, Cpu, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Neural Network Background */}
      <div className="absolute inset-0">
        <NeuralNetwork nodeCount={60} connectionDistance={180} />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        {/* Badge */}
        <div
          className={`flex items-center gap-2 px-4 py-2 mb-8 border rounded-full border-gold/30 bg-gold/5 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="w-2 h-2 rounded-full bg-sky-blue animate-pulse-glow" />
          <span className="text-sm tracking-wider uppercase text-gold-light">
            Inteligencia Artificial + Derecho
          </span>
        </div>

        {/* Main Title */}
        <h1
          className={`text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="block text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl font-serif">
            Lex
            <span className="text-gradient-gold">AI</span>
          </span>
          <span className="block mt-4 text-xl tracking-widest uppercase text-gold/80 sm:text-2xl md:text-3xl">
            Abogados del Futuro
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`max-w-2xl mt-8 text-center text-lg leading-relaxed text-gray-400 sm:text-xl transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          Fusionamos la excelencia legal tradicional con la inteligencia artificial
          para ofrecer soluciones jurídicas y financieras disruptivas.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col gap-4 mt-12 sm:flex-row transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {/* Updated CTA as requested */}
          <Button
            size="lg"
            className="group px-8 py-6 text-lg font-medium transition-all duration-300 bg-gold text-black hover:bg-gold-light hover:shadow-gold"
          >
            Conoce Nuestros Servicios
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg font-medium transition-all duration-300 border-gold/50 text-gold hover:bg-gold/10 hover:border-gold"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Hablemos de tu Proyecto
          </Button>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-8 mt-20 sm:gap-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Scale className="w-6 h-6 text-gold" />
            </div>
            <div className="text-2xl font-bold text-white sm:text-3xl font-serif">500+</div>
            <div className="text-sm text-gray-500">Casos Exitosos</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Cpu className="w-6 h-6 text-sky-blue" />
            </div>
            <div className="text-2xl font-bold text-white sm:text-3xl font-serif">AI</div>
            <div className="text-sm text-gray-500">Powered</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <div className="text-2xl font-bold text-white sm:text-3xl font-serif">100%</div>
            <div className="text-sm text-gray-500">Seguro</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border rounded-full border-gold/10 animate-spin-slow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border rounded-full border-sky-blue/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
    </section>
  );
}
