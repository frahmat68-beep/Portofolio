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
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          border: '1.5px solid #C84B2F',
        }}
      >
        <span
          style={{
            color: '#F0ECE5',
            fontSize: 22,
            fontWeight: 900,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-1.5px',
            lineHeight: 1,
            display: 'flex',
            transform: 'translateY(-0.5px)',
          }}
        >
          K
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
