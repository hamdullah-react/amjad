"use client"

import { NaveBar } from "@/myComponents/NaveBar/NaveBar";
import Footer from "@/myComponents/Footer/Footer";
import WhatsAppButton from "@/myComponents/WhatsAppButton/WhatsAppButton";
import { ContactProvider } from "@/contexts/contact-context";
import { HeroSliderProvider } from "@/contexts/hero-slider-context";
import { WelcomeProvider } from "@/contexts/welcome-context";
import { AboutProvider } from "@/contexts/AboutContext";
import { TeamProvider } from "@/contexts/TeamContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { ServicesProvider } from "@/contexts/ServicesContext";
import { ServiceAreasProvider } from "@/contexts/service-areas-context";
import { WhyChooseUsProvider } from "@/contexts/WhyChooseUsContext";
import { FAQProvider } from "@/contexts/FAQContext";

import RouteProgress from "@/components/ui/route-progress";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function PublicLayout({ children }) {
  return (
    <ContactProvider>
      <HeroSliderProvider>
        <WelcomeProvider>
             <AboutProvider>
   <TeamProvider>
<BlogProvider>
<ServicesProvider>
<ServiceAreasProvider>
<WhyChooseUsProvider>
 <FAQProvider>
          <RouteProgress />
          <ScrollToTop />
          <NaveBar />
    
            {children}
  
          <Footer />
 </FAQProvider>
</WhyChooseUsProvider>
</ServiceAreasProvider>
</ServicesProvider>
</BlogProvider>
   </TeamProvider>
             </AboutProvider>
          <WhatsAppButton />
        </WelcomeProvider>
      </HeroSliderProvider>
    </ContactProvider>
  );
}