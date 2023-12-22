"use client";

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AuthProvider } from 'ui/contexts/auth/jwt-context';
import { createTheme } from 'ui/theme'
import { ThemeProvider } from '@mui/material/styles';
import { StoresProvider } from '@/contexts/StoresContext';
import { signOutCallback as storesCallback } from '@/contexts/StoresContext';


export function ContextProviders({ children, authApiURL }) {

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
          STORAGE_KEY={'vendorAccessToken'} 
          signOutCallback={storesCallback} 
          apiURL={authApiURL} 
        >
          <ThemeProvider theme={theme}>
            <StoresProvider>
              {children}
            </StoresProvider>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </>
  );
}