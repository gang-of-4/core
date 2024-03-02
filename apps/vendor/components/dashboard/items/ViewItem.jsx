'use client'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormHelperText,
    Link,
    Stack,
    SvgIcon,
    TextField,
    Typography,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { useMounted } from 'ui/hooks/use-mounted';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import NextLink from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const rows = [
    { name: 'Variant 1', brand: 'Brand 1', color: 'Red', size: 'XL', price: '', quantity: '' },
    { name: 'Variant 2', brand: 'Brand 2', color: 'Blue', size: 'M', price: '', quantity: '' },
    // Add more rows as needed
];

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const useParams = () => {
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || undefined;

    return {
        returnTo
    };
};


const validationSchema = Yup.object({
    carType: Yup
        .string()
        .required('Car type is required'),
    brandName: Yup
        .string()
        .max(255)
        .required('Brand Name is required'),
    carName: Yup
        .string()
        .max(255)
        .required('Car Name is required'),
    carYear: Yup
        .number()
        .max(255)
        .required('Car Year is required'),
    carColor: Yup
        .string()
        .max(255)
        .required('Car Color is required'),
    currency: Yup
        .string()
        .required('Currency is required'),
    carPrice: Yup
        .number()
        .max(255)
        .required('Car Price is required'),
    description: Yup
        .string()
        .max(1000)
        .required('Car Price is required'),
    images: Yup
        .array()
        .notRequired()
        .test('fileFormat', 'Invalid file format. Only images are allowed.', (value) => {
            if (!value) return true;
            return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        })
        .test('fileSize', 'File size is too large. Maximum size is 2MB.', (value) => {
            if (!value) return true;
            return value && value.size <= 2 * 1024 * 1024; // 2MB
        })
});

async function getCurrency() {
    const currency = await fetch(
        `${process.env.CURRENCIES_API_URL}`,
        { next: { revalidate: 0 } }
    ).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch currency');
        return res.json();
    });

    return currency;
}

async function getCarType() {
    const carType = await fetch(
        `${process.env.carType_API_URL}`,
        { next: { revalidate: 0 } }
    ).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch car type');
        return res.json();
    });

    return carType;
}

