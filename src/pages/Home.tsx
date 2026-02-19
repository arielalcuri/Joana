import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { About } from '@/sections/About';
import { Events } from '@/sections/Events';
import { Contact } from '@/sections/Contact';

export function Home() {
    return (
        <>
            <Hero />
            <Services />
            <About />
            <Events />
            <Contact />
        </>
    );
}
