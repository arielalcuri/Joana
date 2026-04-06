import { useEffect, useRef, useState } from 'react';


export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative w-full py-24 sm:py-32 bg-background overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
        <div className="absolute inset-0 bg-gradient-to-l from-sky-blue/10 to-transparent" />
      </div>

      {/* Neural Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="hsl(195, 100%, 65%)" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="hsl(195, 100%, 65%)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="hsl(195, 100%, 65%)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm tracking-wider uppercase border rounded-full text-gold border-gold/30 bg-gold/5">
              ¿Quién Soy?
            </span>

            <h2 className="text-4xl font-bold text-white sm:text-5xl font-serif leading-tight">
              El Futuro del{' '}
              <span className="text-gradient-gold">Derecho</span> ya está aquí
            </h2>

            <div className="mt-8 space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                Soy abogada especializada en tecnologías emergentes, enfocada en el diseño, regulación y auditoría de sistemas basados en Inteligencia Artificial y Blockchain.
              </p>
              <p>
                Trabajo en la intersección entre derecho, innovación y negocios, acompañando a organizaciones que entienden que el futuro no se improvisa: se estructura jurídicamente.
              </p>
              <p>
                Mi enfoque combina:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pensamiento crítico aplicado a la tecnología</li>
                <li>Análisis de riesgos en entornos digitales complejos</li>
                <li>Diseño de marcos legales ejecutables</li>
                <li>Auditoria y gobernanza de sistemas de IA</li>
              </ul>
              <p>
                Me especializo en:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Regulación y cumplimiento en Inteligencia Artificial</li>
                <li>Auditoria de algoritmos y mitigación de riesgos</li>
                <li>Implementación jurídica de Smart Contracts</li>
                <li>Estructuración legal de modelos basados en Blockchain</li>
              </ul>
              <p>
                No interpreto la tecnología como tendencia, sino como infraestructura jurídica del nuevo sistema económico.
              </p>
              <p>
                Por eso, mi trabajo no es solo asesorar, sino anticipar escenarios, reducir incertidumbre y transformar innovación en seguridad jurídica real y ejecutable.
              </p>
              <p>
                Acompaño a empresas, gobiernos y proyectos que buscan liderar en la nueva economía digital.
              </p>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
          >
            <div className="grid grid-cols-2 gap-6">

            </div>

            {/* Additional Info Card */}
            <div className="mt-8 p-8 rounded-2xl border border-sky-blue/30 bg-gradient-to-br from-sky-blue/10 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-sky-blue animate-pulse-glow" />
                <span className="text-sky-blue font-medium">Tecnología de Punta</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Utilizamos modelos de lenguaje avanzados, análisis predictivo y contratos
                inteligentes para ofrecer resultados superiores en tiempo récord.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Machine Learning', 'Blockchain', 'NLP', 'Smart Contracts'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full border border-sky-blue/30 text-sky-blue bg-sky-blue/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
