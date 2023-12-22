"use client";

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AuthProvider } from 'ui/contexts/auth/jwt-context';
import { createTheme } from 'ui/theme'
import { ThemeProvider } from '@mui/material/styles';


export function Providers({ children, authApiURL }) {

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
        <AuthProvider 
          STORAGE_KEY={'customerAccessToken'}
          apiURL={authApiURL}  
        >
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </>
  );
}