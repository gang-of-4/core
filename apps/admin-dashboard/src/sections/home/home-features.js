import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Feature from "./home-feature";

const features = [
  {
    id: "auth",
    title: "Auth",
    description:
      "This feature enables the user to register in the system, so that their account is saved and can be logged into at any time. In addition to assigning roles to users which grants them their respective permissions.",
    icon: "🔒",
  },
  {
    id: "stores-management",
    title: "Stores Management",
    description:
      "This feature enables the vendor to add a store. If approved by the admin (YOU), the vendor is able to add items for sale. In addition, the vendor can manage his store.",
    icon: "🏪",
  },
  {
    id: "catalog",
    title: "Catalog",
    description:
      "This feature contains managing items - adding, editing, deleting, and viewing so that users can view and search for their needed items.",
    icon: "🍟",
  },
  {
    id: "orders-management",
    title: "Orders Management",
    description:
      "This feature contains the creation of an order and tracking of its status, so that users can view and track their orders.",
    icon: "🧾",
  },
  {
    id: "cart",
    title: "Cart",
    description:
      "This feature enables users to add items to their cart and enables checkout for those items with the ability to apply certain discounts or promotions.",
    icon: "🛒",
  },
  {
    id: "payment",
    title: "Payment",
    description:
      "This feature implements a payment process for easy bill payment by users.",
    icon: "💳",
  },
  {
    id: "notifications",
    title: "Notifications",
    description:
      "This feature enables users to receive notifications based on certain events that trigger them, so that users are informed of new updates (for example regarding their order status).",
    icon: "🔔",
  },
  {
    id: "bidding",
    title: "Bidding",
    description:
      "This feature introduces a bidding process for users to bid on items that support this feature and sell to the highest bidder.",
    icon: "📈",
  },
  {
    id: "reviews",
    title: "Reviews",
    description:
      "This feature enables customers to write a review on items they purchased.",
    icon: "🌟",
  },
  {
    id: "discounts-and-promotions",
    title: "Discounts & Promotions",
    description:
      "This feature allows admins to create discounts and promotions for items.",
    icon: "🏷️",
  },
  {
    id: "profiles-management",
    title: "Profiles Management",
    description:
      "Users can edit their profiles with personal information and reset their passwords.",
    icon: "👤",
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    description:
      "This feature enables users to subscribe to different plans that include special discounts on items and shipping.",
    icon: "🔁",
  },
  {
    id: "wishlist",
    title: "Wishlist",
    description:
      "This feature enables users to add items into a list so that they can come back to them later.",
    icon: "🔖",
  },
  {
    id: "wallet",
    title: "Wallet",
    description:
      "This feature enables customers to store credits and associate it with their account so that they can use it later for payment within the marketplace.",
    icon: "💰",
  },
];

export const HomeFeatures = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = features[activeFeature];
  const icon = feature.icon || "❌";

  return (
    <Box
      sx={{
        backgroundColor: "neutral.800",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundImage: 'url("/admin/assets/gradient-bg.svg")',
        color: "common.white",
        py: "120px",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 8 }}>
          <Typography align="center" color="inherit" variant="h3">
            Everything you need to build your platform.
          </Typography>
          <Typography align="center" color="inherit" variant="subtitle2">
            The platform includes a set of common features available in most
            modern e-commerce platforms.
          </Typography>
        </Stack>
        <Grid alignItems="center" container spacing={3}>
          <Grid xs={12} md={6}>
            <Stack
              spacing={2}
              sx={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {features.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <Box
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    sx={{
                      borderRadius: 2.5,
                      color: "neutral.400",
                      cursor: "pointer",
                      width: "calc(50% - 12px)",
                      p: 3,
                      transition: (theme) =>
                        theme.transitions.create(
                          ["background-color, box-shadow", "color"],
                          {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                          }
                        ),
                      ...(isActive && {
                        backgroundColor: "primary.alpha12",
                        boxShadow: (theme) =>
                          `${theme.palette.primary.main} 0 0 0 1px`,
                        color: "common.white",
                      }),
                      "&:hover": {
                        ...(!isActive && {
                          backgroundColor: "primary.alpha4",
                          boxShadow: (theme) =>
                            `${theme.palette.primary.main} 0 0 0 1px`,
                          color: "common.white",
                        }),
                      },
                    }}
                  >
                    <Feature
                      title={feature.title}
                      description={feature.description}
                      expanded={isActive}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                "& div": {
                  width: "100%",
                  fontSize: 200,
                  textAlign: "center",
                },
              }}
            >
              <div>{icon}</div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
