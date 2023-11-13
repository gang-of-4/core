import Store from "@/components/dashboard/stores/Store";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  // const store = await fetch(`https://.../${id}`).then((res) => res.json())

  const store = {
    name: `Vendor Dashboard | Store ${id}`,
  }

  return {
    title: store.name,
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Store params={params} />
    </>
  )
}