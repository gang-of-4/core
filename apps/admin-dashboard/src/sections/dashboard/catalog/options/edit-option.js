import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
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
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useMounted } from "../../../../hooks/use-mounted";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { paths } from "../../../../paths";
import { catalogApi } from "../../../../api/catalog";
import { capitalize } from "../../../../utils/format-string";
import { config } from "ui/config";

const validationSchema = Yup.object({
  optionsToAdd: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().max(255).required("Label is required"),
      value: Yup.string().max(255).required("Value is required"),
    })
  ),
});

export function OptionEditForm({ group }) {
  const initialValues = {
    optionsToAdd: [],
    submit: null,
  };

  const options = group?.options ?? [];
  const [optionsToAdd, setOptionsToAdd] = useState([]);
  const router = useRouter();
  const isMounted = useMounted();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      values.optionsToAdd.forEach(async (option) => {
        try {
          await catalogApi.addOption({
            groupId: group.id,
            label: option.label,
            value: option.value,
          });
        } catch (err) {
          console.error(err);
          if (isMounted()) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
          }
        }
      });

      if (isMounted()) {
        router.push(paths.dashboard.catalog.options.index);
      }
    },
  });

  const optionName = capitalize(config.catalog.option.name);

  function handleAddOption() {
    setOptionsToAdd([...optionsToAdd, { label: "", value: "" }]);
  }

  function handleRemoveAddedOption(option) {
    const newOptions = optionsToAdd.filter((o) => o !== option);
    setOptionsToAdd(newOptions);
    formik.setFieldValue("optionsToAdd", newOptions);
  }

  function handleOptionChangeAdded({ index, e }) {
    const { name, value } = e.target;
    const newOptions = [...optionsToAdd];
    newOptions[index][name] = value;
    setOptionsToAdd(newOptions);
    formik.setFieldValue("optionsToAdd", newOptions);
  }

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Stack
            spacing={3}
            direction={{ sm: "column", md: "row" }}
            sx={{ width: "100%" }}
          >
            <Stack spacing={3} sx={{ width: "100%" }}>
              <TextField
                label="Title"
                name="title"
                type="title"
                defaultValue={group.title}
                disabled
              />

              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  row
                  aria-label="Type"
                  name="type"
                  defaultValue={group.type}
                >
                  <FormControlLabel
                    value="TEXT"
                    control={<Radio />}
                    label="Text only"
                    disabled
                  />
                  <FormControlLabel
                    value="COLOR"
                    control={<Radio />}
                    label="Color"
                    disabled
                  />
                  <FormControlLabel
                    value="image"
                    control={<Radio />}
                    label="Image"
                    disabled
                  />
                </RadioGroup>
              </FormControl>

              <Typography variant="body2" color="textSecondary">
                {capitalize(config.catalog.optionGroup.plural)} cannot be edited
                after creation in this release. You can still add new{" "}
                {config.catalog.option.plural} to this{" "}
                {config.catalog.optionGroup.name}.
                <br />
                We apologize for the inconvenience and are working on a
                solution.
              </Typography>
            </Stack>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <Button
                onClick={handleAddOption}
                variant="outlined"
                startIcon={
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                }
              >
                Add {optionName}
              </Button>

              {options.map((option, index) => (
                <Stack
                  key={index}
                  spacing={3}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Stack spacing={3} sx={{ width: "100%" }} direction={"row"}>
                    <TextField
                      label={`${optionName} ${index + 1} Label`}
                      name={`label`}
                      defaultValue={option.label}
                      disabled
                    />
                    {group.type === "COLOR" ? (
                      <FormControl component="fieldset">
                        <Stack
                          spacing={3}
                          direction="row"
                          height={"100%"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <FormLabel component="legend">
                            {optionName} {index + 1} Value
                          </FormLabel>
                          <input
                            type="color"
                            name="value"
                            defaultValue={option.value}
                            disabled
                            style={{
                              WebkitAppearance: "none",
                              height: "48px",
                              width: "48px",
                              background: "none",
                              border: "none",
                            }}
                          />
                        </Stack>
                      </FormControl>
                    ) : (
                      <TextField
                        label={`${optionName} ${index + 1} Value`}
                        name={`value`}
                        defaultValue={option.value}
                        disabled
                      />
                    )}
                  </Stack>
                  <Stack alignItems={"center"} justifyContent={"center"}>
                    <IconButton disabled>
                      <SvgIcon>
                        <XIcon />
                      </SvgIcon>
                    </IconButton>
                  </Stack>
                </Stack>
              ))}

              {optionsToAdd.map((option, index) => (
                <Stack
                  key={index}
                  spacing={3}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Stack spacing={3} sx={{ width: "100%" }} direction={"row"}>
                    <TextField
                      error={
                        !!(
                          formik.touched.optionsToAdd?.[index]?.label &&
                          formik.errors.optionsToAdd?.[index]?.label
                        )
                      }
                      helperText={
                        formik.touched.optionsToAdd?.[index]?.label &&
                        formik.errors.optionsToAdd?.[index]?.label
                      }
                      label={`${optionName} ${
                        index + 1 + options?.length
                      } Label`}
                      name={`label`}
                      onChange={(e) => handleOptionChangeAdded({ index, e })}
                      value={option.label}
                    />
                    {group.type === "COLOR" ? (
                      <FormControl component="fieldset">
                        <Stack
                          spacing={3}
                          direction="row"
                          height={"100%"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <FormLabel component="legend">
                            {optionName} {index + 1 + options?.length} Value
                          </FormLabel>
                          <input
                            type="color"
                            name="value"
                            value={option.value}
                            onChange={(e) =>
                              handleOptionChangeAdded({ index, e })
                            }
                            style={{
                              WebkitAppearance: "none",
                              height: "48px",
                              width: "48px",
                              background: "none",
                              border: "none",
                            }}
                          />
                        </Stack>
                        {formik.errors.optionsToAdd?.[index]?.value && (
                          <FormHelperText error>
                            {formik.errors.optionsToAdd?.[index]?.value}
                          </FormHelperText>
                        )}
                      </FormControl>
                    ) : (
                      <TextField
                        error={
                          !!(
                            formik.touched.optionsToAdd?.[index]?.value &&
                            formik.errors.optionsToAdd?.[index]?.value
                          )
                        }
                        helperText={
                          formik.touched.optionsToAdd?.[index]?.value &&
                          formik.errors.optionsToAdd?.[index]?.value
                        }
                        label={`${optionName} ${
                          index + 1 + options?.length
                        } Value`}
                        name={`value`}
                        onChange={(e) => handleOptionChangeAdded({ index, e })}
                        value={option.value}
                      />
                    )}
                  </Stack>
                  <Stack alignItems={"center"} justifyContent={"center"}>
                    <Tooltip
                      title={`Remove ${capitalize(
                        config.catalog.option.name
                      )} ${index + 1 + options?.length}`}
                      arrow
                    >
                      <IconButton
                        onClick={() => {
                          handleRemoveAddedOption(option);
                        }}
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
            <FormHelperText error sx={{ mt: 3 }}>
              {formik.errors.submit}
            </FormHelperText>
          )}

          <Stack
            direction="row"
            justifyContent={{
              sm: "center",
              md: "flex-end",
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
              Update
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
