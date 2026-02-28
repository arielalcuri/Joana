import { ShieldCheck, Calendar, Hash, MapPin, Download, Share2, Award, FileBadge, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface CertificateProps {
    data: {
        trackingId: string;
        hash: string;
        origin: string;
        destination: string;
        date: string;
        provider: { name: string; logo: string };
        verifiedAccount?: string;
    };
    onClose: () => void;
}

export function TraceabilityCertificate({ data, onClose }: CertificateProps) {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        setIsDownloading(true);

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 3, // Mayor calidad para impresión
                useCORS: true,
                backgroundColor: '#18181c',
                logging: false,
                windowWidth: 1200 // Ancho fijo para consistencia
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Certificado-Joana Del Fabro-${data.trackingId}.pdf`);
        } catch (error) {
            console.error('Error generando PDF:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-4xl max-h-[90vh] bg-background border-2 border-gold/30 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] animate-in zoom-in-95 duration-500 flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div ref={certificateRef} className="relative bg-background min-h-fit">
                        {/* Certificate Border Pattern */}
                        <div className="absolute inset-4 border border-gold/10 pointer-events-none rounded-[1.5rem]" />

                        {/* Watermark Logo */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                            <Award className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] text-gold" />
                        </div>

                        <div className="relative p-8 md:p-12 flex flex-col items-center">
                            {/* Header */}
                            <div className="w-full flex justify-between items-start mb-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center text-black">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-serif text-white tracking-tighter">LEXAI <span className="text-gold">GLOBAL</span></h2>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none">Blockchain Legal Verification</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gold font-bold text-xs uppercase tracking-widest mb-1">Certificado Nº</p>
                                    <p className="text-white font-mono text-lg">{data.hash.substring(0, 12).toUpperCase()}</p>
                                </div>
                            </div>

                            {/* Main Title */}
                            <div className="text-center mb-10 md:mb-16">
                                <h1 className="text-2xl md:text-5xl font-serif text-white mb-2 md:mb-4">Certificado de Trazabilidad Inmutable</h1>
                                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                                <p className="mt-4 md:mt-6 text-gray-400 max-w-xl mx-auto italic text-xs md:text-base">
                                    Se certifica mediante este documento que la unidad logística identificada ha sido registrada y verificada a través de nodos Blockchain distribuidos, garantizando la integridad absoluta de su historial de movimientos.
                                </p>
                            </div>

                            {/* Certificate Content Grid */}
                            <div className="w-full grid md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                            <Hash className="w-5 h-5 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Identificador de Envío</p>
                                            <p className="text-xl font-bold font-mono">{data.trackingId}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                            <MapPin className="w-5 h-5 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Ruta Certificada</p>
                                            <p className="text-sm font-medium">{data.origin} ➔ {data.destination}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                            <Award className="w-5 h-5 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Proveedor Logístico</p>
                                            <p className="text-lg font-bold">{data.provider.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                            <Calendar className="w-5 h-5 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Fecha de Certificación</p>
                                            <p className="text-lg font-bold">{data.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Verification Hash Footer */}
                            <div className="w-full p-6 rounded-2xl bg-gold/5 border border-gold/20 mb-12 group relative">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[10px] text-gold uppercase font-bold tracking-widest underline">Firma Digital & Hash de Verificación (SHA-256)</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(data.hash);
                                            alert('Hash copiado al portapapeles');
                                        }}
                                        className="text-[10px] text-gold/50 hover:text-gold flex items-center gap-1 transition-colors bg-gold/10 px-2 py-1 rounded"
                                    >
                                        <Share2 className="w-3 h-3" /> Copiar Hash
                                    </button>
                                </div>
                                <p className="text-[10px] md:text-xs text-center font-mono text-gray-400 break-all leading-relaxed px-4">
                                    {data.hash}
                                </p>
                            </div>

                            {/* Footer Signatures */}
                            <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-8">
                                <div className="flex-1 w-full border-t border-gray-800 pt-4 text-center">
                                    <p className="text-[10px] font-mono text-gold/60 uppercase italic mb-1 tracking-tighter">BFA Institutional Node</p>
                                    <div className="h-8 flex items-center justify-center mb-1 text-white font-serif italic text-base opacity-80">
                                        Joana Del Fabro
                                    </div>
                                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Legal Systems Director</p>
                                    {data.verifiedAccount && (
                                        <p className="text-[7px] text-gray-500 font-mono mt-2 break-all opacity-50">
                                            Account: {data.verifiedAccount}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col items-center gap-2 md:gap-4 order-first md:order-none">
                                    <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-gold/20 rounded-full flex items-center justify-center p-2 bg-white">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`http://bfaexplorer.com.ar/address/${data.verifiedAccount || '0xd7ff9a09a145b5e41a59d779c86ca1e55a1a6f29'}`)}&color=000000&bgcolor=ffffff`}
                                            alt="QR"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <p className="text-[8px] text-gray-600 uppercase font-bold tracking-[0.2em]">Verificar Cuenta en BFA</p>
                                </div>

                                <div className="flex-1 w-full border-t border-gray-800 pt-4 text-center">
                                    <p className="text-[10px] font-mono text-gold/60 uppercase italic mb-1 tracking-tighter">TSA Protocol v2.0</p>
                                    <div className="h-8 flex items-center justify-center mb-1 text-gold italic font-bold text-xs">
                                        Sello de Tiempo Certificado
                                    </div>
                                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Autonomous Authority</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-background/80 p-6 flex justify-between items-center border-t border-white/5 backdrop-blur-md">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors text-sm font-serif"
                    >
                        Cerrar Visualización
                    </button>
                    <div className="flex gap-4">
                        <Button
                            variant="secondary"
                            className="bg-background/40 text-gold border-gold/20 hover:bg-background/60 text-xs gap-2"
                            onClick={() => {
                                const receipt = {
                                    hash: data.hash,
                                    timestamp: data.date,
                                    account: data.verifiedAccount,
                                    network: 'Blockchain Federal Argentina',
                                    standard: 'TSA-BFA-v2.0'
                                };
                                const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `recibo-bfa-${data.trackingId}.rd`;
                                a.click();
                            }}
                        >
                            <FileBadge className="w-4 h-4" /> Recibo .rd (BFA)
                        </Button>
                        <Button variant="outline" className="border-white/10 text-white gap-2 text-xs">
                            <Share2 className="w-3 h-3" /> Compartir
                        </Button>
                        <Button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="bg-gold text-black hover:bg-gold-light gap-2 text-xs font-bold px-8 shadow-lg shadow-gold/20"
                        >
                            {isDownloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Procesando...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4" /> Descargar PDF
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
