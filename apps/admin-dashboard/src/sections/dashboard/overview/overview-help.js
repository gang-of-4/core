import InfoCircleIcon from '@untitled-ui/icons-react/build/esm/InfoCircle';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  SvgIcon,
  Typography
} from '@mui/material';

export const OverviewHelp = () => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    }}
  >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <SvgIcon color="primary">
          <InfoCircleIcon />
        </SvgIcon>
        <Typography
          color="primary.main"
          sx={{ pl: 1 }}
          variant="subtitle2"
        >
          Help Center
        </Typography>
      </Box>
      <Typography
        sx={{ mt: 2 }}
        variant="h6"
      >
        Need help figuring things out?
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
        variant="body2"
      >
        Feel free to reach us if you need any help. We are here to help you.
      </Typography>
    </CardContent>
    <div>
    <Divider />
    <CardActions>
      <Button
        color="inherit"
        endIcon={(
          <SvgIcon>
            <Link01Icon />
          </SvgIcon>
        )}
        size="small"
      >
        Help Center
      </Button>
    </CardActions>
    </div>
  </Card>
);
