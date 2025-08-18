"use client";

// npm install sonner

// 'use client';

// import { Toaster } from 'sonner';

// export default function RootLayout({ children }) {
//   return (
//     <html>
//       <body>
//         {children}
//         <Toaster richColors position="top-right" />
//       </body>
//     </html>
//   );
// }

import { addToCart } from "@/app/actions/cart/addToCart";
import { toast } from "sonner";

export default function AddToCartButton({
  pizza,
  selectedSize,
  selectedToppings,
}) {
  const handleAdd = async () => {
    if (!selectedSize) {
      return toast.error("Please select a size");
    }

    try {
      await addToCart({
        pizza_id: pizza.id,
        selected_size: selectedSize,
        selected_toppings: selectedToppings,
        quantity: 1,
      });

      toast.success(`${pizza.name} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}

// 'use client';

// import { placeOrder } from '@/app/actions/orders/placeOrder';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function CheckoutButton({ address, paymentMethod }) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleCheckout = async () => {
//     if (!address || address.trim().length < 5) {
//       return toast.error('Please enter a valid address');
//     }

//     setLoading(true);

//     try {
//       const res = await placeOrder({ shipping_address: address, payment_method: paymentMethod });

//       if (res.success) {
//         toast.success('Order placed successfully!');
//         router.push(`/order/${res.order_id}`);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to place order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleCheckout}
//       disabled={loading}
//       className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
//     >
//       {loading ? 'Placing Order...' : 'Place Order'}
//     </button>
//   );
// }

// 'use client';
// AddToCartForm.jsx

// import { useState } from 'react';
// import { addToCart } from '@/app/actions/cart/addToCart';
// import { toast } from 'sonner';

// export default function AddToCartForm({ pizza }) {
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedToppings, setSelectedToppings] = useState([]);

//   const handleToggleTopping = (topping) => {
//     setSelectedToppings((prev) =>
//       prev.find((t) => t.name === topping.name)
//         ? prev.filter((t) => t.name !== topping.name)
//         : [...prev, topping]
//     );
//   };

//   const handleAdd = async () => {
//     if (!selectedSize) {
//       return toast.error('Please select a size');
//     }

//     try {
//       await addToCart({
//         pizza_id: pizza.id,
//         selected_size: selectedSize,
//         selected_toppings: selectedToppings,
//         quantity: 1,
//       });

//       toast.success('Pizza added to cart!');
//     } catch (error) {
//       toast.error('Failed to add to cart');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="font-semibold text-xl">Select Size:</h2>
//       <div className="flex gap-2">
//         {pizza.sizes.map((size) => (
//           <button
//             key={size.name}
//             onClick={() => setSelectedSize(size)}
//             className={`px-3 py-2 rounded border ${
//               selectedSize?.name === size.name ? 'bg-amber-600 text-white' : 'bg-white'
//             }`}
//           >
//             {size.name} (${size.price.toFixed(2)})
//           </button>
//         ))}
//       </div>

//       <h2 className="font-semibold text-xl">Toppings:</h2>
//       <div className="flex flex-wrap gap-2">
//         {pizza.toppings.map((topping) => (
//           <button
//             key={topping.name}
//             onClick={() => handleToggleTopping(topping)}
//             className={`px-3 py-2 rounded border ${
//               selectedToppings.find((t) => t.name === topping.name)
//                 ? 'bg-green-600 text-white'
//                 : 'bg-white'
//             }`}
//           >
//             {topping.name} (${topping.price.toFixed(2)})
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={handleAdd}
//         className="w-full bg-amber-700 text-white py-3 rounded mt-4 hover:bg-amber-800"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// CartList.jsx – View Cart & Remove
// 'use client';

// import { useEffect, useState } from 'react';
// import { getCart } from '@/app/actions/cart/getCart';
// import { removeFromCart } from '@/app/actions/cart/removeFromCart';
// import { toast } from 'sonner';

// export default function CartList() {
//   const [cart, setCart] = useState([]);

//   const loadCart = async () => {
//     const data = await getCart();
//     setCart(data);
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const handleRemove = async (id) => {
//     try {
//       await removeFromCart(id);
//       toast.success('Item removed');
//       loadCart();
//     } catch (err) {
//       toast.error('Failed to remove');
//       console.error(err);
//     }
//   };

//   if (cart.length === 0) return <p>Your cart is empty.</p>;

//   return (
//     <div className="space-y-6">
//       {cart.map((item) => (
//         <div key={item.id} className="border p-4 rounded bg-white shadow">
//           <h3 className="text-lg font-bold">{item.pizzas.name}</h3>
//           <p>Size: {item.selected_size.name} (${item.selected_size.price})</p>
//           <p>
//             Toppings:{' '}
//             {item.selected_toppings?.map((t) => `${t.name} ($${t.price})`).join(', ') || 'None'}
//           </p>
//           <p>Qty: {item.quantity}</p>
//           <button
//             onClick={() => handleRemove(item.id)}
//             className="text-red-500 underline mt-2"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// Cart Summary Component (Optional)
// export function CartSummary({ cartItems }) {
//   const total = cartItems.reduce((acc, item) => {
//     const base = item.selected_size?.price || 0;
//     const toppings = (item.selected_toppings || []).reduce(
//       (t, x) => t + x.price,
//       0
//     );
//     return acc + (base + toppings) * item.quantity;
//   }, 0);

//   return (
//     <div className="p-4 border rounded bg-gray-50">
//       <p className="font-bold">Total: ${total.toFixed(2)}</p>
//     </div>
//   );
// }
