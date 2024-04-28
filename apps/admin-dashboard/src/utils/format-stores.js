import { config } from "ui/config";
import { mediaApi } from "../api/media";
import { usersApi } from "../api/users";
import { capitalize } from "./format-string";
import { getInitials } from "./get-initials";

export async function formatStores(stores) {
  const formattedStoresPromises = stores.map(async (store) => {
    const vendorId = store?.vendorId;
    let vendor = {};
    try {
      vendor = await usersApi.getUser(vendorId);
    } catch (err) {
      console.error(err);
      vendor = {
        firstName: "Not",
        lastName: "Found",
      };
    }

    if (store?.individualStore) {
      return {
        id: store?.id,
        vendor: vendor,
        name: `${vendor?.firstName} ${vendor?.lastName}'s ${capitalize(
          config.store.name
        )}`,
        status: store?.status,
        logo: vendor?.avatar,
        type: "individual",
      };
    } else if (store?.businessStore) {
      if (store?.businessStore?.logo) {
        let media = {};
        try {
          media = await mediaApi.getMedia(store.businessStore.logo);
        } catch (err) {
          console.error(err);
        } finally {
          store.businessStore.logo = media;
        }
      }

      return {
        id: store?.id,
        vendor: vendor,
        name: store?.businessStore?.name,
        status: store?.status,
        vatNumber: store?.businessStore?.vatNumber,
        crNumber: store?.businessStore?.crNumber,
        ownerNationalId: store?.businessStore?.ownerNationalId,
        logo: store?.businessStore?.logo,
        type: "business",
      };
    } else {
      return { ...store, type: "unknown" };
    }
  });

  const formattedStores = await Promise.all(formattedStoresPromises);

  return formattedStores;
}
