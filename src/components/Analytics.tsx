'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function Analytics() {
  useEffect(() => {
    // Smart Ref Tracker: Detect ?ref=... or ?utm_source=... in URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref') || params.get('utm_source');

      if (ref) {
        sessionStorage.setItem('recruiter_ref', ref);

        // Send to Microsoft Clarity
        if (typeof (window as any).clarity === 'function') {
          (window as any).clarity('set', 'recruiter_ref', ref);
          (window as any).clarity('event', 'lead_opened', { ref });
        }

        // Send to Google Analytics
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'recruiter_visit', {
            recruiter_ref: ref,
            timestamp: new Date().toISOString(),
          });
        }
      }
    }
  }, []);

  return (
    <>
      {/* Microsoft Clarity - Session Recording, Heatmaps, & Location */}
      {CLARITY_PROJECT_ID && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `,
          }}
        />
      )}

      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Vercel Web Analytics (Automatic on Vercel deployment) */}
      <VercelAnalytics />
    </>
  );
}
