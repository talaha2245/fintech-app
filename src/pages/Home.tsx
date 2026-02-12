import Hero from '../components/Hero';
import Services from '../components/Services';
import CoFounder from '../components/CoFounder';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <main className="bg-black min-h-screen relative w-full overflow-hidden">
            <div className="relative z-10">
                <Hero />
                <Services />
                <CoFounder />
                <Contact />
            </div>
        </main>
    );
};

export default Home;
