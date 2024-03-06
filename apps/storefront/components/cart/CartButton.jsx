import ShoppingCart01Icon from '@untitled-ui/icons-react/build/esm/ShoppingCart01';
import { Badge, IconButton, SvgIcon, Tooltip } from '@mui/material';


export function CartButton() {

  return (
    <>
      <Tooltip title="Cart">
        <IconButton>
          <Badge
            color="error"
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
