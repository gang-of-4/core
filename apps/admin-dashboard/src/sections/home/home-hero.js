import NextLink from 'next/link';
import EyeIcon from '@untitled-ui/icons-react/build/esm/Eye';
import LayoutBottomIcon from '@untitled-ui/icons-react/build/esm/LayoutBottom';
import { Box, Button, Container, Rating, Stack, SvgIcon, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { paths } from '../../paths';

export const HomeHero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/admin/assets/gradient-bg.svg")',
        pt: '120px',
        mb: 6
      }}
    >
      <Container maxWidth="lg">
        <Box maxWidth="sm">
          <Typography
            variant="h1"
            sx={{ mb: 2 }}
          >
            Create your own&nbsp;
            <Typography
              component="span"
              color="primary.main"
              variant="inherit"
            >
              marketplace
            </Typography>
            , tailored to your experience.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 20,
              fontWeight: 500
            }}
          >
            A generic e-commerce platform that allows you to customize it based on your needs.
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button
              component={NextLink}
              href={paths.dashboard.index}
              sx={(theme) => theme.palette.mode === 'dark'
                ? {
                  backgroundColor: 'neutral.50',
                  color: 'neutral.900',
                  '&:hover': {
                    backgroundColor: 'neutral.200'
                  }
                }
                : {
                  backgroundColor: 'neutral.900',
                  color: 'neutral.50',
                  '&:hover': {
                    backgroundColor: 'neutral.700'
                  }
                }}
              variant="contained"
            >
              Go to Dashboard
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
