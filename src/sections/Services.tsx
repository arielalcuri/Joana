import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Workflow, ArrowUpRight, Scale, BarChart3, Database } from 'lucide-react';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  gradient: string;
}

const services: Service[] = [
  {
    id: 'asesoria',
    icon: <Scale className="w-8 h-8" />,
    title: 'Asesoramiento Técnico-Legal',
    subtitle: 'Revisión & Análisis Jurídico',
    description: 'Consultoría legal especializada en tecnología y mediaciones. Análisis profundo revisado por hora para máxima precisión.',
    features: [
      'Mediaciones y Resolución de Conflictos',
      'Análisis y Revisión Legal Estratégica',
      'Dictámenes Jurídicos de Complejidad',
      'Auditoría en Cumplimiento Normativo',
    ],
    gradient: 'from-sky-blue/20 via-gold/5 to-transparent',
  },
  {
    id: 'asesoria-financiera',
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Diseño de Infraestructura Tecnológica',
    subtitle: 'Dinero Digital & Smart Contracts',
    description: 'Construimos tu infraestructura financiera sobre la base del dinero digital y los contratos inteligentes autoejecutables.',
    features: [
      'Modelos de Tokenización de Activos',
      'Arquitectura de Smart Contracts',
      'Planificación del Dinero Digital',
      'Despliegue de Dinero 3.0',
    ],
    gradient: 'from-gold/20 via-gold/5 to-transparent',
  },
  {
    id: 'automatizacion',
    icon: <Workflow className="w-8 h-8" />,
    title: 'Innovación & Automatización',
    subtitle: 'Optimización Disruptiva',
    description: 'Revolucionamos tus procesos mediante la automatización inteligente y el control absoluto de trazabilidad.',
    features: [
      'Automatización de Procesos Críticos',
      'Control de Trazabilidad Inmutable',
      'Infraestructura de Datos Distribuida',
      'Sistemas de Auditoría In-Process',
    ],
    gradient: 'from-sky-blue/20 via-sky-blue/5 to-transparent',
  },
  {
    id: 'gestor-bloques',
    icon: <Database className="w-8 h-8" />,
    title: 'Gestor de Producción en Bloques',
    subtitle: 'Agente Ejecutiva Blockchain',
    description: 'Un gestor avanzado para la producción y validación de bloques, asegurando la eficiencia en redes distribuidas.',
    features: [
      'Validación de Nodos Institucionales',
      'Gestión de Producción Logística',
      'Monitoreo de Redes en Tiempo Real',
      'Optimización de Gas y Recursos',
    ],
    gradient: 'from-gold/20 via-sky-blue/10 to-transparent',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative w-full py-24 sm:py-32 bg-background"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <span className="inline-block px-4 py-2 mb-6 text-sm tracking-wider uppercase border rounded-full text-gold border-gold/30 bg-gold/5">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl font-serif">
            Soluciones <span className="text-gradient-gold">LegalTech</span> de Vanguardia
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Combinamos experiencia legal tradicional con tecnología de punta para ofrecer
            servicios que transforman la industria.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              id={service.id}
              data-index={index}
              className={`transition-all duration-700 scroll-mt-24 ${visibleCards[index]
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="relative h-full p-8 overflow-hidden transition-all duration-500 border group bg-background/50 border-gold/20 hover:border-gold/50 hover:shadow-gold/20">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold group-hover:shadow-gold/30 transition-shadow duration-500">
                      {service.icon}
                    </div>
                    <Link to={`/servicio/${service.id}`}>
                      <ArrowUpRight className="w-8 h-8 transition-all duration-300 text-gold/50 group-hover:text-gold group-hover:scale-110" />
                    </Link>
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white font-serif">
                      {service.title}
                    </h3>
                    <span className="text-sm text-sky-blue">{service.subtitle}</span>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-100">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>
                <Link to={`/servicio/${service.id}`} className="absolute inset-0 z-20" />
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-gray-400">
            ¿Necesitas una solución personalizada para tu negocio?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
          >
            <span className="border-b border-gold/50 hover:border-gold">
              Inicia tu consulta estratégica (Costo bonificable del proyecto final)
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
