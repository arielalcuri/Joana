import { NeuralNetwork } from '@/components/NeuralNetwork';
import { Button } from '@/components/ui/button';
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
          <span className="block text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-serif text-gradient-gold py-4 px-2">
            Joana Del Fabro
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`max-w-2xl mt-8 text-center text-lg leading-relaxed text-gray-400 sm:text-xl transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          Abogada Tec | IA Aplicada al Derecho | Auditoría de IA | Smart Contracts Legal | Blockchain Legal Advisory
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col flex-wrap justify-center gap-4 mt-12 sm:flex-row transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <Button
            variant="metallic"
            size="lg"
            className="group px-8 py-6 text-lg font-medium transition-all duration-300"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Agendar sesión estratégica
          </Button>
          <Button
            variant="metallic"
            size="lg"
            className="group px-8 py-6 text-lg font-medium transition-all duration-300"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Evaluar Proyecto
          </Button>
          <Button
            variant="metallic"
            size="lg"
            className="px-8 py-6 text-lg font-medium transition-all duration-300"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contacto Estratégico
          </Button>
        </div>

      </div>

    </section>
  );
}
