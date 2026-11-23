
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert("Catatan berhasil ditambahkan!");
      router.push("/");
      router.refresh();
    } else {
      alert("Gagal menambahkan catatan!");
    }
  }

  return (
    <div className="form-container">
      <h1>Add New Note 🎀</h1>
      <p>Buat catatan baru kamu di sini.</p>

      <form onSubmit={handleSubmit}>
        <label>Judul Catatan</label>
        <input
          type="text"
          placeholder="Masukkan judul..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Isi Catatan</label>
        <textarea
          placeholder="Tulis catatan kamu..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Save Note</button>
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
