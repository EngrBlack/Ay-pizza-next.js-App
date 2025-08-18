function SpinnerMini({ className = "border-brown" }) {
  return (
    <span
      className={`inline-block w-5 h-5 border-2  border-t-transparent rounded-full animate-spin ${className}`}
    ></span>
  );
}

export default SpinnerMini;
