"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { auth } from "./auth";

export async function addToCart(
  menuId,
  quantity = 1,
  selectedSize = null,
  selectedToppings = []
) {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in to add to cart");

  // 1) Fetch all cart items for this menu + user
  const { data: existingItems, error: findError } = await supabase
    .from("carts")
    .select("id, quantity, selected_size, selected_toppings")
    .eq("menu_id", menuId)
    .eq("user_id", userId);

  if (findError) throw new Error(findError.message);

  // 2) Try to find an exact match (same size + toppings)
  const match = existingItems?.find(
    (item) =>
      JSON.stringify(item.selected_size) === JSON.stringify(selectedSize) &&
      JSON.stringify(item.selected_toppings || []) ===
        JSON.stringify(selectedToppings || [])
  );

  // 3) If match exists → update quantity
  if (match) {
    const newQty = match.quantity + quantity;

    const { data, error } = await supabase
      .from("carts")
      .update({ quantity: newQty })
      .eq("id", match.id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/menu");
    return data;
  }

  // 4) Otherwise → insert new row
  const { data, error } = await supabase
    .from("carts")
    .insert({
      menu_id: menuId,
      user_id: userId,
      quantity,
      selected_size: selectedSize,
      selected_toppings: selectedToppings,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/menu");
  return data;
}

export async function getCartItems() {
  const session = await auth();
  if (!session?.user) return [];

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("carts")
    .select("*, menu_id(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
  if (error) throw new Error("Cart items could not be found");
  return data;
}

export async function clearCartItems() {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in to clear cart");

  const { data, error } = await supabase
    .from("carts")
    .delete()
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("Error clearing cart:", error);
    throw new Error(`Could not clear cart: ${error?.message}`);
  }
  revalidatePath("/cart");
  return data;
}

export async function removeCartItem(id) {
  const { error } = await supabase.from("carts").delete().eq("id", id);
  if (error) throw new Error("Could not remove cart item");
  revalidatePath("/cart");
  return true;
}

export async function increaseCartItem(id) {
  const { user } = await auth();
  const userId = user?.id;
  if (!userId) throw new Error("User must be logged in to add to cart");

  const { data: currentItem, error: quantityError } = await supabase
    .from("carts")
    .select("quantity")
    .eq("id", id)
    .single();

  if (quantityError) throw new Error("Could not fetch quantity");

  const newQty = (Number(currentItem?.quantity) || 0) + 1;

  const { data, error } = await supabase
    .from("carts")
    .update({ quantity: newQty })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Could not increase quantity: ${error?.message}`);
  revalidatePath("/cart");
  return data;
}

export async function decreaseCartItem(id) {
  const { user } = await auth();
  const userId = user?.id;

  if (!userId) throw new Error("User must be logged in to add to cart");

  const { data: currentItem, error: quantityError } = await supabase
    .from("carts")
    .select("quantity")
    .eq("id", id)
    .single();
  if (quantityError) throw new Error("Could not fetch quantity");

  if (currentItem?.quantity <= 1) {
    return await removeCartItem(id);
  }

  const newQty = (Number(currentItem?.quantity) || 0) - 1;

  const { data, error } = await supabase
    .from("carts")
    .update({ quantity: newQty })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Could not decrease quantity: ${error?.message}`);

  revalidatePath("/cart");
  return data;
}

// export async function addToCart(menuId, quantity = 1) {
//   const { user } = await auth();
//   const userId = user?.id;

//   if (!userId) throw new Error("User must be logged in to add to cart");

//   // 1) Check if item already exists
//   const { data: existingItem } = await supabase
//     .from("carts")
//     .select("id, quantity")
//     .eq("menu_id", menuId)
//     .eq("user_id", userId)
//     .single();

//   if (existingItem) {
//     // Item already in cart, so just increase quantity
//     const newQty = existingItem.quantity + quantity;
//     return await supabase
//       .from("carts")
//       .update({ quantity: newQty })
//       .eq("id", existingItem.id)
//       .select()
//       .single();
//   }

//   // 2) Otherwise insert new row
//   const { data, error } = await supabase
//     .from("carts")
//     .insert({ menu_id: menuId, user_id: userId, quantity })
//     .select()
//     .single();

//   if (error) throw new Error("Could not add to cart");
//   revalidatePath("/menu");
//   return data;
// }
