"use server";

import { revalidatePath } from "next/cache";
import { calcItemTotal } from "../_helper/helper";
import { clearCartItems, getCartItems } from "./cartActions";
import { getUserProfile } from "./checkoutActions";
import { supabase } from "./supabase";
import { auth } from "./auth";

export async function placeOrder() {
  try {
    const userProfile = await getUserProfile();
    const userId = userProfile?.id;
    if (!userId) throw new Error("User must be logged in.");

    const cart = await getCartItems();

    if (!cart.length)
      return {
        success: false,
        message: "Your cart is Empty.",
        redirectTo: "/cart",
      };
    if (!userProfile.delivery_method)
      return {
        success: false,
        message: "No delivery method selected",
        redirectTo: "/checkout",
      };
    if (userProfile.delivery_method === "delivery" && !userProfile?.address)
      return {
        success: false,
        message: "No delivery address",
        redirectTo: "/checkout",
      };
    if (!userProfile.payment_method)
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/checkout",
      };
    // Calculating total cart price
    const itemsPrice = cart.reduce(
      (accu, item) => accu + calcItemTotal(item),
      0
    );
    const deliveryPrice = userProfile.delivery_price ?? 0;
    const taxPrice = userProfile.tax_price ?? 0;
    const totalPrice = itemsPrice + deliveryPrice + taxPrice;
    // created order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        delivery_address: userProfile?.address,
        payment_method: userProfile?.payment_method,
        is_delivered: false,
        items_price: itemsPrice,
        delivery_price: deliveryPrice,
        tax_price: taxPrice,
        total_price: totalPrice,
        is_paid: false,
      })
      .select()
      .single();
    if (orderError) throw new Error(orderError?.message);
    //CREATING REPLICA OF CART (ORDER-ITEMS)
    const orderItems = cart.map((item) => ({
      order_id: order.id,
      menu_id: item.menu_id?.id,
      quantity: item.quantity,
      selected_size: item.selected_size,
      selected_toppings: item.selected_toppings,
      price: calcItemTotal(item),
    }));
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);
    if (itemsError) throw new Error(itemsError?.message);
    await clearCartItems();
    return order;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while placing order."
    );
  }
}

export async function getUserOrders(orderId) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User must be logged in.");

  const { data, error } = await supabase
    .from("orders")
    .select("*, user_id(*), order_items(*, menu_id(*)) ")
    .eq("user_id", userId)
    .eq("id", orderId)
    .single()
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateOrderToPaid(orderId) {
  // const userProfile = await getUserProfile();
  // const user = userProfile;
  // if (user?.role !== "admin") throw new Error("User is not authorized");
  // const { data, error } = await supabase
  //   .from("orders")
  //   .update({ is_paid: true })
  //   .eq("id", orderId)
  //   .select()
  //   .maybeSingle();
  // if (error) throw new Error(error.message);
  // revalidatePath(`/admin/orders/${orderId}`);
  // return data;
}

export async function getAllOrders() {
  const userProfile = await getUserProfile();
  const user = userProfile;
  if (user?.role !== "admin") throw new Error("User is not authorized");

  const { data, error } = await supabase
    .from("orders")
    .select("*, user_id(*), order_items(*, menu_id(*)) ")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

export async function getOrderById(orderId) {
  const userProfile = await getUserProfile();
  const user = userProfile;
  if (user?.role !== "admin") throw new Error("User is not authorized");

  const { data, error } = await supabase
    .from("orders")
    .select("*, user_id(*), order_items(*, menu_id(*)) ")
    .order("created_at", { ascending: true })
    .eq("id", orderId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getAllUserOrders() {
  const userProfile = await getUserProfile();
  const userId = userProfile?.id;
  if (!userId) throw new Error("User must be logged in.");

  const { data, error } = await supabase
    .from("orders")
    .select("*, user_id(*), order_items(*, menu_id(*)) ")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  c;

  return data;
}

export async function deleteOrderById(orderId) {
  const userProfile = await getUserProfile();
  const user = userProfile;
  if (user?.role !== "admin") throw new Error("User is not authorized");

  const { error: itemsError } = await supabase
    .from("order_items")
    .delete()
    .eq("order_id", orderId);

  if (itemsError) {
    throw new Error(`Failed to delete order items: ${itemsError.message}`);
  }

  const { error: orderError } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (orderError) {
    throw new Error(`Failed to delete order: ${orderError.message}`);
  }

  revalidatePath("/admin/orders");
  return { success: true };
}

// export async function getOrderById(orderId) {
//   const userProfile = await getUserProfile();
//   const user = userProfile;
//   if (user?.role !== "admin") throw new Error("User is not authorized");

//   // Fetch order
//   const { data: order, error: orderError } = await supabase
//     .from("orders")
//     .select("*")
//     .eq("id", orderId)
//     .single();

//   if (orderError || !order) {
//     throw new Error("Order not found");
//   }

//   // Fetch related items with product name
//   const { data: items, error: itemsError } = await supabase
//     .from("order_items")
//     .select("*, menu_id(*)")
//     .eq("order_id", orderId);

//   if (itemsError) {
//     throw new Error("Failed to fetch order items");
//   }

//   return { order, items };
// }
