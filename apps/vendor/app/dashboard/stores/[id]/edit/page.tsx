import { formatStore } from "@/utils/format-store";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import EditStore from "@/components/dashboard/stores/EditStore";

export const metadata: Metadata = {
  title: `Dashboard | Edit Store`,
  description: "Vendor Dashboard, edit store",
};

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
      {store?.type === "individual" ? (
        redirect(`/dashboard/stores/${params.id}`)
      ) : (
        <EditStore store={store} />
      )}
    </>
  );
}
