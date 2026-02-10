import { buildPageMetadata } from '@/lib/page-metadata';
import AboutPage from './AboutPage';

export async function generateMetadata() {
  return buildPageMetadata('about', {
    title: 'About Us',
    description: 'Learn about Marhaba Movers & Packers - your trusted partner for professional furniture moving services in Dubai and across the UAE.',
  });
}

export default function Page() {
  return <AboutPage />;
}
