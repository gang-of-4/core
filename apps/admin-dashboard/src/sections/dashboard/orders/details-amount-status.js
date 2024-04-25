import {
    Button,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { ordersApi } from '../../../api/orders';
import { useFormik } from "formik";
import * as Yup from "yup";


const statusOptions = [
    {
        label: "Delivered",
        value: "DELIVERED",
    },
    {
        label: "InProgress",
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

export function DetailsAmountStatus({ order, initialValues }) {

    const formik = useFormik({
        initialValues: { status: order.status },
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
                    sx={{ width: '100%' }}
                    direction={'row'}
                    justifyContent={'space-around'}
                >
                    <Stack>
                        <Typography color="textPrimary" variant='h6'>
                            Order Id
                        </Typography>
                        <Typography color="textPrimary" variant='h7'>
                            {order.id}
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography color="textPrimary" variant='h6'>
                            Total
                        </Typography>
                        <Typography color="textPrimary" variant='h7'>
                            {order.total}
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography color="textPrimary" variant='h6'>
                            Sub Total
                        </Typography>
                        <Typography color="textPrimary" variant='h7'>
                            {order.subtota}
                        </Typography>
                    </Stack>

                    <Stack width={'20%'}>
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
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </Stack>
        </>
    )
}
