"use client"
import ShoppingCart01Icon from '@untitled-ui/icons-react/build/esm/ShoppingCart01';
import { Badge, IconButton, SvgIcon, Tooltip } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import NextLink from 'next/link';


export function CartButton() {

  const { cartItems } = useCart();


  return (
    <>
      <Tooltip title="Cart">
        <IconButton
          component={NextLink}
          href="/cart"
        >
          <Badge
            color="primary"
            badgeContent={cartItems.length}
          >
            <SvgIcon>
              <ShoppingCart01Icon />
            </SvgIcon>
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
};
