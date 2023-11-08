import NextLink from 'next/link';
import EyeIcon from '@untitled-ui/icons-react/build/esm/Eye';
import LayoutBottomIcon from '@untitled-ui/icons-react/build/esm/LayoutBottom';
import { Box, Button, Container, Rating, Stack, SvgIcon, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { paths } from '../../paths';
import { HomeCodeSamples } from './home-code-samples';

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
            A generic uberization model that allows you to customize it based on your needs.
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={1}
            sx={{ my: 3 }}
          >
            <Rating
              readOnly
              value={4.7}
              precision={0.1}
              max={5}
            />
            <Typography
              color="text.primary"
              variant="caption"
              sx={{ fontWeight: 700 }}
            >
              4.7/5
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              based on (70+ reviews)
            </Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Button
              component={NextLink}
              href={paths.dashboard.index}
              startIcon={(
                <SvgIcon fontSize="small">
                  <EyeIcon />
                </SvgIcon>
              )}
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
              Live Demo
            </Button>
            <Button
              color="inherit"
              component={NextLink}
              href={paths.components.index}
              startIcon={(
                <SvgIcon fontSize="small">
                  <LayoutBottomIcon />
                </SvgIcon>
              )}
            >
              Components
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
