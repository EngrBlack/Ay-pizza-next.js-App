import { supabase } from "./supabase";

export async function getCartItemsById(id) {
  const { data, error } = await supabase
    .from("carts")
    .select("*, menu_id(*)")
    .eq("user_id", id)
    .order("created_at", { ascending: true });

  if (error) throw new Error("Cart Item could not be found");
  return data;
}
