"use client";

import React from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RTL } from 'ui/components/rtl';
import { SplashScreen } from 'ui/components/splash-screen';
import { Toaster } from 'ui/components/toaster';
import { SettingsConsumer, SettingsProvider } from 'ui/contexts/settings-context';
import { AuthConsumer, AuthProvider } from 'ui/contexts/auth/jwt-context';
// import { gtmConfig } from '../config';
// import { gtm } from '../libs/gtm';
// import { store } from '../store';
import { createTheme } from 'ui/theme';
// import { createEmotionCache } from '../utils/create-emotion-cache';
// Remove if nprogress is not used
// import '../libs/nprogress';
// Remove if mapbox is not used
// import '../libs/mapbox';
// Remove if locales are not used
// import '../locales/i18n';
import { SettingsButton } from 'ui/components/settings-button';
import { SettingsDrawer } from 'ui/components/settings-drawer';

export function Providers({ children }) {
  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <AuthConsumer>
              {(auth) => (
                <SettingsProvider>
                  <SettingsConsumer>
                    {(settings) => {
                      // Prevent theme flicker when restoring custom settings from browser storage
                      if (!settings.isInitialized) {
                        // return null;
                      }

                      const theme = createTheme({
                        colorPreset: settings.colorPreset,
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        responsiveFontSizes: settings.responsiveFontSizes
                      });

                      // Prevent guards from redirecting
                      const showSlashScreen = !auth.isInitialized;

                      return (
                        <ThemeProvider theme={theme}>
                          <Head>
                            <meta
                              name="color-scheme"
                              content={settings.paletteMode}
                            />
                            <meta
                              name="theme-color"
                              content={theme.palette.neutral[900]}
                            />
                          </Head>
                          <RTL direction={settings.direction}>
                            <CssBaseline />
                            {showSlashScreen
                              ? <SplashScreen />
                              : (
                                <>
                                  {children}
                                  <SettingsButton onClick={settings.handleDrawerOpen} />
                                  <SettingsDrawer
                                    canReset={settings.isCustom}
                                    onClose={settings.handleDrawerClose}
                                    onReset={settings.handleReset}
                                    onUpdate={settings.handleUpdate}
                                    open={settings.openDrawer}
                                    values={{
                                      colorPreset: settings.colorPreset,
                                      contrast: settings.contrast,
                                      direction: settings.direction,
                                      paletteMode: settings.paletteMode,
                                      responsiveFontSizes: settings.responsiveFontSizes,
                                      stretch: settings.stretch,
                                      layout: settings.layout,
                                      navColor: settings.navColor
                                    }}
                                  />
                                </>
                              )}
                            <Toaster />
                          </RTL>
                        </ThemeProvider>
                      );
                    }}
                  </SettingsConsumer>
                </SettingsProvider>
              )}
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
    </>
  );
}