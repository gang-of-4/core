import { applyPagination } from '../../utils/apply-pagination';
import { deepCopy } from '../../utils/deep-copy';
import fetchApi from '../../utils/fetch-api';
import { formatStores } from '../../utils/format-stores';


class StoresApi {

  async getStores(request = {}) {
    const { filters, page, rowsPerPage } = request;

    let stores;
    try {
      const { data: returnedStores } = await fetchApi({
        url: '/admin/api/stores',
        options: {
          method: 'GET',
        }
      });
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

  async getStore(id) {

    let store;
    try {
      const { data } = await fetchApi({
        url: `/admin/api/stores/${id}`,
        options: {
          method: 'GET',
        }
      });
      store = await formatStores([data]);
    } catch (err) {
      console.error(err);
    }

    return Promise.resolve(store[0]);
  }

  async updateStore(store) {
    const { id } = store;

    try {
      const { data: updatedStore } = await fetchApi({
        url: `/admin/api/stores/${id}`,
        options: {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(store)
        }
      });

      return Promise.resolve(updatedStore);
    } catch (err) {
      console.error(err);
    }
  }

  async updateBusinessStore(store) {
    const { id } = store;

    try {
      const { data: updatedStore } = await fetchApi({
        url: `/admin/api/stores/business/${id}`,
        options: {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(store)
        }
      });

      return Promise.resolve(updatedStore);
    } catch (err) {
      console.error(err);
    }
  }

  async deletStore(id) {
    try {
      await fetchApi({
        url: `/admin/api/stores/${id}`,
        options: {
          method: 'DELETE',
        }
      });

      return Promise.resolve();
    } catch (err) {
      console.error(err);
    }
  }
}

export const storesApi = new StoresApi();
