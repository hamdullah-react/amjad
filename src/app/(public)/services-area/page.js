import { buildPageMetadata } from '@/lib/page-metadata';
import ServicesAreaPage from './ServicesAreaPage';

export async function generateMetadata() {
  return buildPageMetadata('services-area', {
    title: 'Service Areas',
    description: 'Professional furniture moving services across all UAE Emirates including Dubai, Abu Dhabi, Sharjah, and more.',
  });
}

export default function Page() {
  return <ServicesAreaPage />;
}
