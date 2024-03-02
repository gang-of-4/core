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
    Checkbox,
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

const handlePriceChange = (index) => (event) => {
    // Handle price changes here, you can use formik or local state to manage the values
};

const handleQuantityChange = (index) => (event) => {
    // Handle quantity changes here, similar to price
};

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

const initialValues = {
    carType: '',
    brandName: '',
    carName: '',
    carYear: '',
    carColor: [],
    currency: '',
    carPrice: '',
    description: '',
    images: [],
    attributes: [{ name: '', value: '' }],
    submit: null
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
        .array()
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
        }),
    attributes: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Attribute Name is required'),
            value: Yup.string().required('Attribute Value is required')
        })
    )
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

async function getCarColor() {
    const currency = await fetch(
        `${process.env.CURRENCIES_API_URL}`,
        { next: { revalidate: 0 } }
    ).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch currency');
        return res.json();
    });

    return carColor;
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

const AddCar = ({ storeId }) => {

    const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [carTypeOptions, setCarTypeOptions] = useState([]);

    const [carColorOptions, setCarColorOptions] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const handleCheckboxChange = (index) => (event) => {
        const isChecked = event.target.checked;
        setSelectedVariants((prevSelected) => {
            const newSelected = [...prevSelected];
            if (isChecked) {
                newSelected.push(index);
            } else {
                const indexToRemove = newSelected.indexOf(index);
                if (indexToRemove !== -1) {
                    newSelected.splice(indexToRemove, 1);
                }
            }
            return newSelected;
        });
    };

    
    const isMounted = useMounted();
    const router = useRouter();
    const { returnTo } = useParams();
    // const { addCar } = useCars();
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

                await addCar(car);

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

    function handleAddAttribute() {
        setAttributes([...attributes, { key: '', value: '' }]);
    };

    function handleAttributeChange({index, e}) {
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
                    py: 6
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
                                href={`/dashboard/stores/${storeId}`}
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
                                    Back to Store
                                </Typography>
                            </Link>
                        </Box>
                        <CardHeader
                            sx={{ pb: 0 }}
                            title="Add Car"
                        />
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
                                        spacing={4}
                                        direction='row'
                                        sx={{ width: '100%' }}
                                    >
                                        <Stack
                                            spacing={3}
                                            sx={{ width: '100%' }}
                                        >
                                            <FormControl variant="filled" sx={{ minWidth: 120 }}>
                                                <InputLabel id="demo-simple-select-filled-label">Car Type</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    name="carType"
                                                    value={formik.values.carType}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {carTypeOptions.map((carType) => (
                                                        <MenuItem key={carType.id} value={carType.id}>
                                                            {carType.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <TextField
                                                error={!!(formik.touched.brandName && formik.errors.brandName)}
                                                fullWidth
                                                helperText={formik.touched.brandName && formik.errors.brandName}
                                                label="Brand Name"
                                                name="brandName"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="brandName"
                                                value={formik.values.brandName}
                                            />
                                            <TextField
                                                error={!!(formik.touched.carName && formik.errors.carName)}
                                                fullWidth
                                                helperText={formik.touched.carName && formik.errors.carName}
                                                label="Car Name"
                                                name="carName"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="carName"
                                                value={formik.values.carName}
                                            />
                                            <TextField
                                                error={!!(formik.touched.carYear && formik.errors.carYear)}
                                                fullWidth
                                                helperText={formik.touched.carYear && formik.errors.carYear}
                                                label="Car Year"
                                                name="carYear"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="carYear"
                                                value={formik.values.carYear}
                                            />

                                        </Stack>


                                        <Stack
                                            justifyContent={'space-between'}
                                            sx={{ width: '100%' }}

                                        >
                                            <Stack
                                                spacing={3}
                                            >
                                                <FormControl variant="filled" sx={{ minWidth: 100, marginRight: 2 }}>
                                                    <InputLabel id="demo-simple-select-filled-label">Car Color</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        name="carColor"
                                                        multiple
                                                        value={formik.values.carColor}
                                                        onChange={formik.handleChange}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {carColorOptions.map((carColor) => (
                                                            <MenuItem key={carColor.id} value={carColor.id}>
                                                                {carColor.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>


                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FormControl variant="filled" sx={{ minWidth: 100, marginRight: 2 }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Currency</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            name="currency"
                                                            value={formik.values.currency}
                                                            onChange={formik.handleChange}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {currencyOptions.map((currency) => (
                                                                <MenuItem key={currency.id} value={currency.id}>
                                                                    {currency.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                    <TextField
                                                        error={!!(formik.touched.carPrice && formik.errors.carPrice)}
                                                        fullWidth
                                                        helperText={formik.touched.carPrice && formik.errors.carPrice}
                                                        label="Car Price"
                                                        name="carPrice"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        type="carPrice"
                                                        value={formik.values.carPrice}
                                                    />
                                                </div>
                                                <TextField
                                                    error={!!(formik.touched.description && formik.errors.description)}
                                                    fullWidth
                                                    helperText={formik.touched.description && formik.errors.description}
                                                    label="Description"
                                                    name="description"
                                                    multiline
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    type="description"
                                                    value={formik.values.description}
                                                />
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
                                                    <TextField
                                                        label={`Attribute ${index + 1} Key`}
                                                        name={`key`}
                                                        onChange={(e) => handleAttributeChange({index, e})}
                                                        value={attribute.key}
                                                    />
                                                    <TextField
                                                        label={`Attribute ${index + 1} Value`}
                                                        name={`value`}
                                                        onChange={(e) => handleAttributeChange({index, e})}
                                                        value={attribute.value}
                                                    />
                                                </Stack>
                                            ))}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<AddCircleIcon />}
                                                onClick={handleAddAttribute}
                                            >
                                                Add Another Attribute
                                            </Button>
                                        </Stack>


                                        <Stack
                                            justifyContent={'space-between'}
                                            sx={{ width: '100%' }}

                                        >
                                            <Stack
                                                spacing={3}
                                            >
                                                <div
                                                    className='flex justify-center items-center'
                                                >

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
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    fullWidth
                                                    size="large"
                                                    sx={{ mt: 2 }}
                                                    style={{ backgroundColor: '#2970FF' }}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    {selectedFileName ? `Uploaded: ${selectedFileName}` : 'Upload Images'}
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        onChange={(event) => {
                                                            const selectedFile = event.currentTarget.files[0];
                                                            formik.setFieldValue('images', selectedFile);
                                                            setSelectedFileName(selectedFile ? selectedFile.name : '');
                                                        }}
                                                        inputProps={{ accept: 'image/jpeg, image/png, image/gif', multiple: true }}
                                                    />

                                                </Button>
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


                                    {formik.errors.submit && (
                                        <FormHelperText
                                            error
                                            sx={{ mt: 3 }}
                                        >
                                            {formik.errors.submit}
                                        </FormHelperText>
                                    )}
                                    <Stack
                                        spacing={4}
                                        direction='row'
                                        sx={{ width: '100%' }}
                                    >
                                        <Stack
                                            spacing={3}
                                            sx={{ width: '100%' }}
                                        >
                                            <Typography>
                                                Generate Variant means create for all combination items automatically.
                                                For example:
                                            </Typography>
                                            <Typography
                                                sx={{ padding: '10px' }}>
                                                T-shirt - Red - M
                                                <br />
                                                T-shirt - Red - L
                                                <br />
                                                T-shirt - Blue - M
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            justifyContent={'space-between'}
                                            alignItems={'center'}
                                            sx={{ width: '100%', textAlign: 'center' }}>
                                            <Button
                                                disabled={formik.isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                sx={{ margin: 'auto' }}
                                            >
                                                Generate Variant
                                            </Button>
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
                                                <TableCell>Select</TableCell>
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
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedVariants.includes(index)}
                                                            onChange={handleCheckboxChange(index)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.brand}</TableCell>
                                                    <TableCell>{row.color}</TableCell>
                                                    <TableCell>{row.size}</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            type="number"
                                                            value={row.quantity}
                                                            onChange={handleQuantityChange(index)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            type="number"
                                                            value={row.price}
                                                            onChange={handlePriceChange(index)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Card>

                                <Card elevation={16} className='p-4 mb-6'>


                                    {formik.errors.submit && (
                                        <FormHelperText
                                            error
                                            sx={{ mt: 3 }}
                                        >
                                            {formik.errors.submit}
                                        </FormHelperText>
                                    )}
                                    <Stack
                                        direction={'row'}
                                        spacing={2}
                                    >
                                        <Button
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                            color="inherit"
                                            component={NextLink}
                                            href={`/dashboard/stores/${storeId}`}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            disabled={formik.isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            Submit
                                        </Button>
                                    </Stack>
                                </Card>

                            </form>
                        </CardContent>
                    </Card>
                </Container >
            </Box >
        </>
    );
};

export default AddCar;
