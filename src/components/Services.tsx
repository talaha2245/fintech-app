import { useRef } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ServiceCard from './ServiceCard';


const Services = () => {
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} id="services" className="py-32 bg-[#080808] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24 md:text-center max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-xl">
                        Comprehensive Digital <br /><span className="text-gray-500">Solutions</span>
                    </h2>
                    <p className="text-gray-300 text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                        We deliver end-to-end technology platforms that drive growth, efficiency, and customer engagement for enterprises worldwide.
                    </p>
                </div>
                <ScrollStack className='flex flex-col gap-20'>
                    <ScrollStackItem>
                        <ServiceCard
                            productName="MoniFy - payment gateway"
                            productImage="/images/MoniFypaymentgateway.photo.png"
                            description="provide a secure, seamless payment infrastructure that enables businesses to accept, authorize, and settle online transactions instantly and reliably"
                        />
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <ServiceCard
                            productName="Monex B2B payment collection Tool"
                            productImage="/images/MonexPaymentCollectionphoto.png"
                            description="We helped SOBRAGA eliminate revenue leakage by digitizing and centralizing vendor payment collections through an integrated Airtel Money solution, increasing efficiency and overall revenue capture"
                        />
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <ServiceCard
                            productName="Games "
                            productImage="/images/Gemini_Generated_Image_game.png"
                            description="Our white-label game digital portal offers mobile customers an immersive gaming experience. With a revenue-sharing model, it's the perfect solution for businesses to engage users and boost profits!"
                        />
                    </ScrollStackItem>
                </ScrollStack>
            </div>
        </section>
    );
};

export default Services;
