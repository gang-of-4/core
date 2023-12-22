import { Collapse, Stack, SvgIcon, Typography } from '@mui/material';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import React from 'react'

export default function Feature({ title, description, expanded }) {

  return (
    <Stack
      {...(expanded && { spacing: 2 })}
      sx={{ cursor: 'pointer' }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography
          variant="h6"
          color="inherit"
        >
          {title}
        </Typography>
        <SvgIcon>
          {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </SvgIcon>
      </Stack>
      <Collapse in={expanded}>
        <Typography
          color="inherit"
          variant="body2"
        >
          {description}
        </Typography>
      </Collapse>
    </Stack>
  );
}
