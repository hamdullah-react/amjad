// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSEOSettings, generateStructuredData } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata dynamically
export async function generateMetadata() {
  try {
    const seoSettings = await getSEOSettings();
    
    // Set metadataBase using your domain or fallback to localhost
    const metadataBase = new URL(seoSettings.canonicalUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
    
    const metadata = {
      metadataBase, // Add this line to fix the warning
      title: {
        default: seoSettings.siteTitle,
        template: `%s ${seoSettings.titleSeparator} ${seoSettings.siteTitle}`
      },
      description: seoSettings.siteDescription,
      keywords: seoSettings.keywords,
      authors: [{ name: seoSettings.author }],
      creator: seoSettings.author,
      publisher: seoSettings.author,
      robots: seoSettings.robots,
      
      // Icons
      icons: {
        icon: [
          { url: '/favicon.ico' },
          { url: '/favicon.png', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-touch-icon.png' },
        ],
      },

      // Open Graph
      openGraph: {
        title: seoSettings.ogTitle || seoSettings.siteTitle,
        description: seoSettings.ogDescription || seoSettings.siteDescription,
        url: seoSettings.ogUrl,
        siteName: seoSettings.siteTitle,
        images: seoSettings.ogImage ? [
          {
            url: seoSettings.ogImage,
            width: 1200,
            height: 630,
            alt: seoSettings.siteTitle,
          }
        ] : [],
        locale: 'en_US',
        type: seoSettings.ogType,
      },

      // Twitter
      twitter: {
        card: seoSettings.twitterCard,
        site: seoSettings.twitterSite,
        creator: seoSettings.twitterCreator,
        title: seoSettings.twitterTitle || seoSettings.siteTitle,
        description: seoSettings.twitterDescription || seoSettings.siteDescription,
        images: seoSettings.twitterImage ? [seoSettings.twitterImage] : [],
      },

      // Verification
      verification: {
        google: seoSettings.googleVerification,
        other: {
          bing: seoSettings.bingVerification,
        },
      },

      // Alternates
      alternates: {
        canonical: seoSettings.canonicalUrl,
        languages: seoSettings.alternateLanguages?.reduce((acc, lang) => {
          if (lang.url && lang.code) {
            acc[lang.code] = lang.url;
          }
          return acc;
        }, {}) || {},
      },

      // Other metadata
      category: 'moving services',
    };

    return metadata;
  } catch (error) {
    // Return minimal metadata if SEO settings can't be fetched
    console.error('Error generating metadata:', error);
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'), // Add this
      title: 'Marhaba Movers & Packers',
      description: 'Professional moving services',
      icons: {
        icon: [
          { url: '/favicon.ico' },
          { url: '/favicon.png', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-touch-icon.png' },
        ],
      },
    };
  }
}

export default async function RootLayout({ children }) {
  let seoSettings = null;
  let structuredData = null;

  try {
    seoSettings = await getSEOSettings();
    structuredData = generateStructuredData(seoSettings);
  } catch (error) {
    console.error('Error loading SEO settings:', error);
    // Continue without SEO settings
  }

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {seoSettings?.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${seoSettings.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${seoSettings.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {seoSettings?.googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${seoSettings.googleTagManagerId}');
              `,
            }}
          />
        )}

        {/* Facebook Pixel */}
        {seoSettings?.facebookPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f.fbq)f.fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${seoSettings.facebookPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* Hotjar */}
        {seoSettings?.hotjarId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${seoSettings.hotjarId},hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          />
        )}

        {/* Microsoft Clarity */}
        {seoSettings?.clarityProjectId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${seoSettings.clarityProjectId}");
              `,
            }}
          />
        )}

        {/* Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        )}

        {/* Custom Head Scripts */}
        {seoSettings?.customHeadScripts && (
          <script
            dangerouslySetInnerHTML={{
              __html: seoSettings.customHeadScripts,
            }}
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        {seoSettings?.googleTagManagerId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${seoSettings.googleTagManagerId}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
            }}
          />
        )}

        {/* Facebook Pixel (noscript) */}
        {seoSettings?.facebookPixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${seoSettings.facebookPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}

        {/* Custom Body Scripts */}
        {seoSettings?.customBodyScripts && (
          <script
            dangerouslySetInnerHTML={{
              __html: seoSettings.customBodyScripts,
            }}
          />
        )}

        {children}
      </body>
    </html>
  );
}