import { supabase } from "./supabase";

export async function getCategories() {
  // await new Promise((resolve) => setTimeout(resolve, 40000));

  const { data, error } = await supabase.from("category").select("*");
  if (error) throw new Error(`Category could not be loaded: ${error.message}`);
  return data;
}
