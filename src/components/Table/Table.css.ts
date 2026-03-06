import { style } from '@vanilla-extract/css';

export const table = style({
  width: '100vw',
  height: '100vh',
  background: '#076324',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '16vh',
});

export const center = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
});

export const pot = style({
  color: 'white',
  fontFamily: 'serif',
  fontSize: '1.2rem',
  textAlign: 'center',
});

export const communityCards = style({
  display: 'flex',
  gap: '8px',
});

export const playerTopLeft = style({
  position: 'absolute',
  top: '64px',
  left: '64px',
});

export const playerTopRight = style({
  position: 'absolute',
  top: '64px',
  right: '64px',
});

export const playerBottom = style({
  position: 'absolute',
  bottom: '48px',
  left: '50%',
  transform: 'translateX(-50%)',
});

export const playerName = style({
  color: 'white',
  fontFamily: 'serif',
  marginBottom: '8px',
  textAlign: 'center',
});

export const hand = style({
  display: 'flex',
  gap: '8px',
});

export const feltTable = style({
  position: 'absolute',
  width: '60%',
  height: '55%',
  background: 'radial-gradient(ellipse at center, #0a8a30 0%, #076324 60%, #054d1a 100%)',
  borderRadius: '50%',
  border: '12px solid #3d1f00',
  boxShadow: '0 0 0 6px #5c2e00, 0 20px 60px rgba(0,0,0,0.6), inset 0 2px 20px rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '16px',
});