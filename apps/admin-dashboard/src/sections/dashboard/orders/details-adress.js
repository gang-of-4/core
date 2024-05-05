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
                  <TableCell>City</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>Postal Code</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover sx={{ alignItems: "center" }}>
                  <TableCell>{order.orderAddress?.id}</TableCell>
                  <TableCell>{order.orderAddress?.country}</TableCell>
                  <TableCell>{order.orderAddress?.city}</TableCell>
                  <TableCell>{order.orderAddress?.street}</TableCell>
                  <TableCell>{order.orderAddress?.postalCode}</TableCell>
                  <TableCell>{order.orderAddress?.notes}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Scrollbar>
        </div>
      </Stack>
    </>
  );
}
