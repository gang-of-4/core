import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { paths } from "../../paths";
import { AccountButton } from "../../layouts/dashboard/account-button";

export function Account({ app, auth, accountPopoverButtons }) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const pathname = usePathname();


  const Else = pathname.includes("/auth/") ? null : (
    <Button
      component={NextLink}
      href={`${paths.auth.login}`}
      size={mdUp ? "medium" : "small"}
      variant="contained"
    >
      Login
    </Button>
  );

  return (
    <div>
      {auth.isAuthenticated ? (
        <AccountButton
          accountPopoverButtons={accountPopoverButtons}
          auth={auth}
        />
      ) : (
        Else
      )}
    </div>
  );
}
