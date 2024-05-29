import { getInitials } from "ui/utils/get-initials";
import fetchApi from "./fetch-api";
import { config } from "ui/config";
import { capitalize } from "./format-string";

export async function formatStore({ store, user }) {

    let vendor = user;

    if (store?.individualStore) {
        return {
            id: store?.id,
            vendor: vendor,
            name: `${vendor?.firstName} ${vendor?.lastName}'s ${capitalize(config.store.name)}`,
            status: store?.status,
            logo: vendor?.avatar || getInitials(`${vendor?.firstName} ${vendor?.lastName}`),
            type: 'individual'
        }

    } else if (store?.businessStore) {

        if (store?.businessStore?.logo) {
            try{
                const { data } = await fetchApi({
                    url: `/api/media/${store.businessStore.logo}`,
                    includeToken: false
                });
                store.businessStore.logo = data;
            } catch (error) {
                console.error(error);
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
            type: 'business'
        }

    } else {
        return { ...store, type: 'unknown' };
    }
}