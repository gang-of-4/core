"use client";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import React, { useState } from "react";
import { config } from "ui/config";

export default function CategoriesFilterSet({
  onChange,
  categories,
  isChecked,
}) {
  const md = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [open, setIsOpen] = useState(md);

  return (
    <>
      {categories?.length > 0 && (
        <Stack spacing={1}>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography color="text.secondary" variant="overline">
              {config.catalog.category.plural}
            </Typography>
            <IconButton onClick={() => setIsOpen(!open)} size="small">
              <SvgIcon>
                {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </SvgIcon>
            </IconButton>
          </Stack>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack alignItems="start" direction="column" paddingLeft={1}>
              {categories?.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      checked={isChecked({
                        index: "Category",
                        option: category,
                      })}
                      onChange={(event) =>
                        onChange({ index: "Category", option: category, event })
                      }
                      value={category.slug}
                      name={category.name}
                    />
                  }
                  label={category.name}
                  sx={{
                    flexGrow: 1,
                    mr: 0,
                  }}
                />
              ))}
            </Stack>
          </Collapse>
        </Stack>
      )}
    </>
  );
}
