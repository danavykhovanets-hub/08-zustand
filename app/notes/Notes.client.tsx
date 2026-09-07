"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css";

import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

import { fetchNotes, createNote, deleteNote } from "../../lib/api";
import type { NoteTag } from "../../types/note";

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: (prev) => prev,
  });

  const createMutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && (
        <NoteList notes={notes} onDelete={(id) => deleteMutation.mutate(id)} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onClose={() => setIsModalOpen(false)}
            onSubmit={(values) => createMutation.mutate(values)}
          />
        </Modal>
      )}
    </div>
  );
}