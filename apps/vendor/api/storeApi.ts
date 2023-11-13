interface Store {
    id: string;
    name: string;
    vendorId: string;
    logo?: string;
    vatNumber?: string;
    crNumber?: string;
}

const stores = [
    {
        id: '1',
        name: 'Store 1',
        vendorId: '1',
        logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        vatNumber: '123456789',
        crNumber: '123456789'
    },
    {
        id: '2',
        name: 'Store 2',
        vendorId: '1',
    },
    {
        id: '3',
        name: 'Store 3',
        vendorId: '1'
    }
]


export async function getStoresApi(vendorId: string): Promise<Store[]> {
    // const response = await fetch(`/api/stores?vendorId=${vendorId}`);
    // return await response.json();
    return new Promise<Store[]>((resolve, reject) => {
        resolve(stores);
        // reject();
    });
}

export async function createStoreApi({ name, vendorId }: { name: string, vendorId: string }): Promise<Store> {
    // const response = await fetch(`/api/stores`, {
    //     method: 'POST',
    //     body: JSON.stringify({name, vendorId})
    // });
    // return await response.json();

    const store = {
        id: stores.length.toString(),
        name,
        vendorId
    }
    stores.push(store);
    return new Promise<Store>((resolve, reject) => resolve(store));
}

export async function updateStoreApi({ id, name }: { id: string, name: string }): Promise<Store> {
    // const response = await fetch(`/api/stores/${id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({name})
    // });
    // return await response.json();

    return new Promise<Store>((resolve, reject) => {
        stores.forEach(store => {
            if (store.id === id) {
                store.name = name;
                resolve(store);
            }
        });
        reject();
    });
}

export async function deleteStoreApi({ id }: { id: string }): Promise<void> {
    // await fetch(`/api/stores/${id}`, {
    //     method: 'DELETE'
    // });
    stores.forEach((store, index) => {
        if (store.id === id) {
            stores.splice(index, 1);
            return;
        }
    });
    return new Promise<void>((resolve, reject) => resolve());
}