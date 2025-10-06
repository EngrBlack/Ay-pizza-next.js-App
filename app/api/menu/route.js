import { NextResponse } from "next/server";
import { supabase } from "@/app/_libs/supabase";
import { auth } from "@/app/_libs/auth";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { getCategoryIdByName } from "@/app/_libs/categoryActions";

// 🔹 Helper: upload file if provided
async function uploadFile(file) {
  if (!file || !file.name) return null;
  const imageName = `${nanoid(10)}-${file.name}`.replaceAll("/", "");
  const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu-image/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("menu-image")
    .upload(imageName, file, { upsert: true });

  if (storageError)
    throw new Error(`Image upload failed: ${storageError.message}`);
  return imagePath;
}

// 🔹 CREATE
export async function POST(req) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin")
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });

    const formData = await req.formData();
    const payload = await normalizeForm(formData);

    const { data, error } = await supabase
      .from("menus")
      .insert([payload])
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/admin/products");
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("POST /api/menu error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🔹 UPDATE
export async function PUT(req) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin")
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });

    const formData = await req.formData();
    const id = formData.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const payload = await normalizeForm(formData);

    const { data, error } = await supabase
      .from("menus")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/admin/products");
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("PUT /api/menu error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🔹 Helper: normalize formData into DB row
async function normalizeForm(formData) {
  const name = formData.get("name");
  const category = formData.get("category");
  const base_price = formData.get("base_price");
  const ingredients = formData.get("ingredients");
  const discount = formData.get("discount") || 0;
  const available = formData.get("available") === "true";
  const sizes = formData.get("sizes")
    ? JSON.parse(formData.get("sizes"))
    : null;
  const toppings = formData.get("toppings")
    ? JSON.parse(formData.get("toppings"))
    : null;
  const file = formData.get("image");

  const categoryId = await getCategoryIdByName(category);
  const imagePath = file
    ? await uploadFile(file)
    : formData.get("existingImage") || null;

  return {
    name,
    categoryId,
    base_price,
    size: sizes,
    toppings,
    ingredients,
    image: imagePath,
    discount,
    is_available: available,
  };
}
