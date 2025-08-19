"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./authActions";
import { supabase } from "./supabase";

export async function getCartItems() {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("User must be logged in to get cart items");
  }

  const { data, error } = await supabase
    .from("carts")
    .select("*, menu_id(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error("Cart items could not be found");
  console.log(supabase.__proto__.constructor.VERSION);
  return data;
}

export async function removeCartItem(id) {
  const { error } = await supabase.from("carts").delete().eq("id", id);

  if (error) throw new Error("Could not remove cart item");

  revalidatePath("/cart");
  return true;
}

export async function addToCart(menuId, quantity = 1) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) throw new Error("User must be logged in to add to cart");

  const { data, error } = await supabase
    .from("carts")
    .upsert(
      { user_id: userId, menu_id: menuId, quantity }
      // { onConflict: "user_id, menu_id" }
    )
    .single();

  if (error) throw new Error("Could not add to cart: " + error.message);

  return data;
}

export async function increaseCartItem(id) {
  const user = await getCurrentUser();
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

  if (error) throw new Error("Could not increase quantity");
  revalidatePath("/cart");
  return data;
}

export async function decreaseCartItem(id) {
  const user = await getCurrentUser();
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

  if (error) throw new Error("Could not decrease quantity");
  revalidatePath("/cart");
  return data;
}

// Calculate cart prices

const calcPrice = (items = []) => {
  const itemsPrice = items.reduce(
    (accu, curItem) => accu + Number(curItem?.price) * curItem.quantity,
    0
  );
  const deliveryPrice = itemsPrice > 1000 ? 0 : 100;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + deliveryPrice + taxPrice;

  return {
    itemsPrice: itemsPrice.toFixed(2),
    deliveryPrice: deliveryPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
