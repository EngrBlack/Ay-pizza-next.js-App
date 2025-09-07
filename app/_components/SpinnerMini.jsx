function SpinnerMini({ className = "border-brown" }) {
  return (
    <span
      className={`inline-block w-4 h-4 border-2  border-t-transparent rounded-full animate-spin ${className}`}
    ></span>
  );
}

export default SpinnerMini;
