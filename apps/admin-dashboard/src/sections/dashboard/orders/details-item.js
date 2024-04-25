import {
    Button,
    MenuItem,
    Stack,
    TextField,
    CardContent,
    Divider,
    Grid,
    Typography,
    TableRow,
    TableCell,
} from '@mui/material';
import { ordersApi } from '../../../api/orders';
import { useFormik } from "formik";
import * as Yup from "yup";
import React from 'react';



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

export function DetailsItem({ item }) {
    console.log("item", item)
    return (
        <>
            <TableRow>
                <TableCell
                    colSpan={7}
                    sx={{
                        p: 0,
                        position: "relative",
                        "&:after": {
                            position: "absolute",
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: "primary.main",
                            width: 3,
                            height: "calc(100% + 1px)",
                        },
                    }}
                >
                    <CardContent>
                        <Grid spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Typography color="textPrimary" variant='h6'>
                                    Item Details
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={3}>
                                    {/* <Grid item md={6} xs={12}>
                                        <Typography color="textPrimary" variant='h6'>
                                            Item Id
                                        </Typography>
                                        <Typography color="textPrimary" variant='h7'>
                                            {item.id}
                                        </Typography>
                                    </Grid> */}
                                    <Grid item md={6} xs={12}>
                                        <Typography color="textPrimary" variant='h6'>
                                            Item sku
                                        </Typography>
                                        <Typography color="textPrimary" variant='h7'>
                                            {item.sku}
                                        </Typography>
                                    </Grid>
                                    {/* <Grid item md={6} xs={12}>
                                        <Typography color="textPrimary" variant='h6'>
                                            Store Id
                                        </Typography>
                                        <Typography color="textPrimary" variant='h7'>
                                            {item.storeId}
                                        </Typography>
                                    </Grid> */}
                                </Grid>
                                
                            </Grid>
                            <Grid item md={6} xs={12} marginY={1}>
                                <Typography color="textPrimary" variant='h6'>
                                    Groups Details
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                {item.groups.map(group => (
                                    <>
                                        <Grid container md={6} xs={12} marginY={1}>
                                            <Grid item md={6} xs={12}>
                                                <Typography color="textPrimary" variant='h6'>
                                                    Groups Title
                                                </Typography>
                                                <Typography color="textPrimary" variant='h7'>
                                                    {group.title}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container md={6} xs={12} marginY={1}>
                                            {group.values.map((value, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid item md={6} xs={12}>
                                                        <Typography color="textPrimary" variant='h6'>
                                                            {value.label}
                                                        </Typography>
                                                        <Typography color="textPrimary" variant='h7'>
                                                            {value.value}
                                                        </Typography>
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                        </Grid>
                                    </>
                                ))}
                            </Grid>

                        </Grid>
                    </CardContent>
                    <Divider />
                </TableCell>
            </TableRow>




        </>
    )
}
