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

          <NaveBar />
          {children}
          <Footer />
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