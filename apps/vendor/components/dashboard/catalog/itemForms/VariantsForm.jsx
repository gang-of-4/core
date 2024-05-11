'use client'
import { useState } from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TextField,
} from '@mui/material';
import fetchApi from '@/utils/fetch-api';
import VariantOptions from '../itemPage/VariantOptions';


export default function VariantsForm({ formik, optionGroups, draftItemId, isDisabled }) {

    const [loading, setLoading] = useState(false);

    async function handleGenerateVariants() {

        setLoading(true);

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

        const variants = data.map((variant) => {
            return {
                ...variant,
                quantity: variant.quantity ?? 0,
                price: variant.price ?? 0,
            }
        });

        formik.setFieldValue('variants', variants);
        setLoading(false);
    }

    function handleVariantsChange({ value, index, field }) {
        formik.setFieldValue(`variants[${index}].${field}`, value);
    }

    return (
        <Stack
            spacing={4}
            direction='column'
        >
            {!(formik.values.variants?.length > 0) && (
                <Stack
                    spacing={4}
                    direction='row'
                    sx={{ width: '100%' }}
                >
                    <Stack
                        spacing={3}
                        sx={{ width: '100%' }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            By generating variants, you will create a variant for each combination of your options.
                            Then you can set each variant&apos;s information.
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
                            disabled={loading || isDisabled}
                        >
                            {loading ? 'Generating...' : 'Generate Variants'}
                        </Button>
                    </Stack>
                </Stack>
            )}

            {formik.values.variants?.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Variant Options</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {formik.values.variants.map((variant, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {variant.groups ? (
                                        <Stack spacing={1}>
                                            {variant?.groups?.map((group, index) => (
                                                <Stack key={group.id} spacing={1} direction={'row'}>
                                                    <Typography variant="subtitle2">
                                                        {group.title}:
                                                    </Typography>
                                                    <Stack spacing={1} direction={'row'}>
                                                        {group.options.map((option, index) => (
                                                            <FormControl key={index} component="fieldset">
                                                                {
                                                                    group.type === 'COLOR' ? (
                                                                        <Stack
                                                                            alignItems={'center'}
                                                                            justifyContent={'center'}
                                                                            marginRight={2}
                                                                        >
                                                                            <Tooltip title={option.label} arrow>
                                                                                <Box
                                                                                    sx={{
                                                                                        borderRadius: 1,
                                                                                        width: 25,
                                                                                        height: 25,
                                                                                        bgcolor: option.value,
                                                                                    }}
                                                                                />
                                                                            </Tooltip>
                                                                        </Stack>
                                                                    ) : (
                                                                        <Typography variant="subtitle2">
                                                                            {option.label}
                                                                        </Typography>
                                                                    )
                                                                }
                                                            </FormControl>
                                                        ))}
                                                    </Stack>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    ) : (
                                        <VariantOptions options={variant?.options} />
                                    )}
                                </TableCell>

                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        value={variant.sku ? variant.sku : ''}
                                        onChange={(event) => handleVariantsChange({
                                            value: event.target.value,
                                            index,
                                            field: 'sku'
                                        })}
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        value={variant.quantity ? variant.quantity : 0}
                                        onChange={(event) => handleVariantsChange({
                                            value: +event.target.value,
                                            index,
                                            field: 'quantity'
                                        })}
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        value={variant.price ? variant.price : 0}
                                        onChange={(event) => handleVariantsChange({
                                            value: +event.target.value,
                                            index,
                                            field: 'price'
                                        })}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Stack>
    )
}
