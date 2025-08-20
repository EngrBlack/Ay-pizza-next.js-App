"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./authActions";
import { supabase } from "./supabase";

export async function addToCart(
  menuId,
  quantity = 1,
  selectedSize = null,
  selectedToppings = []
) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) throw new Error("User must be logged in to add to cart");

  // 1) Check if item with same menu_id + size + toppings already exists
  const { data: existingItem } = await supabase
    .from("carts")
    .select("id, quantity, selected_size, selected_toppings")
    .eq("menu_id", menuId)
    .eq("user_id", userId)
    .maybeSingle(); // safer than .single() in case no row

  if (existingItem) {
    // if size/toppings match → increase quantity
    const sameSize =
      JSON.stringify(existingItem.selected_size) ===
      JSON.stringify(selectedSize);
    const sameToppings =
      JSON.stringify(existingItem.selected_toppings || []) ===
      JSON.stringify(selectedToppings || []);

    if (sameSize && sameToppings) {
      const newQty = existingItem.quantity + quantity;
      const { data, error } = await supabase
        .from("carts")
        .update({ quantity: newQty })
        .eq("id", existingItem.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      revalidatePath("/menu");
      return data;
    }
  }

  // 2) Otherwise insert a brand-new row
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

  if (error) throw new Error("Could not add to cart");

  revalidatePath("/menu");
  return data;
}

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
  return data;
}

export async function clearCartItems() {
  const user = await getCurrentUser();
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

// export async function addToCart(menuId, quantity = 1) {
//   const user = await getCurrentUser();
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

  if (error) throw new Error(`Could not increase quantity: ${error?.message}`);
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

  if (error) throw new Error(`Could not decrease quantity: ${error?.message}`);
  revalidatePath("/cart");
  return data;
}

// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .insert([newBooking])
//     // So that the newly created object gets returned!
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be created");
//   }

//   return data;
// }

// Calculate cart prices

// const calcPrice = (items = []) => {
//   const itemsPrice = items.reduce(
//     (accu, curItem) => accu + Number(curItem?.price) * curItem.quantity,
//     0
//   );
//   const deliveryPrice = itemsPrice > 1000 ? 0 : 100;
//   const taxPrice = 0.15 * itemsPrice;
//   const totalPrice = itemsPrice + deliveryPrice + taxPrice;

//   return {
//     itemsPrice: itemsPrice.toFixed(2),
//     deliveryPrice: deliveryPrice.toFixed(2),
//     taxPrice: taxPrice.toFixed(2),
//     totalPrice: totalPrice.toFixed(2),
//   };
// };
