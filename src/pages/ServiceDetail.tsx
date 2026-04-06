import { ArrowLeft, Workflow, Scale, CheckCircle2, BarChart3, Database, Shield, Zap } from 'lucide-react';
import { useEffect } from 'react';
import { TrackingPreview } from '@/components/TrackingPreview';
import { TokenizationPreview } from '@/components/TokenizationPreview';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Assuming useParams and Link are imported from react-router-dom
import { Button } from '@/components/ui/button'; // Assuming Button is imported from a UI library

const serviceData = {
    'evaluacion-legal': {
        title: 'Evaluación Legal de Proyectos Tecnológicos',
        subtitle: 'Detecto riesgos antes de que se conviertan en problemas',
        icon: <Scale className="w-12 h-12" />,
        description: 'Analizo proyectos basados en Inteligencia Artificial, plataformas digitales y Blockchain para identificar riesgos legales, brechas regulatorias y puntos críticos que pueden afectar su viabilidad.',
        details: [
            'Análisis de riesgos legales y regulatorios',
            'Detección de vulnerabilidades en el modelo de negocio',
            'Evaluación de cumplimiento',
            'Recomendaciones accionables'
        ],
        fullContent: 'Trabajo sobre estructuras reales, no teóricas: identifico dónde estás expuesto y qué necesitás corregir para avanzar con seguridad. Resultado: Un mapa claro de riesgos y decisiones estratégicas para operar sin incertidumbre.',
        ctaText: 'Solicitar evaluación'
    },
    'auditoria-ia': {
        title: 'Auditoría de Inteligencia Artificial',
        subtitle: 'Visión jurídica y estratégica',
        icon: <Database className="w-12 h-12" />,
        description: 'Audito sistemas de Inteligencia Artificial desde una perspectiva jurídica y estratégica, evaluando su impacto, riesgos y nivel de cumplimiento.',
        details: [
            'Análisis de riesgos y sesgos',
            'Evaluación de cumplimiento normativo',
            'Revisión de procesos automatizados',
            'Trazabilidad y gobernanza'
        ],
        fullContent: 'No se trata solo de revisar algoritmos, sino de entender cómo afectan derechos, decisiones y responsabilidad legal. Resultado: Sistemas de IA auditables, defendibles y sostenibles en el tiempo.',
        ctaText: 'Auditar mi sistema'
    },
    'blockchain': {
        title: 'Blockchain & Smart Contracts',
        subtitle: 'Lógica tecnológica a estructura legal',
        icon: <Workflow className="w-12 h-12" />,
        description: 'Diseño y valido la estructura jurídica detrás de proyectos basados en Blockchain y Smart Contracts para que sean legalmente ejecutables y sostenibles.',
        details: [
            'Estructuración jurídica de activos digitales',
            'Diseño legal de tokenización',
            'Validación de smart contracts',
            'Cumplimiento regulatorio'
        ],
        fullContent: 'Transformo lógica tecnológica en estructura legal real. Resultado: Proyectos Blockchain con base jurídica sólida, listos para escalar.',
        ctaText: 'Estructurar mi proyecto'
    },
    'mitigacion': {
        title: 'Mitigación de Riesgos Tecnológicos',
        subtitle: 'Reduzco riesgos preventivamente',
        icon: <Shield className="w-12 h-12" />,
        description: 'Identifico y reduzco riesgos legales en entornos digitales antes de que impacten en tu operación, reputación o modelo de negocio.',
        details: [
            'Análisis de exposición legal',
            'Identificación de contingencias',
            'Diseño de estrategias de mitigación',
            'Recomendaciones preventivas'
        ],
        fullContent: 'Trabajo de forma preventiva, estratégica y orientada a decisiones. Resultado: Menor incertidumbre, mayor control y decisiones con respaldo jurídico.',
        ctaText: 'Reducir mis riesgos'
    },
    'estrategia-legaltech': {
        title: 'Estrategia Legal Tech',
        subtitle: 'Decisiones legales continuas',
        icon: <Zap className="w-12 h-12" />,
        description: 'Acompaño a empresas y organizaciones que trabajan con tecnología en su toma de decisiones legales de forma continua.',
        details: [
            'Asesoramiento estratégico mensual',
            'Revisión de proyectos',
            'Soporte en decisiones críticas',
            'Actualización regulatoria'
        ],
        fullContent: 'Este servicio está pensado para quienes necesitan criterio, velocidad y visión. Resultado: Decisiones más rápidas, con respaldo legal sólido.',
        ctaText: 'Trabajar juntos'
    },
    'gestor-bloques': {
        title: 'Arquitectura Jurídica de Innovación',
        subtitle: 'Gestor de Producción en Bloques',
        icon: <BarChart3 className="w-12 h-12" />,
        description: 'Diseño la estructura legal completa de proyectos tecnológicos complejos, integrando regulación, riesgos, ejecución y escalabilidad.',
        details: [
            'Diseño integral legal del proyecto',
            'Estructuración de gobernanza',
            'Validación de ejecución',
            'Estrategia de escalabilidad'
        ],
        fullContent: 'Este servicio está orientado a organizaciones que no pueden improvisar. Resultado: Una base jurídica sólida sobre la cual construir, crecer e innovar sin riesgos estructurales.',
        ctaText: 'Diseñar mi estructura legal'
    }
};

