'use client'
import {
    Box,
    Button,
    FormHelperText,
    IconButton,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
    styled,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import XIcon from '@untitled-ui/icons-react/build/esm/X';


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
}) {

    function handleAddFiles(event) {
        const files = Array.from(event.currentTarget.files);
        const filteredFiles = files.filter(file => (
            file.type === 'image/jpeg' || file.type === 'image/png'
        ));
        const updatedFiles = [
            ...formik.values.images,
            ...filteredFiles,
        ];
        formik.setFieldValue('images', updatedFiles);
    }

    function handleRemoveFile(index) {
        formik.setFieldValue(
            'images',
            formik.values.images.filter((_, i) => i !== index)
        );
    }

    return (
        <Stack
            spacing={4}
            direction='row'
            sx={{ width: '100%' }}
        >
            <Stack
                spacing={3}
            >
                {formik.values.images.length > 0 && (
                    <Stack
                        justifyContent={'center'}
                        spacing={2}
                        direction={'column'}
                    >
                        {formik.values.images?.map((file, index) => (
                            <Stack
                                key={index}
                                direction={'row'}
                                spacing={1}
                                alignItems={'center'}
                            >
                                {file instanceof File && (
                                    <Box
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            backgroundColor: 'background.paper',
                                        }}
                                        component={'img'}
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                    />
                                )}
                                <Typography variant="body2" color="textPrimary">
                                    {file.name}
                                </Typography>
                                <Tooltip title='Remove Image' arrow>
                                    <IconButton
                                        onClick={() => handleRemoveFile(index)}
                                    >
                                        <SvgIcon>
                                            <XIcon />
                                        </SvgIcon>
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        ))
                        }
                    </Stack>
                )}
                <Typography variant="body2" color="textSecondary" sx={{ pl: 1 }}>
                    Accepted formats: JPEG, PNG.
                    <br />
                    Maximum size: 2MB
                </Typography>
                <Button
                    variant="contained"
                    component="label"
                    size="large"
                    sx={{ mt: 2 }}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload Images
                    <VisuallyHiddenInput
                        type="file"
                        name="images"
                        multiple
                        onChange={(event) => handleAddFiles(event)}
                        inputProps={{ accept: 'image/jpeg, image/png', multiple: true }}
                    />
                </Button>
                {formik.touched.images && formik.errors.images && (
                    <FormHelperText error sx={{ mt: 1 }}>
                        {formik.errors.images}
                    </FormHelperText>
                )}
            </Stack>
        </Stack>
    )
}
