import { useCallback, useState } from 'react';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import {
  Badge,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { Tip } from '../../../components/tip';

const articles = {
  Platform: [
    {
      description: 'Provide your users with the content they need, exactly when they need it, by building a next-level site search experience using our AI-powered search API.',
      title: 'Level up your site search experience with our hosted API',
      path: 'Users / Api-usage'
    },
    {
      description: 'Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.',
      title: 'Build performant marketplace search at scale',
      path: 'Users / Api-usage'
    }
  ],
  Resources: [
    {
      description: 'Algolia’s architecture is heavily redundant, hosting every application on …',
      title: 'Using NetInfo API to Improve Algolia’s JavaScript Client',
      path: 'Resources / Blog posts'
    },
    {
      description: 'Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.',
      title: 'Build performance',
      path: 'Resources / UI libraries'
    }
  ]
};

export function SearchDialog(props) {
  const { onClose, open = false, ...other } = props;
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayArticles, setDisplayArticles] = useState(false);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setDisplayArticles(false);
    setIsLoading(true);
    // Do search here
    setIsLoading(false);
    setDisplayArticles(true);
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      {...other}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2
        }}
      >
        <Typography variant="h6">
          Search
        </Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <Tip message="Search by entering a keyword and pressing Enter" />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchMdIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            fullWidth
            label="Search"
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search..."
            value={value}
          />
        </Box>
        {isLoading ? <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3
            }}
          >
            <CircularProgress />
          </Box> : null}
        {displayArticles ? <Stack
            spacing={2}
            sx={{ mt: 3 }}
          >
            {Object.keys(articles).map((type, index) => (
              <Stack
                key={index}
                spacing={2}
              >
                <Typography variant="h6">
                  {type}
                </Typography>
                <Stack
                  divider={<Divider />}
                  sx={{
                    borderColor: 'divider',
                    borderRadius: 1,
                    borderStyle: 'solid',
                    borderWidth: 1
                  }}
                >
                  {articles[type].map((article) => (
                    <Box
                      key={article.title}
                      sx={{ p: 2 }}
                    >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ pl: 1 }}
                      >
                        <Badge
                          color="primary"
                          variant="dot"
                        />
                        <Typography variant="subtitle1">
                          {article.title}
                        </Typography>
                      </Stack>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {article.path}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ mt: 1 }}
                        variant="body2"
                      >
                        {article.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack> : null}
      </DialogContent>
    </Dialog>
  );
}