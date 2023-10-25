import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/use-auth';
import { paths } from '../paths';

export const GuestGuard = (props) => {
  const { children } = props;
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (isAuthenticated) {
      // @todo make sure it works as intended
      // if (user.role === 'admin') return router.replace(`${paths.absolutePaths.admin}${paths.admin.dashboard.index}`);
      // if (user.role === 'vendor') return router.replace(`${paths.absolutePaths.vendor}${paths.vendor.dashboard.index}`);
      // router.replace(paths.absolutePaths.storefront);
      router.replace('/dashboard');
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(() => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};
