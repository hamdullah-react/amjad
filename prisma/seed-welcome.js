const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedWelcomeSection() {
  try {
    // Check if welcome section already exists
    const existingSection = await prisma.welcomeSection.findFirst();

    if (existingSection) {
      console.log('Welcome section already exists');
      return;
    }

    // Create initial welcome section
    const welcomeSection = await prisma.welcomeSection.create({
      data: {
        title: 'Welcome To',
        subtitle: 'MARHABA FURNITURE',
        description: 'Your trusted partner for seamless furniture moving and packing services. We handle your belongings with the utmost care and professionalism.',
        ceoName: 'Amjadullah',
        ceoPosition: 'Chief Executive Officer',
        ceoMessage: 'We are committed to providing exceptional moving services that exceed your expectations. Your satisfaction is our top priority.',
        buttonText: 'Learn More',
        buttonUrl: '/about',
        features: [
          {
            title: 'Professional Service',
            description: 'Experienced team with years of expertise in furniture moving and packing.',
            icon: 'CheckCircle'
          },
          {
            title: 'Quality Guarantee',
            description: '100% satisfaction guaranteed with comprehensive insurance coverage.',
            icon: 'Award'
          },
          {
            title: 'Customer First',
            description: 'Dedicated customer support and personalized service for every client.',
            icon: 'Users'
          }
        ],
        stats: [
          { label: 'Happy Customers', value: '500+' },
          { label: 'Years Experience', value: '10+' }
        ],
        isActive: true
      }
    });

    console.log('Welcome section seeded successfully:', welcomeSection.id);
  } catch (error) {
    console.error('Error seeding welcome section:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedWelcomeSection();