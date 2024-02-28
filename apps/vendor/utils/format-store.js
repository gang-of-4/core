import { getInitials } from "ui/utils/get-initials";

export function formatStore({store, user}) {
        
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