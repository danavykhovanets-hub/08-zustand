import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "../../Notes.client";

interface FilterPageProps {
  params: Promise<{ filter: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { filter } = await params;
  const tag = filter[0] === "all" ? undefined : filter[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}