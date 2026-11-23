
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const note = await prisma.note.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });

    revalidatePath("/");

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menambahkan catatan" },
      { status: 500 }
    );
  }
}
