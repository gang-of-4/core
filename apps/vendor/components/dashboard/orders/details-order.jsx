import {
  Box,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { Scrollbar } from "../../../../../packages/ui/components/scrollbar";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";
import fetchApi from "@/utils/fetch-api";

const statusOptions = [
  {
    label: "In Progress",
    value: "INPROGRESS",
  },
  {
    label: "Ready",
    value: "READY",
  },
];

const validationSchema = Yup.object({
  status: Yup.string().required("Required"),
});

export function OrderDetails({ order, storeId }) {
  const formik = useFormik({
    initialValues: { status: order.status },
    validationSchema,
    onSubmit: () => {},
  });

  const handleChangeStatus = async (event, orderItemId, item) => {
    const newStatus = event.target.value;
    formik.setFieldValue("status", newStatus);

    try {
      await fetchApi({
        url: `/vendor/api/orders/${order.id}/items/${orderItemId}?storeId=${storeId}`,
        options: {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Stack sx={{ marginTop: 3, marginLeft: 3 }}>
          <Typography color="textPrimary" variant="h6">
            {`Order ${capitalize(config.catalog.item.plural)}`}
          </Typography>
        </Stack>

        <div>
          <Scrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    {capitalize(config.catalog.item.plural)}
                  </TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items?.map((orderItem) => {
                  return (
                    <Fragment key={orderItem.id}>
                      <TableRow
                        hover
                        key={orderItem.id}
                        sx={{ alignItems: "center" }}
                      >
                        <TableCell>
                          <Stack
                            direction={{
                              xs: "column",
                              sm: "row",
                            }}
                            spacing={1}
                            alignContent={"center"}
                          >
                            {orderItem?.images?.[0]?.url ? (
                              <Box
                                sx={{
                                  borderRadius: 1,
                                  objectFit: "cover",
                                }}
                                component={"img"}
                                width={60}
                                height={60}
                                src={orderItem?.images?.[0]?.url}
                                alt={orderItem?.name}
                              />
                            ) : (
                              <Stack
                                width={60}
                                height={60}
                                sx={{
                                  bgcolor: "grey.100",
                                  borderRadius: 1,
                                }}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <SvgIcon>
                                  <Image01Icon />
                                </SvgIcon>
                              </Stack>
                            )}
                            <Stack justifyContent={"center"}>
                              <Typography variant="subtitle">
                                {orderItem.name}
                              </Typography>
                              {orderItem.isVariant && (
                                <>
                                  <Typography variant="caption">
                                    {orderItem?.groups
                                      ?.map(
                                        (group) =>
                                          `${group?.title}: 
                                      ${group?.options
                                        ?.map((option) => option?.label)
                                        .join(", ")}`
                                      )
                                      .join("  |  ")}
                                  </Typography>
                                </>
                              )}
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          {orderItem.quantity}
                        </TableCell>
                        <TableCell align="center">{orderItem.price}</TableCell>
                        <TableCell align="center">
                          <TextField
                            value={formik.values.status}
                            onBlur={formik.handleBlur}
                            error={
                              !!(formik.touched.status && formik.errors.status)
                            }
                            helperText={
                              formik.touched.status && formik.errors.status
                            }
                            fullWidth
                            label="Status"
                            name="status"
                            select
                            onChange={(e) =>
                              handleChangeStatus(e, orderItem.id, orderItem)
                            }
                          >
                            {statusOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
        </div>
      </Stack>
    </>
  );
}
