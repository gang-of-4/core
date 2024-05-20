import { Fragment, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import {
  Avatar,
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
import { Scrollbar } from "../../../components/scrollbar";
import { SeverityPill } from "../../../components/severity-pill";
import CurrentStore from "./store-list-table-current";
import { storesApi } from "../../../api/stores";
import { capitalize } from "../../../utils/format-string";
import { config } from "ui/config";
import { getInitials } from "../../../utils/get-initials";

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
    default:
      return "info";
  }
};

export const StoresListTable = (props) => {
  const {
    stores,
    storesCount,
    hasUpdatedStores,
    setHasUpdatedStores,
    ...other
  } = props;
  const [currentStore, setCurrentStore] = useState(null);

  const handleStoreToggle = useCallback((storeId) => {
    setCurrentStore((prevStoreId) => {
      if (prevStoreId === storeId) {
        return null;
      }

      return storeId;
    });
  }, []);

  const handleStoreClose = useCallback(() => {
    setCurrentStore(null);
  }, []);

  const handleStoreUpdate = useCallback(async (values) => {
    if (values.type === "business") {
      await storesApi.updateBusinessStore({
        id: values.id,
        name: values.name,
      });
      await storesApi.updateStore({
        id: values.id,
        status: values.status,
      });
    } else {
      await storesApi.updateStore({
        id: values.id,
        status: values.status,
      });
    }
    setCurrentStore(null);
    toast.success(`${capitalize(config.store.name)} updated`);
  }, []);

  async function handleStoreDelete(id) {
    try {
      await storesApi.deletStore(id);
      setHasUpdatedStores(!hasUpdatedStores);
      toast.success(`${capitalize(config.store.name)} deleted`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="35%">Name</TableCell>
              <TableCell width="35%">Owner</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => {
              const isCurrent = store.id === currentStore;
              const statusColor = getStatusColor(store.status);

              const initialValues = {
                name: store.name,
                status: store.status,
              };

              return (
                <Fragment key={store.id}>
                  <TableRow hover key={store.id}>
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
                      <IconButton
                        onClick={() => handleStoreToggle(store.id)}
                        data-test={`store-toggle-${store?.name}`}
                      >
                        <SvgIcon>
                          {isCurrent ? (
                            <ChevronDownIcon />
                          ) : (
                            <ChevronRightIcon />
                          )}
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell width="35%">
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Avatar
                            sx={{
                              height: 80,
                              width: 80,
                              fontSize: 32,
                            }}
                            {...(store?.logo && { src: store?.logo?.url })}
                          >
                            {getInitials(store?.name)}
                          </Avatar>
                        </Box>
                        <Box
                          sx={{
                            cursor: "pointer",
                            ml: 2,
                          }}
                        >
                          <Typography variant="subtitle2">
                            {store.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell width="35%">
                      <Typography variant="subtitle2">
                        {`${store?.vendor?.firstName} ${store?.vendor?.lastName}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusColor}>
                        {store.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                  {isCurrent && (
                    <CurrentStore
                      handleStoreClose={handleStoreClose}
                      handleStoreDelete={handleStoreDelete}
                      handleStoreUpdate={handleStoreUpdate}
                      initialValues={initialValues}
                      store={store}
                      hasUpdatedStores={hasUpdatedStores}
                      setHasUpdatedStores={setHasUpdatedStores}
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
