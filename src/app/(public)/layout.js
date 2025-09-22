import { NaveBar } from "@/myComponents/NaveBar/NaveBar";
import Footer from "@/myComponents/Footer/Footer";
import WhatsAppButton from "@/myComponents/WhatsAppButton/WhatsAppButton";

export default function PublicLayout({ children }) {
  return (
    <>
      <NaveBar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}