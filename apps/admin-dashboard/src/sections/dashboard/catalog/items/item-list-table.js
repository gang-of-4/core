import { Fragment, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import {
  Box,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../../components/scrollbar";
import { SeverityPill } from "../../../../components/severity-pill";
import { catalogApi } from "../../../../api/catalog";
import CurrentItem from "./item-list-table-current";
import { capitalize } from "../../../../utils/format-string";
import { config } from "ui/config";

const getStatusColor = (status) => {
  switch (status) {
    case "APPROVED":
      return "success";
    case "PENDING":
      return "warning";
    case "INREVIEW":
      return "info";
    case "REJECTED":
      return "error";
    case "DRAFT":
      return "info";
    default:
      return "info";
  }
};

export const ItemsListTable = (props) => {
  const { items, hasUpdatedItems, setHasUpdatedItems, ...other } = props;
  const [currentItem, setCurrentItem] = useState(null);

  const handleItemToggle = useCallback((itemId) => {
    setCurrentItem((prevItemId) => {
      if (prevItemId === itemId) {
        return null;
      }

      return itemId;
    });
  }, []);

  const handleItemClose = useCallback(() => {
    setCurrentItem(null);
  }, []);

  const handleItemUpdate = useCallback(async (values) => {
    await catalogApi.editStatus({
      id: values.id,
      status: values.status,
    });
    setCurrentItem(null);
    toast.success(`${capitalize(config.catalog.item.name)} updated`);
  }, []);

  const handleItemDelete = useCallback(async (id) => {
    await catalogApi.deleteItem(id);
    setHasUpdatedItems(!hasUpdatedItems);
    setCurrentItem(null);
    toast.success(`${capitalize(config.catalog.item.name)} deleted`);
  }, []);

  return (
    <div {...other}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const isCurrent = item.id === currentItem;
              const statusColor = getStatusColor(item.status);

              const initialValues = {
                status: item.status,
              };

              return (
                <Fragment key={item.id}>
                  <TableRow hover key={item.id}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(isCurrent && {
                          position: "relative",
                          "&:after": {
                            position: "absolute",
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: "primary.main",
                            width: 3,
                            height: "calc(100% + 1px)",
                          },
                        }),
                      }}
                      width="25%"
                    >
                      <IconButton onClick={() => handleItemToggle(item.id)}>
                        <SvgIcon>
                          {isCurrent ? (
                            <ChevronDownIcon />
                          ) : (
                            <ChevronRightIcon />
                          )}
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: "center",
                            backgroundColor: "neutral.50",
                            borderRadius: 1,
                            display: "flex",
                            height: 80,
                            justifyContent: "center",
                            width: 80,
                          }}
                        >
                          {item?.images?.[0]?.url ? (
                            <Box
                              component="img"
                              alt={item.name}
                              src={item.images[0].url}
                              sx={{
                                borderRadius: 1,
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <SvgIcon>
                              <Image01Icon />
                            </SvgIcon>
                          )}
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="subtitle2">
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{item?.sku}</Typography>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusColor}>
                        {item.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                  {isCurrent && (
                    <CurrentItem
                      handleItemClose={handleItemClose}
                      handleItemDelete={handleItemDelete}
                      handleItemUpdate={handleItemUpdate}
                      initialValues={initialValues}
                      item={item}
                      hasUpdatedItems={hasUpdatedItems}
                      setHasUpdatedItems={setHasUpdatedItems}
                    />
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};
