"use client";
import { Box, InputAdornment, SvgIcon, TextField } from "@mui/material";
import React from "react";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { useItems } from "@/contexts/ItemsContext";
import { useRouter } from "next/navigation";
import { config } from "ui/config";
import { getIndefiniteArticle } from "@/utils/format-string";

export default function SearchBar() {
  const router = useRouter();

  const { searchQuery, setSearchQuery } = useItems();

  function handleQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(searchQuery);
    router.push(`/catalog/items`);
  }

  const itemName = config.catalog.item.name;

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          label="Search"
          onChange={handleQueryChange}
          placeholder={`Search for ${
            getIndefiniteArticle(itemName) || "a"
          } ${itemName}...`}
          value={searchQuery}
        />
      </Box>
    </>
  );
}
