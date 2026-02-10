import { buildPageMetadata } from '@/lib/page-metadata'
import HomePage from './HomePage'

export async function generateMetadata() {
  return buildPageMetadata('home', {
    title: 'Home',
    description: 'Professional furniture moving and packing services in Dubai and across UAE. Marhaba Movers & Packers offers reliable, affordable relocation solutions.',
  })
}

export default function Page() {
  return <HomePage />
}
