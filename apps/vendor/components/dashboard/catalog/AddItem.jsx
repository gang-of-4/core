'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    TableRow,
    InputAdornment,
    Tooltip
} from '@mui/material';
import { useMounted } from 'ui/hooks/use-mounted';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import NextLink from 'next/link';
import fetchApi from '@/utils/fetch-api';


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

const initialValues = {
    name: '',
    sku: '',
    price: 0,
    description: '',
    quantity: 0,
    categories: [],
    options: [],
    variants: [],
    images: [],
    submit: null
};

const validationSchema = Yup.object({
    name: Yup
        .string()
        .max(255)
        .required('Name is required'),
    sku: Yup
        .string()
        .required('SKU is required'),
    price: Yup
        .number()
        .required('Price is required'),
    description: Yup
        .string()
        .max(1000)
        .required('Car Price is required'),
    quantity: Yup
        .number()
        .notRequired(),
    categories: Yup.array().of(
        Yup.string().required('Category is required')
    ),
    options: Yup.array().of(
        Yup.string().required('Option is required')
    ),
    variants: Yup.array().of(
        Yup.object().shape({
            id: Yup.string().notRequired(),
        })
    ),
    images: Yup
        .array()
        .notRequired()
    // .test('fileFormat', 'Invalid file format. Only images are allowed.', (value) => {
    //     if (!value) return true;
    //     return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    // })
    // .test('fileSize', 'File size is too large. Maximum size is 2MB.', (value) => {
    //     if (!value) return true;
    //     return value && value.size <= 2 * 1024 * 1024; // 2MB
    // })
});

