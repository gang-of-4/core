import { MenuItem, Popover } from '@mui/material';

export function OptionPopover(props) {
  const { anchorEl, onChange, onClose, open = false, options, firstOption, ...other } = props;

  return (
    <Popover
      PaperProps={{ sx: { width: 180 } }}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      disableScrollLock
      keepMounted
      onClose={onClose}
      open={open}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
      {...other}
      data-test="option-popover"
    >
      {
        firstOption ? <MenuItem
            divider
            key={firstOption}
          >
            {firstOption}
          </MenuItem> : null
      }
      {options?.map((option) => (
        <MenuItem
          key={option.id}
          onClick={() => onChange(option)}
        >
          {option.text?.length > 18 ? `${option.text.slice(0, 18)}...` : option.text}
        </MenuItem>
      ))}
    </Popover>
  );
}
