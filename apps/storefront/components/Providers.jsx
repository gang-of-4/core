"use client";

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme } from 'ui/theme'
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '@/contexts/AuthContext';
import { ItemsProvider } from '@/contexts/ItemsContext';
import { CartProvider, signOutCallback as cartCallback } from '@/contexts/CartContext';


export function Providers({ children }) {

  const theme = createTheme({
    colorPreset: 'blue',
    contrast: 'normal',
    direction: 'ltr',
    layout: 'vertical',
    navColor: 'evident',
    paletteMode: 'light',
    responsiveFontSizes: true,
    stretch: false
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider signOutCallback={cartCallback}>
          <ThemeProvider theme={theme}>
            <ItemsProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ItemsProvider>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </>
  );
}