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
        spacing={4}
        sx={{ width: '100%' }}
      >
        <Stack spacing={2}>
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
        </Stack>
        
        <Stack spacing={2}>
          <Typography color="textPrimary" variant='h6'>
            Description
          </Typography>
          <Typography color="textPrimary">
            {category?.description}
          </Typography>
        </Stack>

      </Stack>
    </>
  )
}
