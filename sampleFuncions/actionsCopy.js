"use server";

import { supabaseServerClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";

// app/actions/cart/addToCart.js

export async function addToCart({
  pizza_id,
  selected_size,
  selected_toppings,
  quantity = 1,
}) {
  const supabase = supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("cart_items").insert({
    user_id: user.id,
    pizza_id,
    selected_size,
    selected_toppings,
    quantity,
  });

  if (error) throw error;
  return { success: true };
}

export async function removeFromCart(cartItemId) {
  const supabase = supabaseServerClient();
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);
  if (error) throw error;
  return { success: true };
}

export async function getCart() {
  const supabase = supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("cart_items")
    .select("*, pizzas(name, image_url)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

// app / actions / orders / placeOrder.js;

export async function placeOrder({ shipping_address, payment_method }) {
  const supabase = supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Fetch cart items
  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select("id, pizza_id, quantity, selected_size, selected_toppings")
    .eq("user_id", user.id);

  if (cartError) throw cartError;
  if (!cartItems.length) throw new Error("Cart is empty");

  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    const base = item.selected_size.price || 0;
    const toppings = (item.selected_toppings || []).reduce(
      (t, x) => t + (x.price || 0),
      0
    );
    return sum + (base + toppings) * item.quantity;
  }, 0);

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total,
      payment_method,
      shipping_address,
      status: payment_method === "cash_on_delivery" ? "pending" : "paid",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Insert order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    pizza_id: item.pizza_id,
    quantity: item.quantity,
    selected_size: item.selected_size,
    selected_toppings: item.selected_toppings,
    price:
      (item.selected_size.price || 0) +
      (item.selected_toppings || []).reduce((t, x) => t + (x.price || 0), 0),
  }));

  const { error: orderItemError } = await supabase
    .from("order_items")
    .insert(orderItems);
  if (orderItemError) throw orderItemError;

  // Clear cart
  await supabase.from("cart_items").delete().eq("user_id", user.id);

  return { success: true, order_id: order.id, total };
}

// Record Payment (e.g., Stripe or PayPal)
// 📁 app/actions/payments/recordPayment.js

export async function recordPayment({
  order_id,
  payment_method,
  transaction_id,
}) {
  const supabase = supabaseServerClient();

  await supabase.from("payments").insert({
    order_id,
    payment_method,
    payment_status: "completed",
    transaction_id,
    paid_at: new Date(),
  });

  await supabase.from("orders").update({ status: "paid" }).eq("id", order_id);

  return { success: true };
}
