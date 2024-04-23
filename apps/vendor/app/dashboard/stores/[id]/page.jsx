import Store from "@/components/dashboard/stores/Store";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";


export const metadata = {
  title: `${config.platformName} | ${capitalize(config.store.name)}`,
};

async function getStore(id) {
  try {
    const res = await fetch(`${process.env.STORES_API_URL}/${id}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const store = await res.json();
    return store;
  } catch (error) {
    throw new Error(error);
  }
}

export default async function Page({ params }) {
  let store = {};

  try {
    store = await getStore(params.id);
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <Store unformattedStore={store} />
    </>
  );
}
