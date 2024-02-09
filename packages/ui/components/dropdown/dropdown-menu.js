import { useContext } from 'react';
import { Popover } from '@mui/material';
import { DropdownContext } from './dropdown-context';

export function DropdownMenu(props) {
  const { anchorEl, children, PaperProps, ...other } = props;
  const ctx = useContext(DropdownContext);

  return (
    <Popover
      PaperProps={{
        ...PaperProps,
        onMouseEnter: ctx.onMenuEnter,
        onMouseLeave: ctx.onMenuLeave,
        sx: {
          ...PaperProps?.sx,
          pointerEvents: 'auto'
        }
      }}
      anchorEl={anchorEl || ctx.anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      open={ctx.open}
      sx={{ pointerEvents: 'none' }}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'top'
      }}
      {...other}>
      {children}
    </Popover>
  );
}