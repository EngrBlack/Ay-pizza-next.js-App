import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

function CheckoutContent({ user, userProfile, cartItems }) {
  return (
    <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-3 lg:gap-5 md:items-start">
      <CheckoutForm user={user} userProfile={userProfile} />
      <OrderSummary cartItems={cartItems} userProfile={userProfile} />
    </div>
  );
}

export default CheckoutContent;
