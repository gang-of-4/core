'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Container,
    Link,
    Stack,
    SvgIcon,
    Typography,
    CardContent,
} from '@mui/material';
import { useMounted } from 'ui/hooks/use-mounted';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import NextLink from 'next/link';
import fetchApi from '@/utils/fetch-api';
import OptionsForm from './OptionsForm';
import BasicInfoForm from './BasicInfoForm';
import ImagesForm from './ImagesForm';
import VariantsForm from './VariantsForm';


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
            sku: Yup.string().notRequired(),
            price: Yup.number().notRequired(),
            quantity: Yup.number().notRequired(),
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

export default function EditItemForm({ storeId, item, categories, optionGroups }) {

    const [selectedFileName, setSelectedFileName] = useState('');
    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: item.name || '',
        sku: item.sku || '',
        price: item.price || 0,
        description: item.description || '',
        quantity: item.quantity || 0,
        categories: (item.categories && item.categories?.length > 0) ? item.categories.map((category) => category.id) : [],
        options: (item.options && item.options?.length > 0) ? item.options.map((option) => option.id) : [],
        variants: (item.variants && item.variants?.length > 0) ? item.variants : [],
        images: [],
        submit: null
    };

    const isMounted = useMounted();
    const router = useRouter();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        const { values } = formik;
        setLoading(true);
        console.log('Submitting values ...', values);
        try {
            await fetchApi({
                url: `/vendor/api/catalog/items/${item.id}`,
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

            if (isMounted()) {
                router.push(`/dashboard/stores/${storeId}/items`);
            }
            setSelectedFileName('');
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
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
                    <Card>
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
                        <CardHeader title="Add New Car" />
                        <CardContent>
                            <form
                                noValidate
                            >
                                <Stack
                                    direction={'column'}
                                    spacing={8}
                                >
                                    <Stack
                                        spacing={3}
                                        direction={'column'}
                                    >
                                        <Typography variant="body1" color="textPrimary">
                                            Basic Information
                                        </Typography>
                                        <BasicInfoForm formik={formik} categories={categories} />
                                    </Stack>

                                    <Stack
                                        spacing={3}
                                        direction={'column'}
                                    >
                                        <Typography variant="body1" color="textPrimary">
                                            Options
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Options are used to define the different variations of your item.
                                            <br />
                                            You don&apos;t need to add values for all options below. Choose what you need and leave the rest empty.
                                        </Typography>
                                        <OptionsForm formik={formik} optionGroups={optionGroups} />
                                    </Stack>

                                    <Stack
                                        spacing={3}
                                        direction={'column'}
                                    >
                                        <Typography variant="body1" color="textPrimary">
                                            Images
                                        </Typography>
                                        <ImagesForm
                                            formik={formik}
                                            selectedFileName={selectedFileName}
                                            setSelectedFileName={setSelectedFileName}
                                        />
                                    </Stack>

                                    <Stack
                                        spacing={3}
                                        direction={'column'}
                                    >
                                        <Typography variant="body1" color="textPrimary">
                                            Variants
                                        </Typography>
                                        <VariantsForm
                                            formik={formik}
                                            optionGroups={optionGroups}
                                            draftItemId={item.id}
                                        />
                                    </Stack>

                                    <Stack
                                        direction={'row'}
                                        spacing={2}
                                        justifyContent={'flex-end'}
                                    >
                                        <Button
                                            size="large"
                                            variant="contained"
                                            color="inherit"
                                            component={NextLink}
                                            href={`/dashboard/stores/${storeId}/items`}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            disabled={formik.isSubmitting || loading}
                                            size="large"
                                            variant="contained"
                                            onClick={handleSubmit}
                                        >
                                            {loading ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </Stack>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </Container >
            </Box >
        </>
    );
};