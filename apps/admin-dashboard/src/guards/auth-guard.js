import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/use-auth";
import { paths } from "../paths";
import { Issuer } from "../utils/auth";

const loginPaths = {
  [Issuer.JWT]: paths.auth.jwt.login,
};

export const AuthGuard = (props) => {
  const { children, role } = props;
  const router = useRouter();
  const { user, isAuthenticated, issuer } = useAuth();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: globalThis.location.href,
      }).toString();
      const href = loginPaths[issuer] + `?${searchParams}`;
      router.replace(href);
    } else {
      if (role && user.role.name !== role) {
        router.replace(paths.errors.forbidden);
      } else {
        setChecked(true);
      }
    }
  }, [isAuthenticated, issuer, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
