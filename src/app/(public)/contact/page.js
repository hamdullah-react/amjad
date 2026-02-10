import { buildPageMetadata } from '@/lib/page-metadata';
import ContactPage from './ContactPage';

export async function generateMetadata() {
  return buildPageMetadata('contact', {
    title: 'Contact Us',
    description: 'Get in touch with Marhaba Movers & Packers. Request a free quote for furniture moving services in Dubai and UAE.',
  });
}

export default function Page() {
  return <ContactPage />;
}
