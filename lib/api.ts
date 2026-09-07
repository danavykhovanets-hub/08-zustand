import axios from "axios";
import type { Note, NoteTag } from ".././types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const authHeaders = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
};

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string          
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params: {
      search,
      page,
      perPage: 12,
      ...(tag && { tag }),   
    },
    headers: authHeaders,
  });
  return response.data;
}

export async function createNote(noteData: CreateNoteData): Promise<Note> {
  const response = await axios.post<Note>(BASE_URL, noteData, {
    headers: authHeaders,
  });

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/${noteId}`, {
    headers: authHeaders,
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: authHeaders,
  });
  return response.data;
}