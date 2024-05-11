import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";

export function OrderAddress({ order }) {
  return (
    <>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Stack sx={{ marginTop: 3, marginLeft: 3 }}>
          <Typography color="textPrimary" variant="h6">
            Address
          </Typography>
        </Stack>

        <div>
          <Scrollbar>
            <Table sx={{ minWidth: 1200, alignItems: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>Postal Code</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover sx={{ alignItems: "center" }}>
                  <TableCell>{order.address?.id}</TableCell>
                  <TableCell>{order.address?.country}</TableCell>
                  <TableCell>{order.address?.state}</TableCell>
                  <TableCell>{order.address?.city}</TableCell>
                  <TableCell>{order.address?.street}</TableCell>
                  <TableCell>{order.address?.postalCode}</TableCell>
                  <TableCell>{order.address?.notes}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Scrollbar>
        </div>
      </Stack>
    </>
  );
}
