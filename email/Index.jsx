import { Resend } from "resend";
import PurchaseReceiptEmail from "./PurchaseReceiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPurchaseReceipt({ order }) {
  if (!order?.user?.email) {
    throw new Error("No recipient email found for order");
  }

  await resend.emails.send({
    from: `AY-PIZZA <${process.env.SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation #${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
}
