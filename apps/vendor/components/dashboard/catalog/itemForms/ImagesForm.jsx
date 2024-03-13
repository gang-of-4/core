'use client'
import {
    Box,
    Button,
    FormHelperText,
    Stack,
    SvgIcon,
    Typography,
    styled,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';

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

export default function ImagesForm({
    formik,
    selectedFileName,
    setSelectedFileName
}) {
    return (
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
    )
}
