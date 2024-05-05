export async function formatOrder({
  order,
  includeUser = false,
  includeStore = false,
  token,
}) {
  if (includeUser) {
    const res = await fetch(`${process.env.USERS_API_URL}/${order.userId}`, {
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    order.user = data;
  }
  if (includeStore) {
    order.orderItems = await Promise.all(
      order.orderItems.map(async (orderItem) => {
        const res = await fetch(
          `${process.env.STORES_API_URL}/${orderItem.storeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        return {
          ...orderItem,
          store: data,
        };
      })
    );
  }

  return order;
}
