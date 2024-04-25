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

export function DetailsUser({ order }) {

    return (
        <>
            <Stack
                spacing={2}
                sx={{ width: '100%' }}
                direction={'row'}
                marginBottom={1}
            >
                <Typography color="textPrimary" variant='h6'>
                    User Details
                </Typography>
            </Stack>
            <Stack
                spacing={2}
                sx={{ width: '100%' }}
                direction={'row'}
                justifyContent={'space-around'}
            >
                <Stack>
                    <Typography color="textPrimary" variant='h6'>
                        User Name
                    </Typography>
                    <Typography color="textPrimary" variant='h7'>
                        {order.user?.name}
                    </Typography>
                </Stack>

                <Stack>
                    <Typography color="textPrimary" variant='h6'>
                        Email
                    </Typography>
                    <Typography color="textPrimary" variant='h7'>
                        {order.user?.email}
                    </Typography>
                </Stack>

                <Stack>
                    <Typography color="textPrimary" variant='h6'>
                        Phone Number
                    </Typography>
                    <Typography color="textPrimary" variant='h7'>
                        {order.user?.phone}
                    </Typography>
                </Stack>


            </Stack>
        </>
    )
}
