import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { About } from '@/sections/About';
import { WhyWorkWithMe } from '@/sections/WhyWorkWithMe';
import { Events } from '@/sections/Events';
import { Contact } from '@/sections/Contact';

export function Home() {
    return (
        <>
            <Hero />
            <Services />
            <About />
            <WhyWorkWithMe />
            <Events />
            <Contact />
        </>
    );
}
