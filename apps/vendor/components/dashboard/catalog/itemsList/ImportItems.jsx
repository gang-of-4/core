"use client"
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FormHelperText, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useActiveStore } from '@/contexts/ActiveStoreContext';
import { capitalize } from '@/utils/format-string';
import { config } from 'ui/config';



const validationSchema = Yup.object({
    file: Yup.mixed().required('A file is required')
});

export default function ImportItems() {

    const { activeStore } = useActiveStore();

    const formik = useFormik({
        initialValues: {
            file: null
        },
        validationSchema,
        onSubmit: values => {
            // @TODO: integrate with the API for excel file import
            console.log("store:", activeStore, values);
        }
    });

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                style={{
                    height: 'fit-content',
                }}
            >
                <Stack
                    alignItems={'center'}
                    justifyContent={'center'}
                    direction={'row'}
                    spacing={2}
                >
                    <Button
                        variant="contained"
                        component="label"
                        style={{ backgroundColor: '#FF2929' }}
                        startIcon={<CloudUploadIcon />}
                    >
                        {
                            formik.values.file ? `Selected: ${formik.values.file.name}` : `Import ${capitalize(config.catalog.item.plural)}`
                        }
                        <input
                            type="file"
                            name="file"
                            onChange={(event) => {
                                formik.setFieldValue('file', event.currentTarget.files[0]);
                            }}
                            style={{ display: 'none' }}
                        />
                    </Button>
                    {formik.touched.file && formik.errors.file && (
                        <FormHelperText error sx={{ mt: 1 }}>
                            {formik.errors.file}
                        </FormHelperText>
                    )}
                    {
                        formik.values.file && (
                            <Button
                                type="submit"
                                variant="outlined"
                            >
                                Import
                            </Button>
                        )
                    }

                </Stack>
            </form>
        </>
    )
}
