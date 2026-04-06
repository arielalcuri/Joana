import { Award, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function Events() {
    return (
        <section id="eventos" className="relative w-full py-24 sm:py-32 bg-background overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>

            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">


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

                        <div className="p-6 rounded-2xl border border-white/5 bg-background/50 text-center col-span-2">
                            <Award className="w-8 h-8 text-gold mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white tracking-tighter">Sponsors Estratégicos</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Visibilidad Multinacional</p>
                        </div>
                    </div>
                </div>




            </div>
        </section>
    );
}
