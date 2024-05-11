import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { ordersApi } from "../../../api/orders";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatPrice } from "../../../utils/format-price";
import { capitalize } from "../../../utils/format-string";
import { config } from "ui/config";

const statusOptions = [
  {
    label: "Delivered",
    value: "DELIVERED",
  },
  {
    label: "In Progress",
    value: "INPROGRESS",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

const validationSchema = Yup.object({
  status: Yup.string().required("Required"),
});

export function DetailsAmountStatus({ order }) {
  const initialValues = {
    status: order.status,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  const handleChangeStatus = async (event) => {
    const newStatus = event.target.value;
    formik.setFieldValue("status", newStatus);

    try {
      await ordersApi.updateOrder({
        status: newStatus,
        id: order.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{ width: "100%" }}
        direction={"row"}
        marginBottom={1}
      >
        <Typography color="textPrimary" variant="h6">
          {capitalize(config.order.name)} Overview
        </Typography>
      </Stack>
      <Stack
        spacing={2}
        sx={{ width: "100%" }}
        direction={"row"}
        justifyContent={"space-around"}
      >
        <Stack>
          <Typography color="textPrimary" variant="h6">
            {capitalize(config.order.name)} ID
          </Typography>
          <Typography color="textPrimary" variant="h7">
            {order.id}
          </Typography>
        </Stack>

        <Stack>
          <Typography color="textPrimary" variant="h6">
            Total
          </Typography>
          <Typography color="textPrimary" variant="h7">
            {formatPrice({ price: order.total })}
          </Typography>
        </Stack>

        <Stack>
          <Typography color="textPrimary" variant="h6">
            Subtotal
          </Typography>
          <Typography color="textPrimary" variant="h7">
            {formatPrice({ price: order.subtotal })}
          </Typography>
        </Stack>

        <Stack width={"20%"}>
          <TextField
            value={formik.values.status}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.status && formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            fullWidth
            label="Status"
            name="status"
            select
            onChange={handleChangeStatus}
            data-test="order-status-select"
          >
            {statusOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                data-test={`order-status-${option.value}`}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>
    </>
  );
}
