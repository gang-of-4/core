import { useCallback, useRef, useState } from 'react';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Button, Checkbox, FormControlLabel, Menu, MenuItem, SvgIcon } from '@mui/material';

export function MultiSelect(props) {
  const { label, onChange, options, value = [], ...other } = props;
  const anchorRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleValueChange = useCallback((event) => {
    let newValue = [...value];

    if (event.target.checked) {
      newValue.push(event.target.value);
    } else {
      newValue = newValue.filter((item) => item !== event.target.value);
    }

    onChange?.(newValue);
  }, [onChange, value]);

  return (
    <>
      <Button
        color="inherit"
        endIcon={(
          <SvgIcon>
            <ChevronDownIcon />
          </SvgIcon>
        )}
        onClick={handleMenuOpen}
        ref={anchorRef}
        {...other}>
        {label}
      </Button>
      <Menu
        PaperProps={{ style: { width: 250 } }}
        anchorEl={anchorRef.current}
        onClose={handleMenuClose}
        open={openMenu}
      >
        {options.map((option) => (
          <MenuItem key={option.label}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={value.includes(option.value)}
                  onChange={handleValueChange}
                  value={option.value}
                />
              )}
              label={option.label}
              sx={{
                flexGrow: 1,
                mr: 0
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}