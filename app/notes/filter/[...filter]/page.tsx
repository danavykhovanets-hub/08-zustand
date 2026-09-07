import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "../../Notes.client";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ filter: string[] }>;
}): Promise<Metadata> {
  const { filter } = await params;
  const tag = filter[0] === "all" ? "All notes" : filter[0];

  return {
    title: `${tag} - NoteHub`,
    description: `Browse notes filtered by ${tag}.`,
    openGraph: {
      title: `${tag} - NoteHub`,
      description: `Browse notes filtered by ${tag}.`,
      url: `https://your-project.vercel.app/notes/filter/${filter[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}