export function ServiceDetail() {
    const { id } = useParams();
    const service = serviceData[id as keyof typeof serviceData];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-white">
                <div className="text-center">
                    <h2 className="text-3xl font-serif mb-4">Servicio no encontrado</h2>
                    <Link to="/">
                        <Button className="bg-gold text-black">Volver al inicio</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4">
                <Link to="/" className="inline-flex items-center text-gold hover:text-gold-light mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al inicio
                </Link>

                <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
                    <div className="p-6 rounded-2xl bg-gold/10 text-gold border border-gold/20 shadow-lg shadow-gold/5">
                        {service.icon}
                    </div>
                    <div>
                        <span className="text-sky-blue text-sm tracking-widest uppercase mb-2 block">{service.subtitle}</span>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">{service.title}</h1>
                        <p className="text-xl text-gray-400 leading-relaxed italic border-l-4 border-gold/30 pl-6">
                            "{service.description}"
                        </p>
                    </div>
                </div>

                <div className="grid gap-12 md:grid-cols-2 mb-20">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-serif text-gold">Características Principales</h2>
                        <ul className="space-y-4">
                            {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-300">
                                    <CheckCircle2 className="w-5 h-5 text-gold mt-1 shrink-0" />
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gold/5 border border-gold/10 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold font-serif text-white mb-6">Nuestra Propuesta de Valor</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            {service.fullContent}
                        </p>
                        <Link to="/#contacto">
                            <Button className="w-full bg-gold text-black hover:bg-gold-light">
                                {(service as any).ctaText || 'Iniciar Consulta Técnica'}
                            </Button>
                        </Link>
                    </div>
                </div>

                {id === 'arquitectura-juridica' && (
                    <>
                        <div className="mb-20">
                            <TrackingPreview />
                        </div>
                        <div className="mb-20">
                            <TokenizationPreview />
                        </div>
                    </>
                )}

                {id === 'blockchain' && (
                    <>
                        <div className="mb-20">
                            <TrackingPreview />
                        </div>
                        <div className="mb-20">
                            <TokenizationPreview />
                        </div>
                    </>
                )}

                <div className="text-center p-12 rounded-3xl bg-gradient-to-b from-background to-gold/5 border border-gold/10">
                    <h3 className="text-2xl font-serif mb-6">¿Listo para llevar tu proyecto al siguiente nivel?</h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Nuestro equipo de expertos en tecnología y derecho está listo para asesorarte en la implementación
                        de soluciones disruptivas.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/#contacto">
                            <Button size="lg" className="bg-gold text-black px-8">Iniciar Consulta Estratégica</Button>
                        </Link>
                        <Button size="lg" variant="outline" className="border-gold text-gold px-8 italic">Costo bonificable del proyecto final</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