const ViewItem = ({ storeId, car }) => {

    const initialValues = {
        carType: car?.carType,
        brandName: car?.brandName,
        carName: car?.carName,
        carYear: car?.carYear,
        carColor: car?.carColor,
        currency: car?.currency,
        carPrice: car?.carPrice,
        description: car?.description,
        images: [],
        submit: null
    };

    const [attributes, setAttributes] = useState(car?.attributes || [{ key: '', value: '' }]);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [carTypeOptions, setCarTypeOptions] = useState([]);
    const isMounted = useMounted();
    const router = useRouter();
    const { returnTo } = useParams();
    // const { editCar } = useCars();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const car = {
                    carType: values.carType,
                    brandName: values.brandName,
                    carName: values.carName,
                    carYear: values.carYear,
                    carColor: values.carColor,
                    currency: values.currency,
                    carPrice: values.carPrice,
                    description: values.description,
                    images: formik.values.images,
                };

                // await editCar(car);

                if (isMounted()) {
                    // force a hard navigation to the dashboard
                    window.location.href = `/vendor/dashboard/stores/${storeId}`;
                }
                setSelectedFileName('');
            } catch (err) {
                console.error(err);

                if (isMounted()) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                }
            }
        }
    });

    function handleAttributeChange({ index, e }) {
        const { name, value } = e.target;
        const newAttributes = [...attributes];
        newAttributes[index][name] = value;
        setAttributes(newAttributes);
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Card elevation={16}>
                        <Box sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            px: 2,
                            pt: 4
                        }}>
                            <Link
                                color="primary"
                                component={NextLink}
                                href={`/dashboard/stores/${storeId}/items`}
                                sx={{
                                    alignItems: 'center',
                                    display: 'inline-flex'
                                }}
                                underline="hover"
                            >
                                <SvgIcon sx={{ mr: 1 }}>
                                    <ArrowLeftIcon />
                                </SvgIcon>
                                <Typography variant="subtitle2">
                                    Back to Cars
                                </Typography>
                            </Link>
                        </Box>
                        <CardHeader
                            sx={{ pb: 0 }}
                            title="View Car"
                        />
                        <Stack>
                            <Button
                                sx={{ width: '15%', alignSelf: 'end', marginRight: '25px' }}
                                size="small"
                                // startIcon={(
                                //     <SvgIcon>
                                //         <PlusIcon />
                                //     </SvgIcon>
                                // )}
                                variant="outlined"
                                component={NextLink}
                                href={`/items/add`}
                            >
                                Edit Car
                            </Button>
                        </Stack>



                        <CardContent>
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <Card elevation={16} className='p-4 mb-6'>
                                    <CardHeader
                                        sx={{ pt: 0 }}
                                        title="Basic Information"
                                    />

                                    <Stack
                                        spacing={3}
                                        direction='row'
                                        sx={{ width: '100%' }}
                                    >
                                        <Stack
                                            spacing={3}
                                            sx={{ width: '100%' }}
                                        >
                                            <Stack>
                                                <FormControl>
                                                    <Typography variant="subtitle1">Car Type:</Typography>
                                                    <Typography variant="body1">
                                                        {/* {selectedCarType ? selectedCarType.name : ''} */}
                                                    </Typography>
                                                </FormControl>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="subtitle1">Brand Name:</Typography>
                                                <Typography variant="body1">
                                                    {formik.values.brandName}
                                                </Typography>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="subtitle1">Car Name:</Typography>
                                                <Typography variant="body1">
                                                    {formik.values.itemName}
                                                </Typography>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="subtitle1">Car Year:</Typography>
                                                <Typography variant="body1">
                                                    {formik.values.itemYear}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            justifyContent={'space-between'}
                                            sx={{ width: '100%' }}

                                        >
                                            <Stack
                                                spacing={3}
                                            >
                                                <Stack>
                                                    <Typography variant="subtitle1">Car Color:</Typography>
                                                    <Typography variant="body1">
                                                        {formik.values.itemColor}
                                                    </Typography>
                                                </Stack>
                                                <Stack>
                                                    <Typography variant="subtitle1">Car Price:</Typography>
                                                    <Typography variant="body1">
                                                        {formik.values.itemPrice}
                                                    </Typography>
                                                </Stack>
                                                <Stack>
                                                    <Typography variant="subtitle1">Description:</Typography>
                                                    <Typography variant="body1">
                                                        {formik.values.description}
                                                    </Typography>
                                                </Stack>
                                            </Stack>


                                        </Stack>

                                    </Stack>
                                </Card>
                                <Card elevation={16} className='p-4 mb-6'>
                                    <CardHeader
                                        sx={{ pt: 0 }}
                                        title="Extra Information"
                                    />
                                    <Stack
                                        spacing={4}
                                        direction='row'
                                        sx={{ width: '100%' }}
                                    >
                                        <Stack
                                            spacing={3}
                                            sx={{ width: '100%' }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                You can add extra attributes to your item by adding key-value pairs.
                                            </Typography>
                                            {attributes.map((attribute, index) => (
                                                <Stack key={index} spacing={3} direction={'row'}>
                                                    <Typography variant="body1">{`Attribute ${index + 1} Key: ${attribute.key}`}</Typography>
                                                    <Typography variant="body1">{`Attribute ${index + 1} Value: ${attribute.value}`}</Typography>
                                                </Stack>
                                            ))}
                                        </Stack>


                                        <Stack
                                            justifyContent={'space-between'}
                                            sx={{ width: '100%' }}

                                        >
                                            <Stack spacing={3}>
                                                <div className='flex justify-center items-center'>
                                                    <Box
                                                        sx={{
                                                            alignItems: 'center',
                                                            backgroundColor: 'neutral.50',
                                                            borderRadius: 1,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            width: '40%',
                                                            aspectRatio: '1/1',
                                                        }}
                                                    >
                                                        <SvgIcon>
                                                            <Image01Icon />
                                                        </SvgIcon>
                                                    </Box>
                                                </div>
                                                <Typography variant="body2" color="textSecondary" sx={{ pl: 1 }}>
                                                    Accepted formats: JPEG, PNG, GIF.
                                                    <br />
                                                    Maximum size: 2MB
                                                </Typography>
                                                {selectedFileName && (
                                                    <Typography variant="body1">
                                                        Uploaded: {selectedFileName}
                                                    </Typography>
                                                )}
                                                {formik.touched.images && formik.errors.images && (
                                                    <FormHelperText error sx={{ mt: 1 }}>
                                                        {formik.errors.images}
                                                    </FormHelperText>
                                                )}
                                            </Stack>

                                        </Stack>

                                    </Stack>
                                </Card>
                                <Card elevation={16} className='p-4 mb-6'>
                                    <CardHeader
                                        sx={{ pt: 0 }}
                                        title="Variant Data "
                                    />
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Brand</TableCell>
                                                <TableCell>Color</TableCell>
                                                <TableCell>Size</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.brand}</TableCell>
                                                    <TableCell>{row.color}</TableCell>
                                                    <TableCell>{row.size}</TableCell>
                                                    <TableCell>
                                                        <Typography variant="body1">{row.quantity}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body1">{row.price}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Card>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default ViewItem;
