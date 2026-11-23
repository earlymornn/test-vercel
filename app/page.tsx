import prisma from "@/lib/prisma";
import styles from "./page.module.css";
import type { Note } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function Home() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  async function deleteNote(id: number) {
    "use server";

    await prisma.note.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/");
  }

  return (
    <div className={styles.container}>
      <h1>MyNotes 🎀</h1>

      <p className={styles.subtitle}>
        Simpan semua catatan pentingmu di sini.
      </p>

      <div className={styles.header}>
        <h2>My Notes</h2>

        <a href="/create" className={styles.addButton}>
          + Add Note
        </a>
      </div>

      <div className={styles.notes}>
        {notes.length === 0 ? (
          <p className={styles.empty}>
            Belum ada catatan. Yuk, buat catatan pertamamu!
          </p>
        ) : (
          notes.map((note: Note) => (
            <div className={styles.noteCard} key={note.id}>
              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <div className={styles.actions}>
                <a
                  href={`/edit/${note.id}`}
                  className={styles.editButton}
                >
                  Edit
                </a>

                <form action={deleteNote.bind(null, note.id)}>
                  <button
                    type="submit"
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
