import { supabase } from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase.from("category").select("*");
  if (error) throw new Error(`Category could not be loaded: ${error.message}`);
  return data;
}
