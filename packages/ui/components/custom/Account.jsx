import React from 'react'
import { Button , useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { paths } from '../../paths';
import { AccountButton } from '../../layouts/dashboard/account-button';
import { useAuth } from '../../hooks/use-auth'


export function Account({app}) {
  const { isAuthenticated } = useAuth();
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const pathname = usePathname();

  const url = getUrl(app);

  function getUrl(app) {
    switch (app) {
      case 'vendor':
        return `vendor`;
      case 'admin':
        return `admin`;
      default:
        return '';
    }
  }

  const Else = (
      pathname.includes('/auth/')
        ? null
        : <Button
          component={NextLink}
          href={`${url}${paths.auth.login}`}
          size={mdUp ? 'medium' : 'small'}
          variant="contained"
        >
          Login
        </Button>
  )

  return (
    <div>
      {isAuthenticated ? (
        <AccountButton />
      ) : (
        Else
      )}
    </div>
  )
}