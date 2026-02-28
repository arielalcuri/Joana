import { useEffect, useRef, useState } from 'react';
import { Award, Users, Globe, Play, ExternalLink, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const events = [
    {
        title: 'Buenos Aires Tech Week',
        date: 'Octubre 2025',
        location: 'Sede Central ITBA',
        description: 'Presentación de Joana Del Fabro ante el ecosistema startup regional. Pitching de tokenización de activos.',
        category: 'Conferencia',
        image: 'https://images.unsplash.com/photo-1540575861501-7ad0582282fb?auto=format&fit=crop&q=80',
    },
    {
        title: 'Expo Rural - Innovación',
        date: 'Julio 2025',
        location: 'Predio Ferial La Rural',
        description: 'Demostración de trazabilidad blockchain aplicada al sector agroindustrial.',
        category: 'Exposición',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80',
    },
    {
        title: 'Parque de Innovación',
        date: 'Agosto 2025',
        location: 'CABA, Argentina',
        description: 'Networking exclusivo con líderes mundiales de tecnología legal y financiera.',
        category: 'Networking',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    },
];

export function Events() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="eventos" className="relative w-full py-24 sm:py-32 bg-background overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>

            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto mb-20 text-center">
                    <span className="inline-block px-4 py-2 mb-6 text-sm tracking-wider uppercase border rounded-full text-gold border-gold/30 bg-gold/5">
                        Capital Social & Trayectoria
                    </span>
                    <h2 className="text-4xl font-bold text-white sm:text-5xl font-serif">
                        Presencia <span className="text-gradient-gold">Global</span> & Networking
                    </h2>
                    <p className="mt-6 text-lg text-gray-400">
                        Conectamos con los polos tecnológicos más importantes del mundo para mostrar el respaldo
                        y la solidez de Joana Del Fabro. Networking disruptivo y alianzas estratégicas.
                    </p>
                </div>

                {/* Highlight Stats / Networking Concept */}
                <div className="grid gap-8 md:grid-cols-2 mb-16">
                    <Card className="p-8 bg-gradient-to-br from-gold/10 to-transparent border-gold/20 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                            <Zap className="w-8 h-8 text-gold" />
                            <h3 className="text-2xl font-serif text-white font-bold">Networking Crowdfunding</h3>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Organizamos sesiones exclusivas de networking donde proyectos se fusionan bajo el modelo Coworking 3.0.
                            Acceso exclusivo mediante contribución (Crypto / USD).
                        </p>
                        <div className="flex gap-4">
                            <span className="px-3 py-1 rounded bg-gold/10 text-gold text-xs font-bold border border-gold/20 uppercase tracking-widest">Invitados Especiales</span>
                            <span className="px-3 py-1 rounded bg-sky-blue/10 text-sky-blue text-xs font-bold border border-sky-blue/20 uppercase tracking-widest">Fusión de Redes</span>
                        </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-2xl border border-white/5 bg-background/50 text-center">
                            <Users className="w-8 h-8 text-gold mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">500+</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Participantes</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/5 bg-background/50 text-center">
                            <Globe className="w-8 h-8 text-gold mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">12+</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Hubs Globales</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/5 bg-background/50 text-center col-span-2">
                            <Award className="w-8 h-8 text-gold mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white tracking-tighter">Sponsors Estratégicos</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Visibilidad Multinacional</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {events.map((event, index) => (
                        <div
                            key={event.title}
                            className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group-hover:border-gold/50 transition-colors duration-500">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="px-3 py-1 rounded-full bg-gold text-black text-[10px] font-bold uppercase tracking-widest">
                                            {event.category}
                                        </span>
                                        <h3 className="mt-4 text-2xl font-bold text-white font-serif leading-tight">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 text-gold text-xs font-mono">
                                            <Play className="w-3 h-3 fill-current" /> Ver Resumen Visual
                                        </div>
                                    </div>

                                    <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                            {event.description}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] text-gray-500 uppercase tracking-widest">
                                            <span>{event.location}</span>
                                            <span>{event.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="px-8 py-4 bg-transparent border border-gold/30 text-gold rounded-full hover:bg-gold hover:text-black transition-all duration-500 font-bold uppercase tracking-widest text-xs flex items-center gap-3 mx-auto group">
                        Explorar Galería de Media Completa
                        <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
