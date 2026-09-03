import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const headerCity = req.headers.get('x-vercel-ip-city');
    const headerRegion = req.headers.get('x-vercel-ip-country-region');
    const headerCountry = req.headers.get('x-vercel-ip-country');

    let city = headerCity ? decodeURIComponent(headerCity) : null;
    let region = headerRegion || null;
    let country = headerCountry || null;
    let isp = null;

    // If city is not directly provided by header, use lightweight client-safe IP lookup
    if (!city) {
      const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
      if (clientIp && clientIp !== '::1' && !clientIp.startsWith('127.')) {
        try {
          const res = await fetch(`https://ipwho.is/${clientIp}`, {
            headers: { 'User-Agent': 'KikiPortfolio/1.0' },
            next: { revalidate: 3600 }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              city = data.city || city;
              region = data.region || region;
              country = data.country || country;
              isp = data.connection?.isp || data.connection?.org || null;
            }
          }
        } catch (_) {
          // graceful fallback
        }
      }
    }

    return NextResponse.json({
      city: city || 'Unknown City',
      region: region || 'Unknown Region',
      country: country || 'Unknown Country',
      isp: isp || 'Direct Network',
    });
  } catch (err) {
    return NextResponse.json({
      city: 'Unknown City',
      region: 'Unknown Region',
      country: 'Unknown Country',
      isp: 'Direct Network',
    });
  }
}
