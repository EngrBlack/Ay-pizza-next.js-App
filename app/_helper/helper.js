import { format } from "date-fns";

export const PAGE_SIZE = 10;
export const tax = 50;
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
  return isNaN(date) ? "" : format(date, "do MMMM, yyyy - h:mm a");
}
