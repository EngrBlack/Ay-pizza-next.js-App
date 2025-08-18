// // Add to Cart Ui

// 'use client';

// import { useState } from 'react';
// import { toast } from 'sonner';
// import { addToCart } from '@/app/actions/cart/addToCart';

// export default function AddToCartForm({ product }) {
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedToppings, setSelectedToppings] = useState([]);
//   const [quantity, setQuantity] = useState(1);

//   const handleToggleTopping = (topping) => {
//     setSelectedToppings((prev) =>
//       prev.find((t) => t.name === topping.name)
//         ? prev.filter((t) => t.name !== topping.name)
//         : [...prev, topping]
//     );
//   };

//   const handleSubmit = async () => {
//     if (product.sizes?.length && !selectedSize) {
//       return toast.error('Select a size');
//     }

//     try {
//       await addToCart({
//         pizza_id: product.id,
//         selected_size: selectedSize,
//         selected_toppings: selectedToppings,
//         quantity,
//       });

//       toast.success(`${product.name} added to cart`);
//     } catch (err) {
//       toast.error('Could not add to cart');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="space-y-3">
//       {product.sizes?.length > 0 && (
//         <>
//           <h4 className="font-medium">Select Size</h4>
//           <div className="flex gap-2">
//             {product.sizes.map((size) => (
//               <button
//                 key={size.name}
//                 onClick={() => setSelectedSize(size)}
//                 className={`border px-3 py-2 rounded ${
//                   selectedSize?.name === size.name
//                     ? 'bg-amber-600 text-white'
//                     : 'bg-white'
//                 }`}
//               >
//                 {size.name} (${size.price})
//               </button>
//             ))}
//           </div>
//         </>
//       )}

//       {product.toppings?.length > 0 && (
//         <>
//           <h4 className="font-medium">Toppings</h4>
//           <div className="flex gap-2 flex-wrap">
//             {product.toppings.map((topping) => (
//               <button
//                 key={topping.name}
//                 onClick={() => handleToggleTopping(topping)}
//                 className={`border px-3 py-2 rounded ${
//                   selectedToppings.find((t) => t.name === topping.name)
//                     ? 'bg-green-600 text-white'
//                     : 'bg-white'
//                 }`}
//               >
//                 {topping.name} (${topping.price})
//               </button>
//             ))}
//           </div>
//         </>
//       )}

//       <div className="flex gap-2 items-center mt-3">
//         <label>Qty:</label>
//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(parseInt(e.target.value))}
//           min={1}
//           className="w-16 border rounded px-2"
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-amber-700 text-white px-5 py-2 rounded mt-4"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// CART LIST UI

"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/app/actions/cart/getCart";
import { removeFromCart } from "@/app/actions/cart/removeFromCart";
import { toast } from "sonner";

export default function CartList({ onTotal }) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
    onTotal && onTotal(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    toast.success("Item removed");
    loadCart();
  };

  if (!cart.length) return <p>Your cart is empty.</p>;

  return (
    <div className="space-y-5">
      {cart.map((item) => {
        const toppings = (item.selected_toppings || []).reduce(
          (acc, t) => acc + t.price,
          0
        );
        const base = item.selected_size?.price || item.pizzas.base_price;
        const total = (base + toppings) * item.quantity;

        return (
          <div key={item.id} className="p-4 border rounded bg-white">
            <h4 className="font-semibold">{item.pizzas.name}</h4>
            {item.selected_size && <p>Size: {item.selected_size.name}</p>}
            {item.selected_toppings?.length > 0 && (
              <p>
                Toppings:{" "}
                {item.selected_toppings
                  .map((t) => `${t.name} ($${t.price})`)
                  .join(", ")}
              </p>
            )}
            <p>Qty: {item.quantity}</p>
            <p className="font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 mt-2 underline"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}

// CHECKOUT PAGE
// 'use client';

// import CartList from '@/components/CartList';
// import { useState } from 'react';
// import { placeOrder } from '@/app/actions/orders/placeOrder';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

// export default function CheckoutPage() {
//   const [address, setAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
//   const [cartItems, setCartItems] = useState([]);
//   const router = useRouter();

//   const getTotal = (items) => {
//     return items.reduce((sum, item) => {
//       const base = item.selected_size?.price || item.pizzas.base_price;
//       const toppings = (item.selected_toppings || []).reduce(
//         (acc, t) => acc + t.price,
//         0
//       );
//       return sum + (base + toppings) * item.quantity;
//     }, 0);
//   };

//   const handleOrder = async () => {
//     if (!address) return toast.error('Enter address');

//     try {
//       const res = await placeOrder({ shipping_address: address, payment_method: paymentMethod });

//       if (res.success) {
//         toast.success('Order placed!');
//         router.push(`/order/${res.order_id}`);
//       }
//     } catch (err) {
//       toast.error('Order failed');
//       console.error(err);
//     }
//   };

//   return (
//     <section className="max-w-2xl mx-auto px-4 py-10 space-y-8">
//       <h1 className="text-2xl font-bold">Checkout</h1>

//       <CartList onTotal={(items) => setCartItems(items)} />

//       <div className="space-y-3">
//         <label>Shipping Address:</label>
//         <textarea
//           className="w-full border rounded p-2"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />

//         <label>Payment Method:</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="w-full border rounded p-2"
//         >
//           <option value="cash_on_delivery">Cash on Delivery</option>
//           <option value="stripe">Stripe</option>
//           <option value="paypal">PayPal</option>
//         </select>

//         <p className="font-bold">
//           Total: ${getTotal(cartItems).toFixed(2)}
//         </p>

//         <button
//           onClick={handleOrder}
//           className="w-full bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Place Order
//         </button>
//       </div>
//     </section>
//   );
// }
