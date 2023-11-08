import React from 'react'
import { useAuth } from '../../hooks/use-auth'
import { AccountButton } from '../../layouts/dashboard/account-button';
import { Button } from '@mui/material';
import { paths } from '../../paths';
import { useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';


export default function Account({app}) {
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

  return (
    <div>
      {isAuthenticated ? (
        <AccountButton />
      ) : (
        pathname.includes('/auth/')
          ? <></>
          : <Button
            component="a"
            size={mdUp ? 'medium' : 'small'}
            href={`${url}${paths.auth.login}`}
            variant="contained"
          >
            Login
          </Button>
      )}
    </div>
  )
}