import { getInitials } from "ui/utils/get-initials";
import fetchApi from "./fetch-api";

export async function formatStore({ store, user }) {

    let vendor = user;

    if (store?.individualStore) {
        return {
            id: store?.id,
            vendor: vendor,
            name: `${vendor?.firstName} ${vendor?.lastName}'s Store`,
            status: store?.status,
            logo: vendor?.avatar || getInitials(`${vendor?.firstName} ${vendor?.lastName}`),
            type: 'individual'
        }

    } else if (store?.businessStore) {

        if (store?.businessStore?.logo) {
            const { data } = await fetchApi({
                url: `/vendor/api/media/${store.businessStore.logo}`,
                includeToken: false
            });
            store.businessStore.logo = data;
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