import { MenuItem, Popover } from '@mui/material';

export const OptionPopover = (props) => {
  const { anchorEl, onChange, onClose, open = false, options, firstOption, ...other } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      disableScrollLock
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 180 } }}
      {...other}
      data-test="option-popover"
    >
      {
        firstOption && (
          <MenuItem
            key={firstOption}
            divider={true}
          >
            {firstOption}
          </MenuItem>
        )
      }
      {options?.map((option) => (
        <MenuItem
          key={option.id}
          onClick={() => onChange(option)}
        >
          {option.text}
        </MenuItem>
      ))}
    </Popover>
  );
};
