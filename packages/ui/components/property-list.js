import { List } from '@mui/material';

export function PropertyList(props) {
  const { children } = props;

  return (
    <List disablePadding>
      {children}
    </List>
  );
}