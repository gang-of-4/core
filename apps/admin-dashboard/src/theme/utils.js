import { blue, green, indigo, purple } from './colors';

export const getPrimary = (preset) => {
  switch (preset) {
    case 'blue':
      return blue;
    default:
      console.error('Invalid color preset, accepted values: "blue", "green", "indigo" or "purple"".');
      return blue;
  }
};
