import fetchApi from "../../utils/fetch-api";

class OrdersApi {
  async getOrders() {
    let orders = []; // Initialize outside of try block

    try {
      const { data } = await fetchApi({
        url: "/api/orders",
        options: {
          method: "GET",
        },
      });
      orders = data;
    } catch (err) {
      console.error(err);

      return Promise.resolve({ data: [], count: 0 });
    }

    let count = orders.length;

    return Promise.resolve({
      data: orders,
      count,
    });
  }

  async getOrder(id) {
    let order;

    try {
      const { data } = await fetchApi({
        url: `/api/orders/${id}`,
        options: {
          method: "GET",
        },
      });
      order = data;
      return Promise.resolve(order);
    } catch (err) {
      console.error(err);
      return order;
    }
  }

  async updateOrder({id, status}) {

    try {
      const { data: updatedOrder } = await fetchApi({
        url: `/api/orders/${id}`,
        options: {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        },
      });

      return Promise.resolve(updatedOrder);
    } catch (err) {
      console.error(err);
    }
  }
}

export const ordersApi = new OrdersApi();
