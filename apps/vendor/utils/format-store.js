import { usersApi } from "@/api/usersApi";
import { getInitials } from "ui/utils/get-initials";

export async function formatStore(store) {
        
        const vendorId = store?.vendorId;
        let vendor = {};
        try {
            vendor = await usersApi.getUser(vendorId);
            if (!vendor?.id) throw new Error(`Vendor with id ${vendorId} not found`);
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
}