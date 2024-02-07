import { useCallback, useRef, useState } from 'react';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { OptionPopover } from './option-popover';

export function OptionSwitch(props) {

  const {
    options,
    firstOption,
    optionsTitle,
    optionsSubtitle,
    handleOptionsChange,
    ...other
  } = props;

  const [title, setTitle] = useState(optionsTitle);

  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false);
  }, []);

  function handleChange(option) {
    if (handleOptionsChange) {
      handleOptionsChange(option.id);
    }
    setTitle(option.text);
    setOpenPopover(false);
  }

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        {...other}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="inherit"
            variant="h6"
          >
            {title}
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
          >
            {optionsSubtitle}
          </Typography>
        </Box>
        <IconButton
          onClick={handlePopoverOpen}
          ref={anchorRef}
        >
          <SvgIcon sx={{ fontSize: 16 }}>
            <ChevronDownIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <OptionPopover
        anchorEl={anchorRef.current}
        firstOption={firstOption}
        onChange={handleChange}
        onClose={handlePopoverClose}
        open={openPopover}
        options={options}
      />
    </>
  );
}
