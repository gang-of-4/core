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
import VariantsForm from './VariantsForm';
import { capitalize } from '@/utils/format-string';
import { config } from 'ui/config';


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
        .required('Description is required'),
    quantity: Yup
        .number()
        .notRequired(),
    categories: Yup.array().of(
        Yup.string().required('Category is required')
    ),
    options: Yup.array().of(
        Yup.string()
    ),
    variants: Yup.array().of(
        Yup.object().shape({
            id: Yup.string().notRequired(),
            sku: Yup.string().notRequired(),
            price: Yup.number().notRequired(),
            quantity: Yup.number().notRequired(),
        })
    ),
});

export default function EditItemForm({ storeId, item, categories, optionGroups }) {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: item.name || '',
        sku: item.sku || '',
        price: item.price || 0,
        description: item.description || '',
        quantity: item.quantity || 0,
        categories: (item.categories && item.categories?.length > 0) ? item.categories.map((category) => category.id) : [],
        options: (item.groups && item.groups?.length > 0) ?
            item.groups.map((group) => {
                return group.options.map((option) => option.id);
            }).flat()
            : [],
        variants: (item.variants && item.variants?.length > 0) ? item.variants : [],
        images: item.images?.map(image => image.id) || [],
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

        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('sku', values.sku);
        formData.append('quantity', +values.quantity);
        formData.append('price', +values.price);
        formData.append('description', values.description);
        formData.append('categories', JSON.stringify(values.categories));
        formData.append('options', JSON.stringify(values.options));
        formData.append('variants', JSON.stringify(values.variants));
        formData.append('mediaIds', values.images);
        formData.append('storeId', storeId);

        try {
            await fetchApi({
                url: `/vendor/api/catalog/items/${item.id}`,
                options: {
                    method: 'PATCH',
                    body: formData,
                }
            });

            if (isMounted()) {
                router.push(`/dashboard/stores/${storeId}/items`);
            }
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
                                    Back to {capitalize(config.catalog.item.plural)}
                                </Typography>
                            </Link>
                        </Box>
                        <CardHeader title={`Edit ${capitalize(config.catalog.item.name)}`} />
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
                                        <OptionsForm 
                                            formik={formik} 
                                            optionGroups={optionGroups} 
                                            isDisabled={formik.values.variants?.length > 0}
                                        />
                                    </Stack>

                                    <Stack
                                        spacing={3}
                                        direction={'column'}
                                    >
                                        <Typography variant="body1" color="textPrimary">
                                            Images
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Images cannot be edited at this time. If you need to change the images, please delete this item and create a new one.
                                            <br />
                                            We are working on adding this feature soon.
                                        </Typography>
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
                                            isDisabled={formik.values.options?.length === 0}
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
                                            variant="outlined"
                                            type="button"
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