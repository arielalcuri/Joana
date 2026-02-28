import { useState } from 'react';
import {
    Search,
    Package,
    ShieldCheck,
    Thermometer,
    Droplets,
    FileBadge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TraceabilityCertificate } from '@/components/TraceabilityCertificate';
import { bfaService } from '@/services/bfaService';

const providers = {
    CORREO_ARG: {
        name: 'Correo Argentino',
        logo: 'CA',
        apiDocs: 'https://www.correoargentino.com.ar/MiCorreo/public/img/pag/apiPaqAr-v2.pdf'
    },
    LEXAI_GLOBAL: {
        name: 'LexAI Global Node',
        logo: 'LX',
    }
};

const MOCK_DATA = {
    'TC274253325AR': {
        provider: providers.CORREO_ARG,
        origin: 'CABA, Buenos Aires, AR',
        transit: 'Centro de Distribución Regional',
        destination: 'Domicilio Particular, AR',
        status: 'EN CAMINO AL DESTINO',
        date: '19 Feb, 2026',
        hash: 'CERT-CA-TC274253325AR',
        events: [
            { status: 'EN PODER DEL CARTERO', location: 'Sucursal Regional', date: '19/02/2026 09:30', type: 'Logistics' },
            { status: 'LLEGADA AL CENTRO DE DISTRIBUCIÓN', location: 'Planta Logística', date: '18/02/2026 18:20', type: 'Logistics' },
            { status: 'INGRESO AL SISTEMA', location: 'Sucursal Origen', date: '18/02/2026 11:15', type: 'Logistics' }
        ],
        step: 3
    },
    'CA-993822-AR': {
        provider: providers.CORREO_ARG,
        origin: 'Sucursal 14 - Córdoba, AR',
        transit: 'CTP-BUE GRANDES CLIENTES',
        destination: 'Sucursal Retiro, CABA',
        status: 'EN PROCESO DE CLASIFICACIÓN',
        date: '19 Feb, 2026',
        hash: 'CA-API-v2-TX-99234',
        events: [
            { status: 'PREIMPOSICION', location: 'Plataforma Web', date: '18/02/2026 10:00', type: 'System' },
            { status: 'INGRESO AL SISTEMA', location: 'Sucursal 14 - CBA', date: '18/02/2026 15:30', type: 'Logistics' },
            { status: 'EN PROCESO DE CLASIFICACIÓN', location: 'CTP-BUE', date: '19/02/2026 08:45', type: 'Logistics' }
        ],
        step: 2
    },
    '7107307480': {
        provider: { name: 'DHL Express', logo: 'DHL' },
        origin: 'Miami Gateway, US',
        transit: 'Vitoria-Gasteiz, ES',
        destination: 'Buenos Aires, AR',
        status: 'SHIPMENT DELIVERED',
        date: '10 Jan, 2024',
        hash: 'DHL-EXP-7107307480-VERIFIED',
        events: [
            { status: 'Shipment delivered', location: 'Buenos Aires, AR', date: '10/01/2024 14:20', type: 'Logistics' },
            { status: 'Processed at BUENOS AIRES - ARGENTINA', location: 'Buenos Aires, AR', date: '10/01/2024 09:15', type: 'Logistics' },
            { status: 'Arrived at DHL Delivery Facility', location: 'Buenos Aires, AR', date: '09/01/2024 18:30', type: 'Logistics' },
            { status: 'Departed Facility in MIAMI - USA', location: 'Miami, US', date: '08/01/2024 22:10', type: 'Logistics' }
        ],
        step: 3
    },
    'LX-GLOBAL-001': {
        provider: providers.LEXAI_GLOBAL,
        origin: 'Pekín, CN',
        transit: 'Aduana de Buenos Aires, AR',
        destination: 'Rosario, AR',
        status: 'In Transit',
        date: 'Estimado: 25 Feb, 2026',
        hash: '0x882a93145b5e41a59d779c86ca1e55a1a6f29d779c86ca1e55a1a6f29ff92c',
        temp: '15.5°C',
        humidity: '40%',
        step: 2
    }
};

