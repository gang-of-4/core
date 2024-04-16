import { useCallback, useRef, useState } from 'react';
import { Avatar, Box, ButtonBase } from '@mui/material';
import { getInitials } from '../../../utils/get-initials';
import { AccountPopover } from './account-popover';

export function AccountButton({children, auth}) {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false);
  }, []);

  return (
    <div className='account-dropdown'>
      <Box
        component={ButtonBase}
        onClick={handlePopoverOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%'
        }}
      >
        <Avatar
          src={auth.user?.avatar}
          sx={{
            height: 32,
            width: 32
          }}
        >
          {/* <SvgIcon>
            <User01Icon />
          </SvgIcon> */}
          {getInitials(`${auth.user?.firstName} ${auth.user?.lastName}`)}
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        auth={auth}
        listItems={children}
        onClose={handlePopoverClose}
        open={openPopover}
      />
    </div>
  );
}
