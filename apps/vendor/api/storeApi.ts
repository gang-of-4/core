const apiUrl: string = 'http://localhost:3000/api/v1/stores';

export enum Status {
    PENDING = 'PENDING',
    INREVIEW = 'INREVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
};

type IndividualStore = {
    id: string;
    storeId: string;
};

type BusinessStore = {
    id: string;
    storeId: string;
    name: string;
    logo: string;
    vatNumber: string;
    crNumber: string;
    ownerNationalId: string;
};

type Store = {
    id: string;
    vendorId: string;
    status: Status;
    created_at: Date;
    updated_at: Date;
    individualStore: IndividualStore;
    businessStore: BusinessStore;
};

type CreateBusinessStoreDto = {
    vendorId: string;
    name: string;
    logo: string;
    vatNumber: string;
    crNumber: string;
    ownerNationalId: string;
};

type UpdateBusinessStoreDto = {
    name?: string;
    logo?: string;
    vatNumber?: string;
    crNumber?: string;
    ownerNationalId?: string;
};


export async function getStoresApi(vendorId: string): Promise<Store[]> {
    const res = await fetch(`${apiUrl}/vendor/${vendorId}`);
    const stores = await res.json();
    return new Promise<Store[]>((resolve, reject) => {
        if (stores?.length > 0) {
            resolve(stores);
        } else {
            reject();
        }
    });
};

export async function createIndividualStoreApi(vendorId: string): Promise<Store> {

    const res = await fetch(`${apiUrl}/individual`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            vendorId: vendorId,
        })
    });

    const store = await res.json();
    return new Promise<Store>((resolve, reject) => {
        if (store) resolve(store);
        else reject();
    });
};

export async function createBusinessStoreApi(createBusinessStoreDto: CreateBusinessStoreDto): Promise<Store> {
    const res = await fetch(`${apiUrl}/business`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            vendorId: createBusinessStoreDto.vendorId,
            name: createBusinessStoreDto.name,
            logo: createBusinessStoreDto.logo || 'default',
            vatNumber: createBusinessStoreDto.vatNumber,
            crNumber: createBusinessStoreDto.crNumber,
            ownerNationalId: createBusinessStoreDto.ownerNationalId,
        })
    });

    const store = await res.json();

    return new Promise<Store>((resolve, reject) => {
        if (store) resolve(store);
        else reject();
    });
};

export async function updateBusinessStoreApi(
    { storeId, updateBusinessStoreDto }
        : { storeId: string, updateBusinessStoreDto: UpdateBusinessStoreDto }
): Promise<Store> {

    const res = await fetch(`${apiUrl}/business/${storeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: updateBusinessStoreDto.name,
            logo: updateBusinessStoreDto.logo || 'default',
            vatNumber: updateBusinessStoreDto.vatNumber,
            crNumber: updateBusinessStoreDto.crNumber,
            ownerNationalId: updateBusinessStoreDto.ownerNationalId,
        })
    });

    const store = await res.json();

    return new Promise<Store>((resolve, reject) => {
        if (store) resolve(store);
        else reject();
    });
};

export async function deleteStoreApi(storeId: string): Promise<Store> {

    const res = await fetch(`${apiUrl}/${storeId}`, {
        method: 'DELETE'
    });
    const store = await res.json();
    return new Promise<Store>((resolve, reject) => {
        if (store) resolve(store);
        else reject();
    });
};