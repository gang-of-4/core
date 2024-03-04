"use client";

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme } from 'ui/theme'
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '@/contexts/AuthContext';


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
    })

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </>
  );
}