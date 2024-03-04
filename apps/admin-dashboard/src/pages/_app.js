import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RTL } from '../components/rtl';
import { SplashScreen } from '../components/splash-screen';
import { Toaster } from '../components/toaster';
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context';
import { AuthConsumer, AuthProvider } from '../contexts/auth/jwt-context';
import { createTheme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
// Remove if locales are not used
import '../locales/i18n';

const clientSideEmotionCache = createEmotionCache();


const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
console.log('-------------------')
  return (
    <CacheProvider value={emotionCache}>
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
                                  {getLayout(
                                    <Component {...pageProps} />
                                  )}
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
    </CacheProvider>
  );
};

export default App;
