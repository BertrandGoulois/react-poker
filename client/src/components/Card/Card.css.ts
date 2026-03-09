import { style } from '@vanilla-extract/css';

export const card = style({
  width: '80px',
  height: '120px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '6px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'white',
  fontFamily: 'serif',
  fontSize: '16px',
});

export const red = style({ color: 'red' });
export const black = style({ color: 'black' });

export const suit = style({
  textAlign: 'center',
  fontSize: '24px',
});

export const flipped = style({
  transform: 'rotate(180deg)',
});