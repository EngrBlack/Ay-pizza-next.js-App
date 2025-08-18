"use client";

//  /app/menu/page.jsx — Menu with Add to Cart
'use client';

import { useEffect, useState } from 'react';
import { addToCart } from '../actions/cart/addToCart';

export default function MenuPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products') // You must create this API route
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  async function handleAdd(product) {
    const selected_size = product.sizes?.[0] || null;
    const selected_toppings = product.toppings?.slice(0, 2) || [];

    await addToCart({
      productId: product.id,
      quantity: 1,
      selected_size,
      selected_toppings,
    });
    alert('Added to cart');
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-sm">{product.description}</p>
          <p className="text-green-600 font-medium mt-2">
            From ${product.base_price}
          </p>
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded"
            onClick={() => handleAdd(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

// /app/cart/page.jsx — Cart View + Modify

'use client';

import { useEffect, useState } from 'react';
import { getCartItems, removeFromCart } from '../actions/cart';

export default function CartPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getCartItems().then(setItems);
  }, []);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  async function handleRemove(id) {
    await removeFromCart(id);
    const updated = await getCartItems();
    setItems(updated);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="border p-3 rounded flex justify-between">
            <div>
              <h3>{item.products.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {item.selected_size?.name || 'N/A'}<br />
                Toppings: {(item.selected_toppings || []).map((t) => t.name).join(', ')}
              </p>
            </div>
            <div className="text-right">
              <p>${item.price.toFixed(2)}</p>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 underline text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right mt-6 font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>

      <a
        href="/checkout"
        className="block mt-4 bg-green-600 text-white text-center py-2 rounded"
      >
        Proceed to Checkout
      </a>
    </div>
  );
}


//  Cart UI: Add +/- Buttons
// 📁 /app/cart/page.jsx → inside cart item loop
import { updateCartQuantity } from '../actions/cart/updateCartQuantity';

async function handleQuantityChange(itemId, currentQty, diff) {
  const newQty = currentQty + diff;
  await updateCartQuantity(itemId, newQty);
  const updated = await getCartItems();
  setItems(updated);
}

// In each item:
<div className="flex items-center gap-2 mt-2">
  <button
    className="px-2 py-1 bg-gray-200 rounded"
    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
  >
    −
  </button>
  <span>{item.quantity}</span>
  <button
    className="px-2 py-1 bg-gray-200 rounded"
    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
  >
    +
  </button>
</div>



// /app/checkout/page.jsx (UI)

import { useState } from "react";
import { createStripeCheckoutSession } from "../actions/checkout/createStripeSession";
import { createOrderFromCart } from "../actions/orders/createOrderFromCart";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  async function handleCOD() {
    setLoading(true);
    try {
      await createOrderFromCart({
        shipping_address: address,
        payment_method: "cod",
      });
      window.location.href = "/success";
    } catch (err) {
      alert("COD failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStripe() {
    setLoading(true);
    try {
      const { url } = await createStripeCheckoutSession();
      window.location.href = url;
    } catch (err) {
      alert("Stripe failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <textarea
        placeholder="Shipping address"
        className="w-full border p-2 rounded"
        rows={3}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="space-y-4">
        <button
          onClick={handleStripe}
          className="bg-black text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          Pay with Stripe
        </button>

        <div id="paypal-button-container" className="w-full" />

        <button
          onClick={handleCOD}
          className="bg-yellow-500 text-black px-4 py-2 rounded w-full"
          disabled={loading}
        >
          Pay with Cash on Delivery
        </button>
      </div>
    </div>
  );
}

// PayPal Smart Buttons
// Add this inside a useEffect (client-side only):

import { useEffect } from "react";

useEffect(() => {
  if (!window.paypal) return;

  window.paypal
    .Buttons({
      createOrder: (data, actions) =>
        actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "20.00", // Replace dynamically later
              },
            },
          ],
        }),
      onApprove: async (data, actions) => {
        const details = await actions.order.capture();
        await fetch("/api/paypal/confirm", {
          method: "POST",
          body: JSON.stringify(details),
        });
        window.location.href = "/success";
      },
      onError: (err) => {
        alert("PayPal failed: " + err.message);
      },
    })
    .render("#paypal-button-container");
}, []);
