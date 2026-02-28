import { ArrowLeft, Workflow, Scale, CheckCircle2, BarChart3, Database } from 'lucide-react';
import { useEffect } from 'react';
import { TrackingPreview } from '@/components/TrackingPreview';
import { TokenizationPreview } from '@/components/TokenizationPreview';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Assuming useParams and Link are imported from react-router-dom
import { Button } from '@/components/ui/button'; // Assuming Button is imported from a UI library

const serviceData = {
    'asesoria': {
        title: 'Asesoramiento Técnico-Legal',
        subtitle: 'Revisión & Análisis Jurídico',
        icon: <Scale className="w-12 h-12" />,
        description: 'Consultoría jurídica especializada en la intersección de la ley y la tecnología. Ofrecemos análisis profundo, revisión de contratos y mediaciones técnicas.',
        details: [
            'Mediaciones: Resolución de conflictos tecnológicos y contractuales.',
            'Análisis Jurídico: Revisión exhaustiva de riesgos legales en plataformas digitales.',
            'Análisis por Hora: Asesoramiento detallado y personalizado bajo demanda.',
            'Auditoría de Cumplimiento: Verificación de normativas locales e internacionales.'
        ],
        fullContent: 'En LexAI no hacemos asesoría genérica. Nuestro equipo jurídico está capacitado en derecho informático y blockchain, permitiendo una revisión que comprende tanto el código legal como el código fuente. Facilitamos mediaciones que evitan litigios costosos mediante el entendimiento técnico.'
    },
    'asesoria-financiera': {
        title: 'Asesoramiento Financiero',
        subtitle: 'Dinero Digital & Smart Contracts',
        icon: <BarChart3 className="w-12 h-12" />,
        description: 'Construimos tu infraestructura financiera sobre la base del dinero digital y los contratos inteligentes autoejecutables.',
        details: [
            'Modelos de Tokenización: Diseño de activos inmobiliarios, financieros y arte.',
            'Smart Contracts Framework: Definición de reglas autoejecutables seguras.',
            'Planificación Financiera Digital: Estructuración de flujos de pago y liquidez.',
            'Dinero 3.0: Implementación de modelos DeFi y Crowdfunding.'
        ],
        fullContent: 'El dinero digital es la base de la nueva economía. No solo asesoramos en finanzas; construimos infraestructuras donde cada transacción es segura, automática y transparente mediante contratos inteligentes.'
    },
    'automatizacion': {
        title: 'Innovación & Automatización',
        subtitle: 'Eficiencia Operativa Disruptiva',
        icon: <Workflow className="w-12 h-12" />,
        description: 'Optimizamos tus procesos mediante la automatización de flujos de trabajo e investigación de trazabilidad inmutable mediante blockchain.',
        details: [
            'Automatización de Procesos: Reducción drástica de tareas manuales repetitivas.',
            'Control de Trazabilidad: Seguimiento inmutable de activos y documentos.',
            'Infraestructura de Datos: Construcción de repositorios distribuidos y seguros.',
            'Análisis Predictivo: IA aplicada a la optimización de procesos de producción.'
        ],
        fullContent: 'La innovación no es una opción, es una necesidad. LexAI diseña infraestructuras que garantizan que cada paso de tu proceso sea auditable, transparente y automático, eliminando el error humano y maximizando la trazabilidad.'
    },
    'marketplace-genetica': {
        title: 'Marketplace de Genética',
        subtitle: 'Trazabilidad Blockchain (NFT)',
        icon: <Database className="w-12 h-12" />,
        description: 'Desarrollamos plataformas de comercialización de semen y embriones donde la historia clínica y genealógica sea inalterable.',
        details: [
            'Pasaporte Digital (NFT): Identificación inmutable para cada unidad genética.',
            'Certificación de Sanidad: Registro de libre de enfermedades verificable.',
            'Eficiencia de Conversión (RFI): Pruebas de rendimiento integradas en el historial.',
            'Huella de Carbono: Seguimiento de impacto ambiental del animal de origen.'
        ],
        fullContent: 'Nuestro diferencial radica en la creación de un ecosistema de confianza para el sector ganadero. Cada pajuela o embrión cuenta con un Pasaporte Digital que incluye datos de rendimiento financiero basados en proyecciones de mercado externo.'
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
                                Iniciar Consulta Técnica
                            </Button>
                        </Link>
                    </div>
                </div>

                {id === 'automatizacion' && (
                    <div className="mb-20">
                        <TrackingPreview />
                    </div>
                )}

                {id === 'asesoria-financiera' && (
                    <div className="mb-20">
                        <TokenizationPreview />
                    </div>
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
