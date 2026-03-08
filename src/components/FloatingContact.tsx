import { MessageCircle, Send as Telegram } from 'lucide-react';

export function FloatingContact() {
    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
            {/* WhatsApp Button */}
            <a
                href="https://wa.me/5491130062366"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce-slow"
                aria-label="Contactar por WhatsApp"
            >
                <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping-slow opacity-30" />
                <MessageCircle className="w-8 h-8 relative z-10" />

                {/* Tooltip */}
                <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-md border border-white/10 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-2xl">
                    WhatsApp
                </span>
            </a>

            {/* Telegram Button */}
            <a
                href="https://t.me/JoaDFTec"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0088cc] text-white shadow-[0_0_20px_rgba(0,136,204,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce-slow-delay"
                aria-label="Contactar por Telegram"
            >
                <div className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping-slow opacity-30" />
                <Telegram className="w-7 h-7 rotate-[-20deg] translate-x-[-1px] relative z-10" />

                {/* Tooltip */}
                <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-md border border-white/10 text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-2xl">
                    Telegram
                </span>
            </a>
        </div>
    );
}
