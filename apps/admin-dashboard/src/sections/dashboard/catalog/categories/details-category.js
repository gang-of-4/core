import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Scrollbar } from '../../../../components/scrollbar';

// @NOW-TODO fix looks 
export function CategoryDetails({ category }) {

  return (
    <>
      <Stack
        spacing={3}
        sx={{ width: '100%' }}
      >
        <Stack>
          <Typography color="textPrimary" variant='h6'>
            Name
          </Typography>
          <Typography
            color="textPrimary"
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {category?.name}
          </Typography>
          <Typography color="textPrimary" variant='h6'>
            Description
          </Typography>
          <Typography color="textPrimary" variant='h6'>
            {category?.description }
          </Typography>
        </Stack>
        <Stack>

        </Stack>

      </Stack>
    </>
  )
}
