import { Metadata } from "next";
import { redirect } from "next/navigation";
import EditStore from "@/components/dashboard/stores/EditStore";
import { config } from "ui/config";
import { capitalize } from "@/utils/format-string";

export const metadata: Metadata = {
  title: `${config.platformName} | Edit ${capitalize(config.store.name)}`,
};

async function getStore(id: string) {
  const store = await fetch(`${process.env.STORES_API_URL}/${id}`, {
    next: { revalidate: 0 },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });
  return store;
}

export default async function Page({ params }: { params: { id: string } }) {
  const store = await getStore(params.id);

  return (
    <>
      {store?.type === "individual" ? (
        redirect(`/dashboard/stores/${params.id}`)
      ) : (
        <EditStore unformattedStore={store} />
      )}
    </>
  );
}
