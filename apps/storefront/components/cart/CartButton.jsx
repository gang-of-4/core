"use client"
import ShoppingCart01Icon from '@untitled-ui/icons-react/build/esm/ShoppingCart01';
import { Badge, IconButton, SvgIcon, Tooltip } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import NextLink from 'next/link';
import { capitalize } from '@/utils/format-string';
import { config } from 'ui/config';


export function CartButton() {

  const { cart } = useCart();


  return (
    <>
      <Tooltip title={capitalize(config.cart.name)}>
        <IconButton
          component={NextLink}
          href="/cart"
        >
          <Badge
            color="primary"
            badgeContent={cart?.cartItems?.length}
          >
            <SvgIcon>
              <ShoppingCart01Icon />
            </SvgIcon>
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
}
