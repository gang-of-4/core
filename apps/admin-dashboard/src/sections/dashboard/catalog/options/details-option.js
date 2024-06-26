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
import { capitalize } from '../../../../utils/format-string';
import { config } from 'ui/config';

export function OptionDetails({ group }) {

  return (
    <>
      <Stack
        spacing={3}
        sx={{ width: '100%' }}
      >
        <Typography color="textPrimary" variant='h6'>
          Type
        </Typography>
        <Typography
          color="textPrimary"
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {group?.type}
        </Typography>
        <Typography color="textPrimary" variant='h6'>
          {capitalize(config.catalog.option.plural)}
        </Typography>
        <div>
          <Scrollbar>
            <Table sx={{ minWidth: 300 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    Label
                  </TableCell>
                  <TableCell>
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group?.options?.map((option) => {

                  return (
                    <TableRow
                      hover
                      key={option.id}
                    >
                      <TableCell />
                      <TableCell>

                        <Typography variant="subtitle2">
                          {option.label}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {group.type === 'TEXT' ? (
                          <Typography variant="subtitle2">
                            {option.value}
                          </Typography>
                        ) : (
                          <Box
                            borderRadius={1}
                            sx={{
                              backgroundColor: option.value,
                              height: 24,
                              width: 24,
                            }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
        </div>
      </Stack>
    </>
  )
}
