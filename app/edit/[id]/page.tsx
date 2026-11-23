
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditNote() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getNote() {
      const response = await fetch(`/api/notes/${id}`);

      if (response.ok) {
        const note = await response.json();
        setTitle(note.title);
        setContent(note.content);
      }
    }

    getNote();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert("Catatan berhasil diperbarui!");
      router.push("/");
      router.refresh();
    } else {
      alert("Gagal memperbarui catatan!");
    }
  }

  return (
    <div className="form-container">
      <h1>Edit Note 🎀</h1>
      <p>Ubah catatan kamu di sini.</p>

      <form onSubmit={handleSubmit}>
        <label>Judul Catatan</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Isi Catatan</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Update Note</button>

        <button
          type="button"
          className="back-button"
          onClick={() => router.push("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
