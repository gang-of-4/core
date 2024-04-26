"use client";

import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Layout as MainLayout } from "ui/layouts/marketing";
import { Box } from "@mui/material";
import { PagesPopover } from "ui/layouts/marketing/pages-popover";
import { CartButton } from "./cart/CartButton";
import { Footer } from "ui/layouts/marketing/footer";
import { config } from "ui/config";
import { capitalize } from "@/utils/format-string";
import { Settings01, ReceiptCheck } from "@untitled-ui/icons-react";

export default function Header({ children, categories }) {
  const auth = useAuth();

  const sections = [
    {
      items: categories.map((category) => {
        return {
          title: category.name,
          path: `/catalog/categories/${category.id}`,
        };
      }),
    },
  ];

  const items = {
    home: {
      title: "Home",
      path: "/",
    },
    catalog: {
      title: capitalize(config.catalog.category.plural),
    },
    stores: {
      title: capitalize(config.store.plural),
      path: "/stores",
    },
    about: {
      title: capitalize(config.about.name),
      path: "/about",
    },
    contact: {
      title: capitalize(config.contact.name),
      path: "/contact",
    },
  };

  const sideItems = [
    {
      title: items.home.title,
      path: items.home.path,
    },
    {
      title: items.catalog.title,
      children: [
        {
          items: categories.map((category) => {
            return {
              title: category.name,
              path: `/catalog/category/${category.slug}`,
            };
          }),
        },
      ],
    },
    {
      title: items.stores.title,
      path: items.stores.path,
    },
    {
      title: items.about.title,
      path: items.about.path,
    },
    {
      title: items.contact.title,
      path: items.contact.path,
    },
  ];

  const topItems = [
    {
      title: items.home.title,
      path: items.home.path,
    },
    {
      title: items.catalog.title,
      children: <PagesPopover sections={sections} />,
    },
    {
      title: items.stores.title,
      path: items.stores.path,
    },
    {
      title: items.about.title,
      path: items.about.path,
    },
    {
      title: items.contact.title,
      path: items.contact.path,
    },
  ];

  const accountPopoverButtons = [
    {
      text: "His Orders",
      href: "/orders",
      icon: <ReceiptCheck />,
    },
    {
      text: "Settings",
      href: "/settings",
      icon: <Settings01 />,
    },
  ];

  const topButtons = (
    <>
      <CartButton />
    </>
  );

  return (
    <>
      <MainLayout
        accountPopoverButtons={accountPopoverButtons}
        auth={auth}
        sideItems={sideItems}
        topItems={topItems}
        topButtons={topButtons}
      >
        <Box
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundImage: 'url("/assets/gradient-bg.svg")',
            pt: "100px",
            mb: "120px",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>
        <Footer />
      </MainLayout>
    </>
  );
}
