import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import { paths } from '../paths';

export function GuestGuard(props) {
  const { children } = props;
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (isAuthenticated) {
      // @todo make sure it works as intended
      if (user.role.name === 'admin') return router.replace(paths.admin.dashboard.index);
      if (user.role.name === 'vendor') return router.replace(paths.vendor.dashboard.index);
      router.replace(paths.absolutePaths.storefront);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(() => {
      check();
    },
     
    []);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>;
}