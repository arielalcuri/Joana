import { useState } from 'react';
import {
    Building2,
    PieChart,
    ShieldCheck,
    Users,
    Gavel,
    TrendingUp,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function TokenizationPreview() {
    const [tokensToBuy, setTokensToBuy] = useState(1);
    const [hasVoted, setHasVoted] = useState(false);

    const assetData = {
        name: 'Edificio Luxury Tower - Madrid',
        totalValue: 5000000,
        tokenPrice: 100,
        totalTokens: 50000,
        tokensSold: 38500,
        apy: '8.5%',
        location: 'Barrio de Salamanca, Madrid, ES'
    };

    const progress = (assetData.tokensSold / assetData.totalTokens) * 100;
    const investment = tokensToBuy * assetData.tokenPrice;

    return (
        <section className="py-20 bg-background">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm tracking-widest uppercase mb-2 block">Demo de Plataforma</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-serif text-white mb-4">
                        Ecosistema de <span className="text-gradient-gold">Tokenización</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Visualiza cómo transformamos activos ilíquidos en oportunidades de inversión fraccionada y regulada.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Asset Card */}
                    <div className="bg-background/50 border border-gold/20 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
                        <div className="relative h-64 bg-zinc-800 flex items-center justify-center group">
                            <Building2 className="w-24 h-24 text-gold/20 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-white font-bold uppercase">Activo Verificado</span>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-gold text-black px-4 py-1 rounded-lg text-xs font-bold font-serif">
                                APY {assetData.apy}
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-white font-serif mb-2">{assetData.name}</h3>
                            <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                                <PieChart className="w-4 h-4 text-gold" />
                                {assetData.location}
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase mb-1">Valor Total</p>
                                    <p className="text-xl font-bold text-white">€{assetData.totalValue.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase mb-1">Precio Token</p>
                                    <p className="text-xl font-bold text-gold">€{assetData.tokenPrice}</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Tokens Vendidos</span>
                                    <span className="text-white font-bold">{progress.toFixed(1)}%</span>
                                </div>
                                <Progress value={progress} className="h-2 bg-background/80" />
                                <p className="text-[10px] text-gray-500 text-right">38,500 / 50,000 Tokens</p>
                            </div>

                            <div className="bg-background/40 border border-gold/10 p-6 rounded-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm text-gray-300">Tu Inversión</p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setTokensToBuy(Math.max(1, tokensToBuy - 1))}
                                            className="w-8 h-8 rounded-full border border-gold/30 text-gold flex items-center justify-center hover:bg-gold/10"
                                        >-</button>
                                        <span className="text-xl font-bold text-white w-8 text-center">{tokensToBuy}</span>
                                        <button
                                            onClick={() => setTokensToBuy(tokensToBuy + 1)}
                                            className="w-8 h-8 rounded-full border border-gold/30 text-gold flex items-center justify-center hover:bg-gold/10"
                                        >+</button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-gray-500">Total a invertir</span>
                                    <span className="text-2xl font-bold text-gold">€{investment.toLocaleString()}</span>
                                </div>
                                <Button className="w-full mt-6 bg-gold text-black hover:bg-gold-light font-serif">
                                    Invertir en Activo Fraccionado
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Features Column */}
                    <div className="space-y-8">
                        {/* Legal Wrapper Card */}
                        <div className="p-8 rounded-3xl border border-sky-blue/20 bg-sky-blue/5 hover:border-sky-blue/40 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-sky-blue/10 rounded-xl text-sky-blue">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white font-serif">Security Token Compliance</h4>
                                    <p className="text-xs text-sky-blue">Legal Wrapper & Regulación SEC/CNMV</p>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    'Contrato de Fideicomiso digitalizado',
                                    'Auditoría KYC/AML automatizada',
                                    'Derecho de cobro de rentas inmutable',
                                    'Resguardo legal ante el Registro de Propiedad'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-sky-blue" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Governance Simulation */}
                        <div className="p-8 rounded-3xl border border-gold/20 bg-gold/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gold/10 rounded-xl text-gold">
                                    <Gavel className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold text-white font-serif">Gobernanza Digital</h4>
                            </div>

                            <div className="bg-background/60 p-6 rounded-2xl border border-white/5">
                                <p className="text-sm font-medium text-white mb-4">Votación Activa #024: ¿Reinversión en eficiencia energética?</p>
                                {!hasVoted ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setHasVoted(true)}
                                            className="py-3 rounded-xl border border-green-500/30 text-green-500 text-sm font-bold hover:bg-green-500/10 transition-all"
                                        >SÍ (72%)</button>
                                        <button
                                            onClick={() => setHasVoted(true)}
                                            className="py-3 rounded-xl border border-red-500/30 text-red-500 text-sm font-bold hover:bg-red-500/10 transition-all"
                                        >NO (28%)</button>
                                    </div>
                                ) : (
                                    <div className="text-center py-2 animate-pulse">
                                        <p className="text-gold text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" /> Voto Registrado en Blockchain
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Market Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-background/50 rounded-2xl border border-white/5 text-center">
                                <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">+12%</p>
                                <p className="text-[10px] text-gray-500 uppercase italic">Plusvalía Anual</p>
                            </div>
                            <div className="p-6 bg-background/50 rounded-2xl border border-white/5 text-center">
                                <Users className="w-5 h-5 text-sky-blue mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">412</p>
                                <p className="text-[10px] text-gray-500 uppercase italic">Inversores</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
