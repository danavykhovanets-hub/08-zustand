import css from "./LayoutNotes.module.css";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  modal: ReactNode;
}

export default function NotesLayout({ children, sidebar, modal }: LayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
      {modal}
    </div>
  );
}