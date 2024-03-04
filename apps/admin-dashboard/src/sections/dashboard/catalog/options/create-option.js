import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  SvgIcon,
  TextField,
  Tooltip,
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useMounted } from '../../../../hooks/use-mounted';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { paths } from '../../../../paths';
import { catalogApi } from '../../../../api/catalog';


const validationSchema = Yup.object({
  title: Yup
    .string()
    .max(255)
    .required('Title is required'),
  type: Yup
    .string()
    .max(255)
    .required('Type is required'),
  options: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().max(255).required('Option Label is required'),
      value: Yup.string().max(255).required('Option Value is required'),
    })
  ),
});

export function OptionCreateForm() {

  const initialValues = {
    title: '',
    type: 'radio',
    options: [{ label: '', value: '' }],
    submit: null
  };

  const [options, setOptions] = useState([{ label: '', value: '' }]);
  const router = useRouter();
  const isMounted = useMounted();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await catalogApi.createOptionGroup(values)

        if (isMounted()) {
          router.push(paths.dashboard.catalog.options.index);
        }
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

  function handleAddOption() {
    setOptions([...options, { label: '', value: '' }]);
  };

  function handleRemoveOption(option) {
    setOptions(options.filter((o) => o !== option));
  }

  function handleOptionChange({ index, e }) {
    const { name, value } = e.target;
    const newOptions = [...options];
    newOptions[index][name] = value;
    setOptions(newOptions);
    formik.setFieldValue('options', newOptions);
  };

  return (
    <>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Stack
          spacing={3}
        >
          <Stack
            spacing={3}
            direction={{ sm: 'column', md: 'row' }}
            sx={{ width: '100%' }}
          >
            <Stack
              spacing={3}
              sx={{ width: '100%' }}
            >
              <TextField
                error={!!(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                label="Title"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="title"
                value={formik.values.title}
              />

              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  row
                  aria-label="Type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value="radio" control={<Radio />} label="Radio" />
                  <FormControlLabel value="color" control={<Radio />} label="Color" />
                </RadioGroup>
              </FormControl>

            </Stack>
            <Stack
              spacing={3}
              sx={{ width: '100%' }}
            >

              <Button
                onClick={handleAddOption}
                variant="outlined"
                startIcon={(
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                )}

              >
                Add Option
              </Button>

              {options.map((option, index) => (
                <Stack
                  key={index}
                  spacing={3}
                  direction={'row'}
                  justifyContent={'space-between'}>
                  <Stack
                    spacing={3}
                    sx={{ width: '100%' }}
                    direction={'row'}
                  >
                    <TextField
                      error={!!(formik.touched.options?.[index]?.label && formik.errors.options?.[index]?.label)}
                      helperText={formik.touched.options?.[index]?.label && formik.errors.options?.[index]?.label}
                      label={`Option ${index + 1} Label`}
                      name={`label`}
                      onChange={(e) => handleOptionChange({ index, e })}
                      value={option.label}
                    />
                    {
                      formik.values.type === 'radio' ?
                        <TextField
                          error={!!(formik.touched.options?.[index]?.value && formik.errors.options?.[index]?.value)}
                          helperText={formik.touched.options?.[index]?.value && formik.errors.options?.[index]?.value}
                          label={`Option ${index + 1} Value`}
                          name={`value`}
                          onChange={(e) => handleOptionChange({ index, e })}
                          value={option.value}
                        />
                        :
                        <FormControl component="fieldset">
                          <Stack
                            spacing={3}
                            direction='row'
                            height={'100%'}
                            alignItems={'center'}
                            justifyContent={'center'}
                          >
                            <FormLabel component="legend"
                            >
                              Option {index + 1} Value
                            </FormLabel>
                            <input
                              type="color"
                              name='value'
                              value={option.value}
                              onChange={(e) => handleOptionChange({ index, e })}
                              style={{
                                WebkitAppearance: 'none',
                                height: '48px',
                                width: '48px',
                                background: 'none',
                                border: 'none',
                              }}
                            />
                          </Stack>
                          {formik.errors.options?.[index]?.value && (
                            <FormHelperText error>{formik.errors.options?.[index]?.value}</FormHelperText>
                          )}
                        </FormControl>
                    }
                  </Stack>
                  <Stack
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Tooltip title={`Remove Option ${index + 1}`} arrow>
                      <IconButton
                        onClick={() => { handleRemoveOption(option) }}
                      >
                        <SvgIcon>
                          <XIcon />
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              ))}

            </Stack>
          </Stack>

          {formik.errors.submit && (
            <FormHelperText
              error
              sx={{ mt: 3 }}
            >
              {formik.errors.submit}
            </FormHelperText>
          )}

          <Stack
            direction='row'
            justifyContent={{
              sm: 'center',
              md: 'flex-end'
            }}
            spacing={3}
          >

            <Button
              component={NextLink}
              href={paths.dashboard.catalog.options.index}
              size="large"
              variant="contained"
              color="inherit"
            >
              Cancel
            </Button>
            <Button
              disabled={formik.isSubmitting}
              size="large"
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          </Stack>

        </Stack>
      </form>
    </>
  )
}
