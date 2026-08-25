import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C84B2F',
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-1px',
          borderRadius: 6,
          border: '1.5px solid #C84B2F',
        }}
      >
        K
      </div>
    ),
    {
      ...size,
    }
  );
}
