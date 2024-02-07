import Store from "@/components/dashboard/stores/Store";
import { formatStore } from "@/utils/format-store";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const store = await fetch(`${process.env.STORES_API_URL}/${id}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());
  const formattedStore = await formatStore(store);

  return {
    title: `Dashboard | ${formattedStore?.name}`,
  };
}

async function getStore(id: string) {
  const store = await fetch(`${process.env.STORES_API_URL}/${id}`, {
    next: { revalidate: 0 },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });
  const formattedStore = await formatStore(store);
  return formattedStore;
}

export default async function Page({ params }: { params: { id: string } }) {
  const store = await getStore(params.id);

  return (
    <>
      <Store store={store} />
    </>
  );
}
