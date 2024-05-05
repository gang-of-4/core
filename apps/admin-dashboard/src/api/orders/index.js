import { applyPagination } from '../../utils/apply-pagination';
import fetchApi from '../../utils/fetch-api';

class OrdersApi {

  async getOrders(request = {}) {
      let orders = []; // Initialize outside of try block
  
      try {
        const response = await fetchApi({
          url: '/admin/api/orders',
          options: {
            method: 'GET',
          }
        });
        orders = response.data; 
      } catch (err) {
        console.error(err);
        
        return Promise.resolve({ data: [], count: 0 });
      }
  
      let count = orders.length; 
      
      return Promise.resolve({
        data: orders,
        count
      });
  
  
  }

  async getOrder(id) {
    let order;
  
    try {
      const response = await fetchApi({
        url: `/admin/api/orders/${id}`,
        options: {
          method: 'GET',
        }
      });
      order = response.data;
      console.log('two', order);
      return Promise.resolve(order);
    } catch (err) {
      console.error(err);
      return data;
    }
  }
  

  async updateOrder(order) {
    const { id } = order;
    const status = order.status;

    try {
      const { data: updatedOrder } = await fetchApi({
        url: `/admin/api/orders/${id}`,
        options: {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(status)
        }
      });

      return Promise.resolve(updatedOrder);
    } catch (err) {
      console.error(err);
    }
  }
}

export const ordersApi = new OrdersApi();