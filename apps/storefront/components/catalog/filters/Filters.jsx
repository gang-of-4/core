"use client"
import { useItems } from '@/contexts/ItemsContext'
import { Collapse, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import OptionsFilterSet from './OptionsFilterSet'
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import CategoriesFilterSet from './CategoriesFilterSet'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';


export default function Filters({ filtersList }) {

  const { appliedFilters, setAppliedFilters } = useItems()
  const [open, setIsOpen] = useState(false);
  const md = useMediaQuery((theme) => theme.breakpoints.up('md'));


  function handleFilterChange({ index, option, event }) {

    if (event.target.checked) {
      if (index in appliedFilters) {
        setAppliedFilters({
          ...appliedFilters,
          [index]: [...appliedFilters[index], option]
        });
      } else {
        setAppliedFilters(
          {
            ...appliedFilters,
            [index]: [option]
          }
        )
      }
    } else {
      if (index in appliedFilters) {
        setAppliedFilters({
          ...appliedFilters,
          [index]: appliedFilters[index].filter(prevOption => prevOption.id !== option.id)
        });
      } else {
        setAppliedFilters(
          {
            ...appliedFilters,
            [index]: undefined
          }
        )
      }
    }
  }

  function handleClearFilters() {
    setAppliedFilters({})
  }

  function isChecked({ index, option }) {
    let checked = false;
    if (index in appliedFilters) {
      if (appliedFilters[index].some(appliedOption => appliedOption.id === option.id)) checked = true;
    }
    return checked;
  }

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent='space-between'
        spacing={3}
        paddingX={{ xs: 0, md: 3 }}
      >
        <Typography variant="h6">
          Filters
        </Typography>
        <Stack
          alignItems="center"
          direction="row"
          spacing={0.5}
        >
          <IconButton
            color="inherit"
            onClick={handleClearFilters}
          >
            <SvgIcon fontSize="small">
              <RefreshCcw01Icon />
            </SvgIcon>
          </IconButton>
          {!md && (
            <IconButton
              onClick={() => setIsOpen(!open)}
            >
              <SvgIcon>
                {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </SvgIcon>
            </IconButton>
          )}
        </Stack>
      </Stack>
      {md ? (
        <Stack
          spacing={1}
          sx={{
            p: 3,
            pt: 4
          }}
        >
          <CategoriesFilterSet
            onChange={handleFilterChange}
            categories={filtersList?.categories}
            isChecked={isChecked}
          />
          <OptionsFilterSet
            onChange={handleFilterChange}
            groups={filtersList?.optionGroups}
            isChecked={isChecked}
          />
        </Stack>
      ) : (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Stack
            spacing={1}
            sx={{
              p: 3,
              pt: 4
            }}
          >
            <CategoriesFilterSet
              onChange={handleFilterChange}
              categories={filtersList?.categories}
              isChecked={isChecked}
            />
            <OptionsFilterSet
              onChange={handleFilterChange}
              options={filtersList?.options}
              isChecked={isChecked}
            />
          </Stack>
        </Collapse>
      )}
    </>
  )
}
