// /app/admin/page.jsx (Admin Orders UI)
"use client";

import { useEffect, useState } from "react";
import { markOrderShipped } from "../actions/admin/markOrderShipped";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ payment: "all", status: "all" });

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
  }

  const filteredOrders = orders.filter((o) => {
    const matchPayment =
      filter.payment === "all" || o.payment_method === filter.payment;
    const matchStatus = filter.status === "all" || o.status === filter.status;
    return matchPayment && matchStatus;
  });

  async function handleShip(orderId) {
    await markOrderShipped(orderId);
    await fetchOrders();
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Admin Orders Dashboard</h1>

      <div className="flex gap-4">
        <select
          value={filter.payment}
          onChange={(e) => setFilter({ ...filter, payment: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="all">All Payment Methods</option>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="cod">COD</option>
        </select>

        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
        </select>
      </div>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Order</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Status</th>
            <th className="p-2">Total</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-2">{order.id.slice(0, 8)}</td>
              <td className="p-2">{order.payment_method}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">${order.total.toFixed(2)}</td>
              <td className="p-2">
                {order.status !== "shipped" && (
                  <button
                    onClick={() => handleShip(order.id)}
                    className="text-blue-600 underline"
                  >
                    Mark as Shipped
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// /app/api/admin/orders/route.js (API Route)
import { getUserSession } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { user } = await getUserSession();
  if (!user?.is_admin) return new Response("Unauthorized", { status: 401 });

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return new Response("Error fetching orders", { status: 500 });

  return Response.json(data);
}

// /app/actions/admin/markOrderShipped.js
("use server");

import { supabase } from "@/lib/supabaseClient";
import { getUserSession } from "@/lib/auth";

export async function markOrderShipped(orderId) {
  const { user } = await getUserSession();
  if (!user?.is_admin) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("orders")
    .update({ status: "shipped" })
    .eq("id", orderId);

  if (error) throw error;
}

// here’s how to build Admin Single Order Detail view in your dashboard.
// 📁 /app/admin/order/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`/api/admin/order/${id}`);
      const data = await res.json();
      setOrder(data.order);
      setItems(data.items);
    }

    fetchOrder();
  }, [id]);

  if (!order) return <p className="p-8">Loading order...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-xl font-bold">🧾 Order #{order.id.slice(0, 8)}</h1>
      <p>Status: <span className="font-medium">{order.status}</span></p>
      <p>Payment: {order.payment_method}</p>
      <p>Shipping Address: {order.shipping_address}</p>

      <hr className="my-4" />

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.products.name}</h3>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} | Size: {item.selected_size?.name || 'N/A'} | Toppings:{" "}
                {(item.selected_toppings || [])
                  .map((t) => t.name)
                  .join(', ') || 'None'}
              </p>
            </div>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="text-right font-bold text-lg mt-6">
        Total: ${order.total.toFixed(2)}
      </div>
    </div>
  );
}

// /app/api/admin/order/[id]/route.js
import { supabase } from '@/lib/supabaseClient';
import { getUserSession } from '@/lib/auth';

export async function GET(_, { params }) {
  const { user } = await getUserSession();
  if (!user?.is_admin) return new Response('Unauthorized', { status: 401 });

  const orderId = params.id;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*, products(name)')
    .eq('order_id', orderId);

  if (orderError || itemsError)
    return new Response('Failed to fetch order details', { status: 500 });

  return Response.json({ order, items });
}

// Add Admin Link
// Update /app/admin/page.jsx to link to the order:
<td className="p-2">
  <a
    href={`/admin/order/${order.id}`}
    className="text-blue-600 underline"
  >
    View
  </a>
</td>


// Admin Order Delete/Refund Options
// We'll allow an admin to:

// Delete any order (soft or hard delete)

// (Optional) Mark as refunded

//  /app/actions/admin/deleteOrder.js
'use server';

import { getUserSession } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';

export async function deleteOrder(orderId) {
  const { user } = await getUserSession();
  if (!user?.is_admin) throw new Error('Unauthorized');

  // Optional: Delete order items first
  const { error: itemsError } = await supabase
    .from('order_items')
    .delete()
    .eq('order_id', orderId);
  if (itemsError) throw itemsError;

  const { error: orderError } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId);
  if (orderError) throw orderError;
}

// /app/admin/page.jsx — Add Delete Button

import { deleteOrder } from '../actions/admin/deleteOrder';

async function handleDelete(id) {
  if (confirm('Are you sure you want to delete this order?')) {
    await deleteOrder(id);
    await fetchOrders(); // refresh UI
  }
}

// Inside table row:
<td className="p-2">
  <button
    onClick={() => handleDelete(order.id)}
    className="text-red-500 underline"
  >
    Delete
  </button>
</td>