const AddItem = ({ storeId, draftItemId, categories, optionGroups }) => {

    const [selectedFileName, setSelectedFileName] = useState('');

    const [generateVariantsLoading, setGenerateVariantsLoading] = useState(false);

    const [variants, setVariants] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);

    const isMounted = useMounted();
    const router = useRouter();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const { data, error } = await fetchApi({
                    url: `/vendor/api/catalog/items/${draftItemId}`,
                    options: {
                        method: 'PATCH',
                        body: JSON.stringify({
                            name: values.name,
                            sku: values.sku,
                            quantity: +values.quantity,
                            price: +values.price,
                            description: values.description,
                            categories: values.categories,
                            options: values.options,
                            variants: values.variants,
                            store_id: storeId
                        })
                    }
                });

                if (error) {
                    console.error(error);
                }
                console.log('data', data);
                if (isMounted()) {
                    router.push(`/dashboard/stores/${storeId}/items`);
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

    async function handleGenerateVariants() {

        setGenerateVariantsLoading(true);

        const { values } = formik;
        const { options } = values;
        let optionsToSend = [];
        optionGroups.forEach((optionGroup, index) => {

            optionsToSend[index] = [];

            optionGroup.options.forEach((option) => {
                if (options.includes(option.id)) {
                    optionsToSend[index].push(option.id);
                }
            });
        });

        const filteredArray = optionsToSend.filter(item => item !== undefined && item !== null && item?.length > 0);


        console.log('optionsToSend', filteredArray);


        const { data } = await fetchApi({
            url: `/vendor/api/catalog/items/${draftItemId}/generate-variants`,
            options: {
                method: 'POST',
                body: JSON.stringify({
                    options: filteredArray,
                    draftItemId: draftItemId
                })
            }
        });

        console.log('data', data);

        setVariants(data);
        setGenerateVariantsLoading(false);
    }

    function handleVariantChange(variantId) {
        const { values, setFieldValue } = formik;
        const { variants } = values;

        if (variants.includes(variantId)) {
            setFieldValue('variants', variants.filter((id) => id !== variantId));
            setSelectedVariants(selectedVariants.filter((id) => id !== variantId));
        } else {
            setFieldValue('variants', [...variants, variantId]);
            setSelectedVariants([...selectedVariants, variantId]);
        }
    }
        

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
                                            <TextField
                                                error={!!(formik.touched.name && formik.errors.name)}
                                                fullWidth
                                                helperText={formik.touched.name && formik.errors.name}
                                                label="Name"
                                                name="name"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="name"
                                                value={formik.values.name}
                                            />

                                            <TextField
                                                error={!!(formik.touched.sku && formik.errors.sku)}
                                                fullWidth
                                                helperText={formik.touched.sku && formik.errors.sku}
                                                label="SKU"
                                                name="sku"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="sku"
                                                value={formik.values.sku}
                                            />

                                            <TextField
                                                error={!!(formik.touched.price && formik.errors.price)}
                                                fullWidth
                                                helperText={formik.touched.price && formik.errors.price}
                                                label="Price"
                                                name="price"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="price"
                                                value={formik.values.price}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">SAR</InputAdornment>,
                                                }}
                                            />
                                        </Stack>

                                        <Stack spacing={3}>
                                            <Tooltip title="Quantity can be added later for each variant">
                                                <TextField
                                                    error={!!(formik.touched.quantity && formik.errors.quantity)}
                                                    fullWidth
                                                    helperText={formik.touched.quantity && formik.errors.quantity}
                                                    label="Quantity (optional)"
                                                    name="quantity"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    type="quantity"
                                                    value={formik.values.quantity}
                                                />
                                            </Tooltip>

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

                                    <Stack
                                        paddingTop={3}
                                        spacing={4}
                                        direction='row'
                                        sx={{ width: '100%' }}
                                    >
                                        {categories && (
                                            <Stack
                                                spacing={3}
                                                sx={{ width: '100%' }}
                                            >
                                                <FormControl
                                                    fullWidth
                                                    error={!!(formik.touched.categories && formik.errors.categories)}
                                                >
                                                    <InputLabel id="categories-label">Categories</InputLabel>
                                                    <Select
                                                        labelId="categories-label"
                                                        multiple
                                                        name="categories"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.categories}
                                                    >
                                                        {categories?.map((category) => (
                                                            <MenuItem key={category.id} value={category.id}>
                                                                {category.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {formik.touched.categories && formik.errors.categories && (
                                                        <FormHelperText error>
                                                            {formik.errors.categories}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Stack>
                                        )}

                                        {optionGroups && (
                                            <Stack
                                                spacing={3}
                                                sx={{ width: '100%' }}
                                            >
                                                {optionGroups?.map((optionGroup, index) => (
                                                    <FormControl
                                                        fullWidth
                                                        key={optionGroup.id}
                                                        error={!!(formik.touched.options && formik.errors.options)}
                                                    >
                                                        <InputLabel id="options-label">{optionGroup.title}</InputLabel>
                                                        <Select
                                                            labelId="options-label"
                                                            multiple
                                                            name="options"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            value={formik.values.options}
                                                        >
                                                            {optionGroup?.options?.map((option) => {
                                                                if (optionGroup.type === 'COLOR') {
                                                                    return (
                                                                        <MenuItem key={option.id} value={option.id}>
                                                                            <Box
                                                                                sx={{
                                                                                    backgroundColor: option.value,
                                                                                    height: 24,
                                                                                    width: 24
                                                                                }}
                                                                            />
                                                                        </MenuItem>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <MenuItem key={option.id} value={option.id}>
                                                                            {option.label}
                                                                        </MenuItem>
                                                                    );
                                                                }
                                                            })}
                                                        </Select>
                                                        {formik.touched.options && formik.errors.options && (
                                                            <FormHelperText error>
                                                                {formik.errors.options}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                ))}
                                            </Stack>
                                        )}
                                    </Stack>
                                </Card>

                                <Card elevation={16} className='p-4 mb-6'>
                                    <CardHeader
                                        sx={{ pt: 0 }}
                                        title="Images"
                                    />
                                    <Stack
                                        spacing={4}
                                        direction='row'
                                        sx={{ width: '100%' }}
                                    >
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
                                    <CardHeader
                                        sx={{ pt: 0 }}
                                        title="Variants"
                                    />

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
                                                By generating variants, you will create a variant for each combination of your options.
                                                Then you can set each variant's information.
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            justifyContent={'space-between'}
                                            alignItems={'center'}
                                            sx={{ width: '100%', textAlign: 'center' }}>
                                            <Button
                                                fullWidth
                                                size="large"
                                                variant="outlined"
                                                sx={{ margin: 'auto' }}
                                                onClick={handleGenerateVariants}
                                                disabled={generateVariantsLoading}
                                            >
                                                {generateVariantsLoading ? 'Generating...' : 'Generate Variants'}
                                            </Button>
                                        </Stack>

                                        {variants.length > 0 && (
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Select</TableCell>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>SKU</TableCell>
                                                        <TableCell>Options</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {variants.map((variant, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                <Checkbox
                                                                    checked={selectedVariants.includes(variant.id)}
                                                                    onChange={() => handleVariantChange(variant.id)}
                                                                />
                                                            </TableCell>
                                                            <TableCell>{variant.name}</TableCell>
                                                            <TableCell>{variant.sku}</TableCell>
                                                            <TableCell>
                                                                <Stack spacing={1}>
                                                                    {variant?.groups?.map((group, index) => {
                                                                        if (group.type === 'COLOR') {
                                                                            return (
                                                                                <Box
                                                                                    key={index}
                                                                                    sx={{
                                                                                        borderRadius: 1,
                                                                                        width: 25,
                                                                                        height: 25,
                                                                                        bgcolor: group.options?.[0].value
                                                                                    }}
                                                                                />
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <Typography key={index} variant="body1">
                                                                                    {group.title}: {group.options?.[0].label}
                                                                                </Typography>
                                                                            )
                                                                        }
                                                                    })}
                                                                </Stack>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        )}
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
                                            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </Stack>
                                </Card>

                            </form>
                        </CardContent>
                    </Card >
                </Container >
            </Box >
        </>
    );
};

export default AddItem;
