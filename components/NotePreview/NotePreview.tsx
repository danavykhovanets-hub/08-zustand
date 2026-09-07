"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { fetchNoteById } from "../../lib/api";
import Modal from "../Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  const close = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={close}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={close}>
        <p>Something went wrong.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}