export function TrackingPreview() {
    const [trackingId, setTrackingId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [currentData, setCurrentData] = useState<any>(null);
    const [showCertificate, setShowCertificate] = useState(false);
    const [currentTrackingId, setCurrentTrackingId] = useState('');

    const mapCAResponse = (data: any) => {
        // Convierte la respuesta cruda de CA a nuestro formato visual
        const shipment = data[0] || data;
        const lastEvent = shipment.event && shipment.event[0] ? shipment.event[0] : { status: 'PENDIENTE', facility: 'ORIGEN' };

        return {
            provider: providers.CORREO_ARG,
            origin: 'Verificado API',
            transit: lastEvent.facility,
            destination: 'En Destino',
            status: lastEvent.status,
            date: lastEvent.date,
            hash: `API-LIVE-${shipment.trackingNumber}`,
            events: shipment.event?.map((e: any) => ({
                status: e.status,
                location: e.facility,
                date: e.date,
                type: 'Logistics'
            })),
            step: 2
        };
    };

    const handleSearch = async (e?: React.FormEvent, id?: string) => {
        if (e) e.preventDefault();
        const searchId = (id || trackingId).trim().toUpperCase();
        if (!searchId) return;

        setIsSearching(true);
        setCurrentData(null);
        setCurrentTrackingId(searchId);

        try {
            const isCA = searchId.startsWith('TC') || searchId.startsWith('CA');
            const type = isCA ? 'ca' : 'dhl';
            const response = await fetch(`http://localhost:3000/api/track/${type}/${searchId}`);

            if (response.ok) {
                const data = await response.json();
                if (isCA) {
                    setCurrentData(mapCAResponse(data));
                } else {
                    // Mapeo para DHL real
                    setCurrentData({
                        provider: { name: 'DHL Express', logo: 'DHL' },
                        origin: data.shipments?.[0]?.origin?.address?.addressLocality || 'Internacional',
                        transit: data.shipments?.[0]?.status?.location?.address?.addressLocality || 'En Tránsito',
                        destination: data.shipments?.[0]?.destination?.address?.addressLocality || 'Buenos Aires, AR',
                        status: data.shipments?.[0]?.status?.status || 'Procesando',
                        date: data.shipments?.[0]?.status?.timestamp || new Date().toISOString(),
                        hash: `DHL-EXP-${searchId}-VERIFIED`,
                        events: data.shipments?.[0]?.events?.map((ev: any) => ({
                            status: ev.status,
                            location: ev.location?.address?.addressLocality,
                            date: ev.timestamp,
                            type: 'Logistics'
                        })) || [],
                        step: 2
                    });
                }
            } else {
                throw new Error('Fallback to mock');
            }
        } catch (error) {
            console.warn('Usando Mock Data para:', searchId);
            setTimeout(() => {
                const mock = MOCK_DATA[searchId as keyof typeof MOCK_DATA];
                if (mock) {
                    setCurrentData(mock);
                } else {
                    const isCA = searchId.startsWith('TC') || searchId.startsWith('CA');
                    setCurrentData(isCA ? MOCK_DATA['TC274253325AR'] : MOCK_DATA['7107307480']);
                }
            }, 500);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 200 Q 200 100 400 200 T 750 200" stroke="hsl(var(--gold))" strokeWidth="1" strokeDasharray="5 5" />
                    <path d="M50 200 Q 200 300 400 200 T 750 200" stroke="hsl(var(--sky-blue))" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
                </svg>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold font-serif text-white mb-4">
                            Trazabilidad <span className="text-gradient-gold">Multi-Plataforma</span>
                        </h2>
                        <p className="text-gray-400">
                            Integración nativa con <span className="text-gold">Correo Argentino (API v2.0)</span> y nodos globales Blockchain.
                            Centralizamos la logística nacional e internacional en un solo registro inmutable.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 pb-2">
                        <div className="px-3 py-1 rounded bg-zinc-800 border border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">API: Paq.Ar Online</span>
                        </div>
                    </div>
                </div>

                <div className="bg-background/40 border border-gold/20 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
                    <form onSubmit={(e) => handleSearch(e)} className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 w-5 h-5" />
                            <input
                                type="text"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                                placeholder="Introduzca Tracking ID (CA-... o LX-...)"
                                className="w-full bg-background/40 border border-gold/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-all"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isSearching}
                            className="bg-gold text-black hover:bg-gold-light px-10 h-14 text-lg font-medium"
                        >
                            {isSearching ? 'Sincronizando APIs...' : 'Consultar Estado'}
                        </Button>
                    </form>

                    <div className="flex flex-wrap gap-3 mb-12 justify-center">
                        {Object.keys(MOCK_DATA).map(id => (
                            <button
                                key={id}
                                onClick={() => { setTrackingId(id); handleSearch(undefined, id); }}
                                className="text-[10px] px-4 py-1.5 rounded-lg border border-gold/10 text-gray-400 hover:border-gold hover:text-gold transition-all bg-white/5 flex items-center gap-2"
                            >
                                <Package className="w-3 h-3" />
                                {id}
                            </button>
                        ))}
                    </div>

                    {currentData && (
                        <div className="animate-in fade-in zoom-in-95 duration-700">
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Status Column */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="flex items-center justify-between p-6 rounded-2xl bg-black/40 border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold font-bold text-xl border border-gold/20">
                                                {currentData.provider.logo}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase">Proveedor Logístico</p>
                                                <p className="text-white font-bold">{currentData.provider.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase">Estado Actual</p>
                                            <p className="text-sky-blue font-bold">{currentData.status}</p>
                                        </div>
                                    </div>

                                    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
                                        {currentData.events?.map((event: any, i: number) => (
                                            <div key={i} className="relative group">
                                                <div className={`absolute -left-[33px] top-1 w-5 h-5 rounded-full border-4 border-black transition-colors ${i === 0 ? 'bg-gold animate-pulse' : 'bg-zinc-700'}`} />
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-white font-bold text-sm">{event.status}</p>
                                                        <p className="text-xs text-gray-400">{event.location}</p>
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 font-mono">{event.date}</p>
                                                </div>
                                            </div>
                                        )) || (
                                                <div className="p-8 text-center text-gray-500 italic">
                                                    Cargando historial detallado...
                                                </div>
                                            )}
                                    </div>
                                </div>

                                {/* Sidebar Column */}
                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-gold/5 border border-gold/10">
                                        <h4 className="text-xs font-bold text-gold uppercase mb-4 flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4" /> Certificación Inmutable
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase">ID de Transacción</p>
                                                <p className="text-white font-mono text-xs break-all">{currentData.hash}</p>
                                            </div>
                                            {currentData.temp && (
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-3 rounded-lg bg-black/40">
                                                        <Thermometer className="w-4 h-4 text-sky-blue mb-1" />
                                                        <p className="text-white font-bold text-sm">{currentData.temp}</p>
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Temp.</p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-black/40">
                                                        <Droplets className="w-4 h-4 text-sky-blue mb-1" />
                                                        <p className="text-white font-bold text-sm">{currentData.humidity}</p>
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold">Hum.</p>
                                                    </div>
                                                </div>
                                            )}
                                            <Button
                                                onClick={async () => {
                                                    const realHash = await bfaService.generateLegalHash(currentTrackingId, currentData.events);
                                                    const bfaResult = await bfaService.sealOnBFA(realHash, currentTrackingId);
                                                    if (bfaResult) {
                                                        setCurrentData({
                                                            ...currentData,
                                                            hash: bfaResult.bfaHash,
                                                            date: new Date(bfaResult.timestamp).toLocaleString('es-AR'),
                                                            verifiedAccount: bfaResult.receipt?.verifiedAccount
                                                        });
                                                    }
                                                    setShowCertificate(true);
                                                }}
                                                variant="ghost"
                                                className="w-full text-xs text-gold hover:text-white hover:bg-gold/10 flex items-center gap-2 mt-4"
                                            >
                                                <FileBadge className="w-4 h-4" /> Generar Certificado Digital
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-background border border-white/5">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Información del Envío</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-xs text-gray-500">Origen:</span>
                                                <span className="text-xs text-white text-right">{currentData.origin}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs text-gray-500">Destino:</span>
                                                <span className="text-xs text-white text-right">{currentData.destination}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-12">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Integrado con</p>
                        <div className="flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                            <span className="text-white font-bold italic text-xl tracking-tighter">CORREO <span className="text-gold">ARGENTINO</span></span>
                            <span className="text-white font-bold text-xl tracking-tight">DHL <span className="text-sky-blue">EXPRESS</span></span>
                            <span className="text-white font-bold text-xl tracking-tight">FED<span className="text-gold">EX</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {showCertificate && currentData && (
                <TraceabilityCertificate
                    onClose={() => setShowCertificate(false)}
                    data={{
                        trackingId: currentTrackingId,
                        hash: currentData.hash,
                        origin: currentData.origin,
                        destination: currentData.destination,
                        date: currentData.date,
                        provider: currentData.provider
                    }}
                />
            )}
        </section>
    );
}
