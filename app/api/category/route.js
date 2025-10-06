import { NextResponse } from "next/server";
import { createEditCategory } from "@/app/_libs/categoryActions";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const image = formData.get("image");

    const result = await createEditCategory({ name, image });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
