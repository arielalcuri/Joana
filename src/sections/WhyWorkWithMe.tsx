import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, LineChart } from 'lucide-react';

const reasons = [
  {
    title: 'Integración Total',
    description: 'Integro derecho, tecnología y estrategia en cada decisión.',
    icon: <Zap className="w-6 h-6 text-gold" />,
  },
  {
    title: 'Visión Preventiva',
    description: 'Analizo riesgos antes de que se materialicen.',
    icon: <ShieldCheck className="w-6 h-6 text-gold" />,
  },
  {
    title: 'Innovación Ejecutable',
    description: 'Traduzco innovación en estructuras legales ejecutables.',
    icon: <ArrowRight className="w-6 h-6 text-gold" />,
  },
  {
    title: 'Visión Anticipatoria',
    description: 'Trabajo con visión anticipatoria, no reactiva.',
    icon: <LineChart className="w-6 h-6 text-gold" />,
  },
];

export function WhyWorkWithMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="por-que-conmigo"
      className="relative w-full py-24 sm:py-32 bg-background/50 overflow-hidden border-t border-gold/10"
    >
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent opacity-50" />
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm tracking-wider uppercase border rounded-full text-gold border-gold/30 bg-gold/5">
            Valor Diferencial
          </span>
          <h2
            className={`text-4xl font-bold text-white sm:text-5xl font-serif mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            ¿Por qué trabajar <span className="text-gradient-gold">conmigo?</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`p-6 rounded-2xl border border-gold/20 bg-background/50 backdrop-blur-sm transition-all duration-1000 delay-${
                index * 200
              } hover:border-gold/50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="p-3 inline-block rounded-lg bg-gold/10 mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-serif">
                {reason.title}
              </h3>
              <p className="text-gray-400">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
