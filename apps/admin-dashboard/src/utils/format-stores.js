import { usersApi } from "../api/users";
import { getInitials } from './get-initials';

export async function formatStores(stores) {
    const formattedStoresPromises = stores.map(async (store) => {
        
        const vendorId = store?.vendorId;
        let vendor = {};
        try {
            vendor = await usersApi.getUser(vendorId);
        } catch (err) {
            console.error(err);
            vendor = {
                firstName: 'Not',
                lastName: 'Found',
            };
        }

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
    });

    const formattedStores = await Promise.all(formattedStoresPromises);

    return formattedStores;
}