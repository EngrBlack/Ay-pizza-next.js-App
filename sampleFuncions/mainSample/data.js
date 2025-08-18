// Supabase for data |server actions (e.g., /app/actions/cart/xxx.js)|All actions scoped by authenticated user session

//  /app/actions/cart
// getCartItems.js

"use server";

import { getUserSession } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export async function getCartItems() {
  const { user } = await getUserSession();
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("user_id", user.id);

  if (error) throw error;
  return data;
}

export async function addToCart({
  productId,
  quantity = 1,
  selected_size,
  selected_toppings,
}) {
  const { user } = await getUserSession();

  const { error } = await supabase.from("cart_items").insert({
    user_id: user.id,
    product_id: productId,
    quantity,
    selected_size,
    selected_toppings,
  });

  if (error) throw error;
}

export async function removeFromCart(cartItemId) {
  const { user } = await getUserSession();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", user.id);

  if (error) throw error;
}

export async function clearCart() {
  const { user } = await getUserSession();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id);

  if (error) throw error;
}

// 1. Server Action: updateCartQuantity.js
// 📁 /app/actions/cart/updateCartQuantity.js

export async function updateCartQuantity(itemId, quantity) {
  const { user } = await getUserSession();
  if (!user) throw new Error("Not logged in");

  if (quantity < 1) {
    await supabase.from("cart_items").delete().eq("id", itemId);
    return;
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) throw error;
}

// /app/actions/orders
// 🔹 createOrderFromCart.js

// "use server";

// import { getUserSession } from "@/lib/auth";
// import { supabase } from "@/lib/supabaseClient";
// import { clearCart } from "../cart/clearCart";

export async function createOrderFromCart({
  shipping_address,
  payment_method,
}) {
  const { user } = await getUserSession();

  const { data: cart } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("user_id", user.id);

  if (!cart?.length) throw new Error("Cart is empty");

  const total = cart.reduce((acc, item) => {
    const base = item.products?.base_price || 0;
    const size = item.selected_size?.price || 0;
    const toppings =
      item.selected_toppings?.reduce((sum, t) => sum + (t?.price || 0), 0) || 0;
    return acc + (base + size + toppings) * item.quantity;
  }, 0);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total,
      status: "pending",
      shipping_address,
      payment_method,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = cart.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    selected_size: item.selected_size,
    selected_toppings: item.selected_toppings,
    price:
      item.quantity *
      ((item.products.base_price || 0) +
        (item.selected_size?.price || 0) +
        (item.selected_toppings?.reduce((sum, t) => sum + t.price, 0) || 0)),
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);
  if (itemsError) throw itemsError;

  await clearCart();
  return order;
}

// getUserOrders.js;

export async function getUserOrders() {
  const { user } = await getUserSession();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

//  getOrderDetails.js;

export async function getOrderDetails(orderId) {
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  const { data: items } = await supabase
    .from("order_items")
    .select("*, products(name)")
    .eq("order_id", orderId);

  return { order, items };
}

// /app/actions/admin
// 🔹 getAllOrders.js

// "use server";
// import { supabase } from "@/lib/supabaseClient";
// import { getUserSession } from "@/lib/auth";

export async function getAllOrders() {
  const { user } = await getUserSession();
  if (!user?.is_admin) throw new Error("Not authorized");

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// markOrderShipped.js;

export async function markOrderShipped(orderId) {
  const { user } = await getUserSession();
  if (!user?.is_admin) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("orders")
    .update({ status: "shipped" })
    .eq("id", orderId);

  if (error) throw error;
}

// 1. Stripe Integration
// ✅ Server Action: /app/actions/checkout/createStripeSession.js

("use server");

// import Stripe from "stripe";
// import { getUserSession } from "@/lib/auth";
// import { supabase } from "@/lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createStripeCheckoutSession() {
  const { user } = await getUserSession();

  const { data: cart } = await supabase
    .from("cart_items")
    .select("*, products(name)")
    .eq("user_id", user.id);

  const line_items = cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.products.name,
      },
      unit_amount: Math.round(
        (item.products.base_price +
          (item.selected_size?.price || 0) +
          (item.selected_toppings?.reduce((acc, t) => acc + t.price, 0) || 0)) *
          100
      ),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    metadata: { user_id: user.id },
  });

  return { url: session.url };
}

// 2. PayPal Integration (Client-Side Smart Buttons)
// ✅ Add Script in /checkout/page.jsx

{
  /* <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>; */
}

// Use Smart Button Component
{
  /* <div id="paypal-button-container"></div>
<script>
  paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{ amount: { value: "TOTAL_HERE" } }],
      });
    },
    onApprove: async (data, actions) => {
      const details = await actions.order.capture();
      const res = await fetch('/api/paypal/confirm', {
        method: 'POST',
        body: JSON.stringify(details)
      });
    }
  }).render('#paypal-button-container');
</script> */
}

// /app/api/paypal/confirm/route.js
export async function POST(req) {
  const body = await req.json();
  const user_id = body.payer.payer_id;

  // TODO: create order here just like createOrderFromCart()
  // Mark as paid with PayPal metadata
}

// 3. Cash on Delivery (COD)
//  Same as a regular order — just mark it as payment_method: 'cod' and status: 'pending'.

await createOrderFromCart({
  shipping_address: form.address,
  payment_method: "cod",
});
