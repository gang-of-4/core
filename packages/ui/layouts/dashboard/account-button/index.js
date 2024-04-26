import { useCallback, useRef, useState } from "react";
import { Avatar, Box, ButtonBase, SvgIcon } from "@mui/material";
import { User01 } from "@untitled-ui/icons-react";
import { getInitials } from "../../../utils/get-initials";
import { AccountPopover } from "./account-popover";

export function AccountButton({ accountPopoverButtons, auth }) {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false);
  }, []);

  return (
    <div className="account-dropdown">
      <Box
        component={ButtonBase}
        onClick={handlePopoverOpen}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "divider",
          height: 40,
          width: 40,
          borderRadius: "50%",
        }}
      >
        <Avatar
          src={auth.user?.avatar}
          sx={{
            height: 32,
            width: 32,
          }}
        >
          {auth?.user?.firstName && auth?.user?.lastName ? (
            getInitials(`${auth.user?.firstName} ${auth.user?.lastName}`)
          ) : (
            <SvgIcon>
              <User01 />
            </SvgIcon>
          )}
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        auth={auth}
        listItems={accountPopoverButtons}
        onClose={handlePopoverClose}
        open={openPopover}
      />
    </div>
  );
}
