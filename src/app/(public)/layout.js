"use client"

import { NaveBar } from "@/myComponents/NaveBar/NaveBar";
import Footer from "@/myComponents/Footer/Footer";
import WhatsAppButton from "@/myComponents/WhatsAppButton/WhatsAppButton";
import { ContactProvider } from "@/contexts/contact-context";
import { HeroSliderProvider } from "@/contexts/hero-slider-context";
import { WelcomeProvider } from "@/contexts/welcome-context";
import { AboutProvider } from "@/contexts/AboutContext";

export default function PublicLayout({ children }) {
  return (
    <ContactProvider>
      <HeroSliderProvider>
        <WelcomeProvider>
             <AboutProvider>

          <NaveBar />
          {children}
          <Footer />
             </AboutProvider>
          <WhatsAppButton />
        </WelcomeProvider>
      </HeroSliderProvider>
    </ContactProvider>
  );
}