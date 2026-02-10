import { buildPageMetadata } from '@/lib/page-metadata';
import ServicesPage from './ServicesPage';

export async function generateMetadata() {
  return buildPageMetadata('services', {
    title: 'Our Services',
    description: 'Professional furniture moving, packing, and relocation services in Dubai and across UAE. Affordable rates with quality guarantee.',
  });
}

export default function Page() {
  return <ServicesPage />;
}
