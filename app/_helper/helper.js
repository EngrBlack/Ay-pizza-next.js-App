import { format, subDays, isAfter, isToday } from "date-fns";

export const PAGE_SIZE = 10;
export const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export function phoneValid(value) {
  const regex = /^(?:\+234|0)\d{10}$/;
  return regex.test(value);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date) ? "" : format(date, "do MMMM, yyyy");
}

export function formatDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date) ? "" : format(date, "do MMMM, yyyy  h:mm a");
}

export function maskId(value, distance = 4) {
  if (!value) return "";
  if (distance <= 0) return value;

  const visible = value.slice(-distance);
  return `....${visible}`;
}

export const locations = [
  { name: "Others", price: 3500 },
  { name: "Inside UniLag ", price: 500 },
  { name: "Pako ", price: 1000 },
  { name: "Abule Oja", price: 1000 },
  { name: "Akoka", price: 1000 },
  { name: "Iwaya", price: 1000 },
  { name: "Onike", price: 1000 },
  { name: "Solanke", price: 1000 },
  { name: "St dentis", price: 1000 },
  { name: "Chemist", price: 1000 },
  { name: "Obayan", price: 1000 },
  { name: "Bariga", price: 1000 },
  { name: "Shomolu", price: 1700 },
  { name: "Folagoro", price: 1700 },
  { name: "Bajulaiye", price: 1700 },
  { name: "Sabo", price: 1500 },
  { name: "Yaba", price: 1500 },
  { name: "Onipanu", price: 2500 },
  { name: "Gbagada", price: 3000 },
];

export const calcItemTotal = (item) => {
  const rawBasePrice =
    item?.selected_size?.price ?? item?.menu_id?.base_price ?? 0;

  const basePrice = item?.menu_id?.discount
    ? Number(rawBasePrice) - Number(item.menu_id.discount)
    : Number(rawBasePrice);

  const toppingsPrice =
    item?.selected_toppings?.reduce(
      (sum, t) => sum + Number(t?.price || 0),
      0
    ) || 0;

  return (basePrice + toppingsPrice) * (item?.quantity || 1);
};

export function toCapitaliseWords(str) {
  if (!str) return "";
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function calculateSalesAndRevenue(orders, days) {
  const now = new Date();

  let sales = 0;
  let revenue = 0;

  // if days = 0 → only include orders created "today"
  if (days === 0) {
    for (const order of orders) {
      const orderDate = new Date(order.created_at);
      if (isToday(orderDate)) {
        sales += 1;
        revenue += order.order_items.reduce((sum, item) => sum + item.price, 0);
      }
    }
    return { sales, revenue };
  }

  // otherwise → use cutoff date
  const cutoff = subDays(now, days);

  for (const order of orders) {
    const orderDate = new Date(order.created_at);
    if (isAfter(orderDate, cutoff)) {
      sales += 1;
      revenue += order.order_items.reduce((sum, item) => sum + item.price, 0);
    }
  }

  return { sales, revenue };
}

// export function calculateRevenue(orders, days) {
//   const now = new Date();

//   // if days = 0, only include orders created "today"
//   if (days === 0) {
//     return orders.reduce((total, order) => {
//       const orderDate = new Date(order.created_at);
//       if (isToday(orderDate)) {
//         const orderTotal = order.order_items.reduce(
//           (sum, item) => sum + item.price,
//           0
//         );
//         return total + orderTotal;
//       }
//       return total;
//     }, 0);
//   }

//   // otherwise, use cutoff date
//   const cutoff = subDays(now, days);

//   return orders.reduce((total, order) => {
//     const orderDate = new Date(order.created_at);
//     if (isAfter(orderDate, cutoff)) {
//       const orderTotal = order.order_items.reduce(
//         (sum, item) => sum + item.price,
//         0
//       );
//       return total + orderTotal;
//     }
//     return total;
//   }, 0);
// }

// export function calculateRevenue(orders, days) {
//   if (!Array.isArray(orders)) return 0;

//   const cutoff = new Date();
//   cutoff.setDate(cutoff.getDate() - days);
//   cutoff.setHours(23, 59, 59, 999); //end of day

//   return orders.reduce((total, order) => {
//     if (!order?.created_at || !Array.isArray(order.order_items)) return total;

//     const orderDate = new Date(order.created_at);
//     if (orderDate >= cutoff) {
//       const orderTotal = order.order_items.reduce(
//         (sum, item) => sum + Number(item.price ?? 0),
//         0
//       );
//       return total + orderTotal;
//     }
//     return total;
//   }, 0);
// }

// Usage
// const revenueToday = calculateRevenue(orders, 0);
