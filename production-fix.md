# Production Fix for Welcome Section API

## Issue
Welcome section API not working on production in dashboard

## Possible Causes
1. Database migration not applied in production
2. Prisma client not regenerated after schema changes
3. Environment variables not set correctly

## Solution Steps

### 1. Check Production Logs
First, check your production logs to see the exact error:
```bash
# If using Vercel
vercel logs --output raw

# If using other hosting
# Check your hosting provider's logs
```

### 2. Regenerate Prisma Client
Run these commands locally and redeploy:

```bash
# Generate Prisma client
npx prisma generate

# Commit the changes
git add .
git commit -m "Regenerate Prisma client"
git push
```

### 3. Apply Database Migrations to Production

#### Option A: If you haven't created migrations yet
```bash
# Create migration from schema
npx prisma migrate dev --name add_welcome_section

# Push to production database directly (be careful!)
npx prisma db push
```

#### Option B: If migrations exist but not applied
```bash
# Deploy migrations to production
npx prisma migrate deploy
```

### 4. Verify Database Schema in Production
```bash
# Check if table exists in production
npx prisma db execute --sql "SELECT * FROM welcome_section LIMIT 1"

# Or use Prisma Studio to check
npx prisma studio
```

### 5. Environment Variables Check
Make sure these are set in your production environment:

```env
DATABASE_URL="your-production-database-url"
DIRECT_URL="your-direct-database-url"  # If using connection pooling
```

### 6. Manual Database Fix (if needed)
If the table doesn't exist in production, you can create it manually:

```sql
CREATE TABLE IF NOT EXISTS welcome_section (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  "ceoName" TEXT NOT NULL,
  "ceoPosition" TEXT DEFAULT 'Chief Executive Officer',
  "ceoMessage" TEXT NOT NULL,
  "buttonText" TEXT,
  "buttonUrl" TEXT,
  features JSONB NOT NULL,
  stats JSONB NOT NULL,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Test the API
After applying fixes, test the API:

```bash
# Test in production
curl https://your-domain.com/api/welcome-section?active=true

# Or test locally with production database
DATABASE_URL="your-production-database-url" npm run dev
```

### 8. Add Initial Data (if table is empty)
Create initial welcome section data through the API:

```javascript
// Run this in your browser console on production
fetch('/api/welcome-section', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Welcome To',
    subtitle: 'MARHABA FURNITURE',
    description: 'Your trusted partner for seamless furniture moving and packing services.',
    ceoName: 'Amjadullah',
    ceoPosition: 'Chief Executive Officer',
    ceoMessage: 'We are committed to providing exceptional moving services.',
    buttonText: 'Learn More',
    buttonUrl: '/about',
    features: [
      {
        title: 'Professional Service',
        description: 'Experienced team with years of expertise.',
        icon: 'CheckCircle'
      }
    ],
    stats: [
      { label: 'Happy Customers', value: '500+' },
      { label: 'Years Experience', value: '10+' }
    ],
    isActive: true
  })
}).then(res => res.json()).then(console.log)
```

## Quick Commands Summary

Run these in order:

```bash
# 1. Generate Prisma client
npx prisma generate

# 2. Push schema to production (choose one)
npx prisma db push  # Direct push (faster but less safe)
# OR
npx prisma migrate deploy  # Use existing migrations (safer)

# 3. Verify it worked
npx prisma studio  # Opens GUI to check database

# 4. Redeploy your application
git add .
git commit -m "Fix welcome section API for production"
git push
```

## Additional Debugging

If still not working, add this test endpoint to check database connection:

```javascript
// src/app/api/test-welcome/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();

    // Check if table exists
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'welcome_section'
      );
    `;

    // Count records
    const count = await prisma.welcomeSection.count();

    return NextResponse.json({
      success: true,
      connected: true,
      tableExists,
      recordCount: count,
      env: process.env.NODE_ENV
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code
    }, { status: 500 });
  }
}
```

Then visit: `https://your-domain.com/api/test-welcome` to see the status.