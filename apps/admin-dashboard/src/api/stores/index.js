import { applyPagination } from '../../utils/apply-pagination';
import { deepCopy } from '../../utils/deep-copy';
import { formatStores } from '../../utils/format-stores';

const apiUrl = 'http://localhost:3000/api/v1/stores';

class StoresApi {

  async getStores(request = {}) {
    const { filters, page, rowsPerPage } = request;

    let stores;
    try {
        const res = await fetch(apiUrl);
        const returnedStores = await res.json();
        stores = await formatStores(returnedStores);
    } catch (err) {
        console.error(err);
    }
    
    let data = deepCopy(stores);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((store) => {
        if (typeof filters.name !== 'undefined' && filters.name !== '') {
          const nameMatched = store.name.toLowerCase().includes(filters.name.toLowerCase());

          if (!nameMatched) {
            return false;
          }
        }

        // It is possible to select multiple status options
        if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
          const statusMatched = filters.status.includes(store.status);

          if (!statusMatched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }

  async updateStore(store) {
    const { id } = store;

    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(store)
      });
      const updatedStore = await res.json();

      return Promise.resolve(updatedStore);
    } catch (err) {
      console.error(err);
    }
  }

  async updateBusinessStore(store) {
    const { id } = store;

    try {
      const res = await fetch(`${apiUrl}/business/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(store)
      });
      const updatedStore = await res.json();

      return Promise.resolve(updatedStore);
    } catch (err) {
      console.error(err);
    }
  }
}

export const storesApi = new StoresApi();
