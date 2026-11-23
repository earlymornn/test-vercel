
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

// GET: Mengambil satu catatan berdasarkan ID
export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const note = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!note) {
      return NextResponse.json(
        { message: "Catatan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil catatan" },
      { status: 500 }
    );
  }
}

// PUT: Memperbarui catatan
export async function PUT(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const note = await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    revalidatePath("/");

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengubah catatan" },
      { status: 500 }
    );
  }
}

// DELETE: Menghapus catatan
export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/");

    return NextResponse.json({
      message: "Catatan berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus catatan" },
      { status: 500 }
    );
  }
}
