"use client";

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AuthProvider } from 'ui/contexts/auth/jwt-context';

export function Providers({ children }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
            {children}
        </AuthProvider>
      </LocalizationProvider>
    </>
  );
}