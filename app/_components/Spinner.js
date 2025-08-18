function Spinner() {
  return (
    <div className="absoluxte top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brown border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default Spinner;
