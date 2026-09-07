import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag === "All" ? "all" : tag}`}
            className={css.menuLink}
          >
            {tag === "All" ? "All notes" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}