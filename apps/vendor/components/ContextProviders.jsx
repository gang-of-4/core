"use client";

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme } from 'ui/theme'
import { ThemeProvider } from '@mui/material/styles';
import { StoresProvider } from '@/contexts/StoresContext';
import { signOutCallback as storesCallback } from '@/contexts/StoresContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ActiveStoreProvider } from '@/contexts/ActiveStoreContext';


export function ContextProviders({ children }) {

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
        <AuthProvider signOutCallback={storesCallback}>
          <ThemeProvider theme={theme}>
            <StoresProvider>
              <ActiveStoreProvider>
                {children}
              </ActiveStoreProvider>
            </StoresProvider>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </>
  );
}